"use client";
import {
	bhattaraiTokenAddress,
	shashwotTokenAddress,
	stakeContractAddress,
	swapContractAddress,
} from "@/constants/addresses";
import { shashwotTokenContract } from "@/contractConfigs/stakeContract.config";
import { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "@/wagmi";
import { swapContract } from "@/contractConfigs/swapContract.config";

export default function Swap() {
	const { address } = useAccount();
	const [payToken, setPayToken] = useState("ETH");
	const [receiveToken, setReceiveToken] = useState("Select token");
	const [payAmount, setPayAmount] = useState("");
	
	console.log("address", address);

	const {
		data: approveHash,
		error: approveError,
		isPending: approvePending,
		status: approveStatus,
		writeContractAsync: approve,
	} = useWriteContract();

	const {
		data: swapHash,
		error: swapError,
		isPending: swapPending,
		status: swapStatus,
		writeContractAsync: swap,
	} = useWriteContract();

	const handlePayTokenChange = (event: any) => {
		setPayToken(event.target.value);
	};

	const handleReceiveTokenChange = (event: any) => {
		setReceiveToken(event.target.value);
	};

	const handlePayAmountChange = (event: any) => {
		setPayAmount(event.target.value);
	};

	const handleSubmit = async () => {
		const value: BigInt = BigInt(payAmount) * BigInt("1000000000000000000");
		const finalValue = value.toString();
	};

	return (
		<div className="bg-gray-800 text-white max-w-md mx-auto rounded-xl shadow-md overflow-hidden p-6 space-y-8">
			<div>
				<div className="mb-4">
					<label className="block text-md mb-2" htmlFor="pay">
						You pay
					</label>
					<div className="flex">
						<input
							id="pay"
							type="number"
							className="flex-grow rounded-l p-4 bg-gray-700 focus:outline-none text-white"
							value={payAmount}
							onChange={handlePayAmountChange}
						/>
						<select
							className="bg-blue-500 rounded-r px-4 text-white focus:outline-none"
							value={payToken}
							onChange={handlePayTokenChange}
						>
							<option value="Shashwot">Shashwot</option>
							{/* Add more options for payToken here */}
						</select>
					</div>
				</div>
				<div className="mb-6">
					<label className="block text-md mb-2" htmlFor="receive">
						You receive
					</label>
					<div className="flex">
						<input
							id="receive"
							type="number"
							className="flex-grow rounded-l p-4 bg-gray-700 focus:outline-none text-white"
							disabled
							placeholder="Amount you receive"
						/>
						<select
							className="bg-blue-500 rounded-r px-4 text-white focus:outline-none"
							value={receiveToken}
							onChange={handleReceiveTokenChange}
						>
							<option value="Bhattarai">Bhattarai</option>
							{/* Add more options for receiveToken here */}
						</select>
					</div>
				</div>
				<button
					className="w-full bg-purple-600 rounded-md p-4 text-lg font-semibold hover:bg-purple-800 transition duration-300"
					onClick={async () => {
						const value: BigInt =
							BigInt(payAmount) * BigInt("1000000000000000000");
						const finalValue = value.toString();
						try {
							const approveResponseHash = await approve({
								...shashwotTokenContract,
								functionName: "approve",
								args: [swapContractAddress, finalValue],
							});

							const approveTransactionReceipt = await waitForTransactionReceipt(
								config,
								{
									hash: approveResponseHash,
								}
							);

							console.log(approveTransactionReceipt);

							console.log("response", approveResponseHash);
							console.log("approveResponse", approveStatus);

							console.log("approveHash", approveHash);
							console.log("approveError", approveError);
							console.log("approveIsPending", approvePending);

							if (approveTransactionReceipt.status === "success") {
								const swapResponseHash = await swap({
									...swapContract,
									functionName: "swap",
									args: [
										shashwotTokenAddress,
										bhattaraiTokenAddress,
										finalValue,
									],
								});

								const swapTransactionReceipt = await waitForTransactionReceipt(
									config,
									{
										hash: swapResponseHash,
									}
								);

								console.log("swapHash", swapHash);
								console.log("swapError", swapError);
								console.log("swapPending", swapPending);
								console.log("swapStatus", swapStatus);
								console.log("swapTransactionReceipt", swapTransactionReceipt);
							}
						} catch (error) {
							console.log(error);
						}
					}}
				>
					Submit Swap
				</button>
			</div>
		</div>
	);
}
