import { shashwotTokenAbi } from "@/abi's/shashwotToken.abi";
import { stakeContractABI } from "@/abi's/stakeContract.abi";
import { shashwotTokenAddress, stakeContractAddress } from "@/constants/addresses";

export const stakeContract = {
    address: stakeContractAddress,
    abi: stakeContractABI,
  } as const

  export const shashwotTokenContract = {
    address: shashwotTokenAddress,
    abi: shashwotTokenAbi,
  } as const