import { ethers } from 'ethers';

// Endereços dos contratos
const UNISWAP_V2_ROUTER_ADDRESS = '0x541aB7c31A119441eF3575F6973277DE0eF460bd';
const WLD_TOKEN_ADDRESS = '0x2cFc85d8E48F8EAB294be644d9E25C3030863003';
const CR7_TOKEN_ADDRESS = '0x3664c2D02e0DAcdBCbB90F839CAeaa7b925142d7';

// ABI do Router Uniswap V2
const UNISWAP_V2_ROUTER_ABI = [
    'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)'
];

export const buyCR7 = async (provider: any, amountIn: string, userAddress: string): Promise<void> => {
    if (!provider) {
        throw new Error('Provider not available');
    }

    const signer = provider.getSigner();
    const routerContract = new ethers.Contract(UNISWAP_V2_ROUTER_ADDRESS, UNISWAP_V2_ROUTER_ABI, signer);

    // Converter para wei (WLD tem 18 decimais)
    const amountInWei = ethers.utils.parseUnits(amountIn, 18);
    
    // 1% de slippage
    const slippage = 0.01;
    
    // Obter estimativa de saída
    const amountsOut = await routerContract.getAmountsOut(amountInWei, [WLD_TOKEN_ADDRESS, CR7_TOKEN_ADDRESS]);
    const expectedAmountOut = amountsOut[1];
    const amountOutMin = expectedAmountOut.sub(expectedAmountOut.mul(ethers.utils.parseUnits(slippage.toString(), 2)).div(100));

    // Deadline 20 minutos
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

    const path = [WLD_TOKEN_ADDRESS, CR7_TOKEN_ADDRESS];

    // Realizar a troca
    const tx = await routerContract.swapExactTokensForTokens(
        amountInWei,
        amountOutMin,
        path,
        userAddress,
        deadline
    );

    await tx.wait();
};
