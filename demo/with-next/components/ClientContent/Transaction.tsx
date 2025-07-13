import {
  MiniAppSendTransactionPayload,
  MiniKit,
  ResponseEvent,
  SendTransactionErrorCodes,
  Tokens,
  tokenToDecimals,
  VerificationLevel,
} from '@worldcoin/minikit-js';
import { useWaitForTransactionReceipt } from '@worldcoin/minikit-react';
import { useState } from 'react';
import { createPublicClient, http } from 'viem';
import { worldchain } from 'viem/chains';
import * as yup from 'yup';
import ANDYABI from '../../abi/Andy.json';
import DEXABI from '../../abi/DEX.json';
import ForwardABI from '../../abi/Forward.json';
import MinikitStaging from '../../abi/MinikitStaging.json';
import { validateSchema } from './helpers/validate-schema';

const sendTransactionSuccessPayloadSchema = yup.object({
  status: yup.string<'success'>().oneOf(['success']),
  transaction_status: yup.string<'submitted'>().oneOf(['submitted']),
  transaction_id: yup.string().required(),
  from: yup.string().optional(),
  chain: yup.string().required(),
  timestamp: yup.string().required(),
});

const sendTransactionErrorPayloadSchema = yup.object({
  error_code: yup
    .string<SendTransactionErrorCodes>()
    .oneOf(Object.values(SendTransactionErrorCodes))
    .required(),
  status: yup.string<'error'>().equals(['error']).required(),
  simulation_id: yup.string().optional(),
  simulation_error: yup.string().optional(),
  simulation_result: yup.object().optional(),
});

const testTokens = {
  optimism: {
    USDC: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
  },
  worldchain: {
    USDC: '0x79A02482A880bCE3F13e09Da970dC34db4CD24d1',
    WLD: '0x2cFc85d8E48F8EAB294be644d9E25C3030863003',
    CR7: '0x3664c2D02e0DAcdBCbB90F839CAeaa7b925142d7',
  },
};

const mainContract =
  process.env.NEXT_PUBLIC_ENVIRONMENT === 'production'
    ? '0x9Cf4F011F55Add3ECC1B1B497A3e9bd32183D6e8'
    : '0x9Cf4F011F55Add3ECC1B1B497A3e9bd32183D6e8';

const Permit2UniswapBridgeABI = [
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: "address", name: "token", type: "address" },
              { internalType: "uint256", name: "amount", type: "uint256" },
            ],
            internalType: "struct IPermit2.TokenPermissions",
            name: "permitted",
            type: "tuple",
          },
          { internalType: "uint256", name: "nonce", type: "uint256" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
        ],
        internalType: "struct IPermit2.PermitTransferFrom",
        name: "permit",
        type: "tuple",
      },
      { internalType: "bytes", name: "signature", type: "bytes" },
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapWithPermit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const SendTransaction = () => {
  const [transactionData, setTransactionData] = useState<Record<string, any> | null>(null);
  const [receivedSendTransactionPayload, setReceivedSendTransactionPayload] = useState<Record<string, any> | null>(null);
  const [sendTransactionPayloadValidationMessage, setSendTransactionPayloadValidationMessage] = useState<string | null>();
  const [transactionId, setTransactionId] = useState<string>('');
  const [tenderlyUrl, setTenderlyUrl] = useState<string>('');

  const client = createPublicClient({
    chain: worldchain,
    transport: http('https://worldchain-mainnet.g.alchemy.com/public'),
  });

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error,
    isError,
  } = useWaitForTransactionReceipt({
    client: client,
    appConfig: {
      app_id: process.env.NEXT_PUBLIC_STAGING_VERIFY_APP_ID || '',
    },
    transactionId: transactionId,
    pollingInterval: 2000,
  });

  const parseResponse = async (payload: MiniAppSendTransactionPayload) => {
    console.log('[1] MiniAppSendTransaction, SUBSCRIBE PAYLOAD', payload);

    if (payload.status === 'error') {
      console.log('[2] Erro detectado na resposta');
      console.log('Detalhes do erro:', JSON.stringify(payload, null, 2));

      const errorMessage = await validateSchema(
        sendTransactionErrorPayloadSchema,
        payload
      );

      let errorDetails = `Erro: ${payload.error_code}`;
      
      if (payload.simulation_id) {
        console.log('[3] Simulation ID encontrado:', payload.simulation_id);
        errorDetails += `\nSimulation ID: ${payload.simulation_id}`;
        
        // Gerar URL do Tenderly
        const tenderlyLink = `https://dashboard.tenderly.co/public/worldcoin/world-chain/simulator/${payload.simulation_id}`;
        errorDetails += `\nTenderly URL: ${tenderlyLink}`;
        setTenderlyUrl(tenderlyLink);
      }
      
      if (payload.simulation_error) {
        console.log('[4] Erro de simulação:', payload.simulation_error);
        errorDetails += `\nErro na Simulação: ${payload.simulation_error}`;
      }
      
      if (payload.simulation_result?.revert_reason) {
        console.log('[5] Motivo do revert:', payload.simulation_result.revert_reason);
        errorDetails += `\nMotivo do Revert: ${payload.simulation_result.revert_reason}`;
      }
      
      if (payload.simulation_result?.formatted_error) {
        console.log('[6] Erro formatado:', payload.simulation_result.formatted_error);
        errorDetails += `\nErro Formatado: ${payload.simulation_result.formatted_error}`;
      }

      // Log detalhado do resultado da simulação
      if (payload.simulation_result) {
        console.log('[6.1] Detalhes completos da simulação:', 
          JSON.stringify(payload.simulation_result, null, 2));
      }

      setSendTransactionPayloadValidationMessage(errorDetails || 'Erro desconhecido');
    } else {
      console.log('[7] Sucesso na transação');
      console.log('Detalhes do sucesso:', JSON.stringify(payload, null, 2));
      
      const errorMessage = await validateSchema(
        sendTransactionSuccessPayloadSchema,
        payload
      );

      if (!errorMessage) {
        setSendTransactionPayloadValidationMessage('Payload válido');
      } else {
        setSendTransactionPayloadValidationMessage(errorMessage);
      }
      setTransactionId(payload.transaction_id);
    }

    setReceivedSendTransactionPayload(payload);
  };

  const onSwapWithPermitClick = async () => {
    console.log('[8] Iniciando processo de swap com Permit2');
    
    const deadline = Math.floor((Date.now() + 30 * 60 * 1000) / 1000).toString();
    console.log('[9] Deadline calculado:', deadline);
    
    // Configurar tokens para o swap
    const tokenA = testTokens.worldchain.WLD; // Token de entrada (WLD)
    const tokenB = testTokens.worldchain.CR7;  // Token de saída (CR7)
    
    console.log('[10] Tokens configurados:');
    console.log('Token A (entrada):', tokenA);
    console.log('Token B (saída):', tokenB);
    
    // Montar o caminho do swap [tokenA, tokenB]
    const path = [tokenA, tokenB];
    console.log('[11] Path do swap:', path);
    
    // Ajuste: usar quantidade significativa para WLD (18 decimais)
    // 0.01 WLD = 10000000000000000
    const amount = '10000000000000000'; // 0.01 WLD
    
    const permitTransfer = {
      permitted: {
        token: tokenA,
        amount: amount,
      },
      nonce: Date.now().toString(),
      deadline,
    };

    console.log('[12] PermitTransfer configurado:', JSON.stringify(permitTransfer, null, 2));

    try {
      console.log('[13] Chamando MiniKit.commandsAsync.sendTransaction');
      
      // Verificar se o MiniKit está inicializado corretamente
      if (!MiniKit || !MiniKit.commandsAsync || !MiniKit.commandsAsync.sendTransaction) {
        console.error('[13.1] MiniKit não está inicializado corretamente');
        setSendTransactionPayloadValidationMessage('Erro: MiniKit não inicializado');
        return;
      }
      
      const { commandPayload, finalPayload } = 
      
        await MiniKit.commandsAsync.sendTransaction({
          transaction: [
            {
              address: '0x32A17D6115b59900CC020B15a0183d1B81522736', // Contrato intermediário
              abi: Permit2UniswapBridgeABI,
              functionName: 'swapWithPermit',
              args: [
                permitTransfer, // Struct do permit
                'PERMIT2_SIGNATURE_PLACEHOLDER_0', // Placeholder para assinatura
                0, // amountOutMin (0 para testes)
                path,
                '0x84b3a3cfad7fe1e0400441da50c5c62148d0a1fd', // Destino dos tokens
                deadline // Deadline para o swap
              ],
            },
          ],
          permit2: [
            {
              ...permitTransfer,
              spender: '0x32A17D6115b59900CC020B15a0183d1B81522736', // Contrato intermediário
            },
          ],
        });
      
      console.log('[14] Transação enviada com sucesso');
        // Adicione este novo log para capturar a assinatura real
  console.log('[14.1] Dados do commandPayload:', JSON.stringify(commandPayload, null, 2));
  
  // Verifique se a assinatura está presente no payload
  if (commandPayload.permit2 && commandPayload.permit2.length > 0) {
    console.log('[14.1.5] Estrutura completa do commandPayload:');
    console.dir(commandPayload, { depth: null });
    const signature = 
    commandPayload?.permit2?.[0]?.signature || 
    commandPayload?.transactions?.[0]?.args?.[1] || 
    'Não encontrada';

    console.log('[14.2] Assinatura encontrada:', signature);
    //const signature = commandPayload.permit2[0].signature;
    //console.log('[14.2] Assinatura real:', signature);
      
      setTransactionData(commandPayload);
      await parseResponse(finalPayload);}
    } catch (error) {
      console.error('[15] Erro ao enviar transação:', error);
      let errorMessage = 'Erro ao enviar transação: ';
      
      if (error instanceof Error) {
        errorMessage += error.message;
        console.error('[15.1] Stack trace:', error.stack);
      } else {
        errorMessage += JSON.stringify(error);
      }
      
      setSendTransactionPayloadValidationMessage(errorMessage);
    }
  };

  return (
    <div className="grid gap-y-2">
      <h2 className="text-2xl font-bold">Send Transaction</h2>
      <div className="bg-gray-50 border-l-4 border-gray-400 p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Note:</span> Green buttons should
              always work, red should fail, and black works if the conditions
              are met.
            </p>
          </div>
        </div>
      </div>
      <div className="grid gap-y-1">
        <p>Raw string:</p>

        <div className="bg-gray-300 min-h-[100px] p-2">
          <pre className="break-all whitespace-break-spaces max-h-[300px] overflow-y-scroll">
            {transactionData
              ? JSON.stringify(transactionData, null, 3)
              : JSON.stringify(null)}
          </pre>
        </div>
      </div>
      
      {/* Botão para fazer swap */}
      <div className="grid gap-x-2 grid-cols-2">
        <button
          className="bg-blue-500 text-white rounded-lg p-4 w-full"
          onClick={onSwapWithPermitClick}
        >
          Fazer Swap com Permit2 (1 WLD → CR7)
        </button>
      </div>


      <div className="grid gap-y-1">
        <p>
          Received from &quot;{ResponseEvent.MiniAppSendTransaction}&quot;:{' '}
        </p>
        <div className="bg-gray-300 min-h-[100px] p-2">
          <pre className="break-all whitespace-break-spaces">
            {JSON.stringify(receivedSendTransactionPayload, null, 2)}
          </pre>
        </div>

        <div className="grid gap-y-1">
          <p>Validation message:</p>
          <p className="bg-gray-300 p-2 whitespace-pre-wrap">
            {sendTransactionPayloadValidationMessage || 'No validation'}
          </p>
        </div>

        <div className="grid gap-y-1">
          <p>Verification:</p>
          <div className="grid gap-y-1 bg-gray-300 p-2">
            {transactionId && <p>Transaction ID: {transactionId}</p>}
            {isConfirming && <p>Waiting for confirmation...</p>}
            {isConfirmed && <p>Transaction confirmed.</p>}
            {isError && <p>Error: {error?.message}</p>}
          </div>
        </div>

        {tenderlyUrl && (
          <div className="grid gap-y-1">
            <p>Tenderly Debug:</p>
            <div className="bg-gray-300 p-2">
              <a 
                href={tenderlyUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {tenderlyUrl}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
