import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';

// 1. The Simplified ABI (Only what we need: Transfer)
const USDC_ABI = [
    {
        "constant": false,
        "inputs": [
            { "name": "_to", "type": "address" },
            { "name": "_value", "type": "uint256" }
        ],
        "name": "transfer",
        "outputs": [{ "name": "", "type": "bool" }],
        "type": "function"
    }
] as const;

// 2. The USDC Address on Base Mainnet
const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';

export function usePayEntry() {
    const { data: hash, writeContract, isPending } = useWriteContract();

    // This watches the transaction to see when it actually finishes on-chain
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    const triggerPayment = () => {
        writeContract({
            address: USDC_ADDRESS,
            abi: USDC_ABI,
            functionName: 'transfer',
            args: [
                'YOUR_WALLET_ADDRESS_HERE', // <--- REPLACE THIS WITH YOUR WALLET ADDRESS
                parseUnits('0.1', 6)        // USDC has 6 decimals, so this calculates 0.1 correctly
            ],
        });
    };

    return {
        triggerPayment,
        isProcessing: isPending || isConfirming, // Show a spinner when this is true
        isPaid: isSuccess // Use this to unlock the game
    };
}