import { swapContractAbi } from "@/abi's/swapContract.abi";
import { swapContractAddress } from "@/constants/addresses";

export const swapContract = {
	address: swapContractAddress,
	abi: swapContractAbi,
} as const;
