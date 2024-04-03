"use client";
import { useEffect, useRef, useState } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import {
	shashwotTokenContract,
	stakeContract,
} from "@/contractConfigs/stakeContract.config";
import { config } from "@/wagmi";
import { stakeContractAddress } from "@/constants/addresses";
import { type UseWriteContractParameters } from "wagmi";
import { waitForTransactionReceipt } from '@wagmi/core'

export default function Stake() {
	const { address } = useAccount();
	const [stakeAmount, setStake] = useState(0);
	const [unStakeAmount, setUnStake] = useState(0);
	const [totalStakedAmount, setTotalStakedAmount] = useState(0);

	// const [finalStakeAmount, setFinalStakeAmount] = useRef("");

	const {
		data: approveHash,
		error: approveError,
		isPending: approvePending,
		status: approveStatus,
		writeContractAsync: approve,
	} = useWriteContract();

	const {
		data: stakeHash,
		error: stakeError,
		isPending: stakePending,
		status: stakeStatus,
		writeContractAsync: stake,
	} = useWriteContract();

	const { writeContract } = useWriteContract();

	console.log("address", address);

	const { data: balance }: any = useReadContract({
		...stakeContract,
		functionName: "balanceOf",
		args: [address],
	});

	console.log("balance", balance);

	useEffect(() => {
		setTotalStakedAmount(balance);
	}, [balance]);

	const handleStakeChange = (event: any) => {
		setStake(event.target.value);
	};

	const handleUnStakeChange = (event: any) => {
		setUnStake(event.target.value);
	};

	const withdrawStakedAmount = async () => {
		const value: BigInt = BigInt(unStakeAmount) * BigInt("1000000000000000000");
		const finalValue = value.toString();
		console.log("finalValueToUnstake", finalValue);
	};

	const readContract = async () => {
		console.log("total staked amount", totalStakedAmount);
	};

	return (
		<div className="container mx-auto px-4 py-8 max-w-xl bg-gray-800 rounded-lg shadow-xl">
			<h2 className="text-white text-3xl font-semibold text-center mb-6">
				Stake Your Tokens
			</h2>

			<div className="space-y-4">
				<div className="flex items-center space-x-4">
					<input
						type="number"
						value={stakeAmount}
						onChange={handleStakeChange}
						placeholder="Enter amount to stake"
						className="flex-grow p-2 border-2 border-blue-500 bg-gray-900 text-white rounded focus:outline-none focus:border-blue-700"
					/>
					<button
						onClick={async () => {
							const value: BigInt =
								BigInt(stakeAmount) * BigInt("1000000000000000000");
							const finalValue = value.toString();
							console.log("finalValueToStake", finalValue);

							const response= await approve({
								...shashwotTokenContract,
								functionName: "approve",
								args: [stakeContractAddress, finalValue],
							});
							console.log("response", response);
							console.log("approveResponse", approveStatus);

							console.log("approveHash", approveHash);
							console.log("approveError", approveError);
							console.log("approveIsPending", approvePending);

							if (approveStatus !== "idle" && approveStatus === "success") {
								await stake({
									...stakeContract,
									functionName: "stake",
									args: [finalValue],
								});

								console.log("stakeHash", stakeHash);
								console.log("stakeError", stakeError);
								console.log("stakePending", stakePending);
							}
						}}
						className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 flex items-center"
					>
						Stake
					</button>
				</div>

				<div className="flex items-center space-x-4">
					<input
						type="number"
						value={unStakeAmount}
						onChange={handleUnStakeChange}
						placeholder="Enter amount to unstake"
						className="flex-grow p-2 border-2 border-blue-500 bg-gray-900 text-white rounded focus:outline-none focus:border-blue-700"
					/>
					<button
						onClick={withdrawStakedAmount}
						className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 flex items-center"
					>
						Unstake
					</button>
				</div>

				<div className="flex items-center justify-center pt-4">
					<button
						// onClick={readContract}
						className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded transition-colors duration-200"
					>
						Check Staked Amount
					</button>
					<span className="ml-4 p-2 bg-blue-500 text-white rounded">
						{totalStakedAmount}
					</span>
				</div>
			</div>
		</div>
	);
}
