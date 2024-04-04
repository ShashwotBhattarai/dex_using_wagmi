import { shashwotTokenAbi } from "@/abi's/shashwotToken.abi";
import {
	shashwotTokenAddress,
} from "@/constants/addresses";

export const shashwotTokenContract = {
	address: shashwotTokenAddress,
	abi: shashwotTokenAbi,
} as const;
