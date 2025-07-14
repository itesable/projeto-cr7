// app/api/claim/route.ts
import { NextRequest } from 'next/server';
import { db } from '../../../lib/db';
import { ethers } from 'ethers';

const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;
const CR7_TOKEN_ADDRESS = '0x3664c2D02e0DAcdBCbB90F839CAeaa7b925142d7';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { address, username } = body;

  if (!address || !username) {
    return new Response(
      JSON.stringify({ error: 'Endereço e username são obrigatórios' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Verificar se o usuário pode fazer claim
    const canClaim = await db.canUserClaim(address);
    if (!canClaim) {
      return new Response(
        JSON.stringify({ error: 'Você não pode fazer claim neste momento' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Configurar a carteira com os tokens - FORMA CORRETA
    const provider = new ethers.JsonRpcProvider(
      'https://worldchain-mainnet.g.alchemy.com/public'
    );
    
    const wallet = new ethers.Wallet(PRIVATE_KEY!, provider);
    
    // ABI para transferência de tokens ERC-20
    const abi = ['function transfer(address to, uint256 amount) returns (bool)'];
    const tokenContract = new ethers.Contract(CR7_TOKEN_ADDRESS, abi, wallet);
    
    // Quantidade de tokens (1 token com 18 decimais)
    const amount = ethers.parseUnits('1', 18);
    
    // Realizar a transferência
    const tx = await tokenContract.transfer(address, amount);
    const receipt = await tx.wait();
    
    console.log('Transação confirmada no bloco:', receipt.blockNumber);
    
    // Atualizar o banco de dados
    await db.createOrUpdateClaimRecord(address, username);
    await db.updateClaimStatus(address);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        txHash: tx.hash,
        blockNumber: receipt.blockNumber,
        message: '1 token CR7 enviado com sucesso!' 
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Erro ao processar claim:', error);
    
    let errorMessage = 'Erro ao processar a transação';
    if (error.info && error.info.error) {
      errorMessage = error.info.error.message;
    } else if (error.reason) {
      errorMessage = error.reason;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: error.info?.error?.data?.message || error.data?.message
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
