"use client";

import { useAccount, useConnect, useDisconnect, useEnsName } from "wagmi";
import Link from "next/link";
import Stake from "../components/stake";
import Swap from "@/components/swap";

function App() {
	const account = useAccount();
	const { connectors, connect, error, status } = useConnect();
	const { disconnect } = useDisconnect();

	return (
		<>
			<div>
				<h2>Account</h2>

				<div>
					status: {account.status}
					<br />
					addresses: {JSON.stringify(account.addresses)}
					<br />
					chainId: {account.chainId}
				</div>

				{account.status === "connected" && (
					<button type="button" onClick={() => disconnect()}>
						Disconnect
					</button>
				)}
			</div>

			<div>
				<h2>Connect</h2>
				{connectors.map((connector) => (
					<button
						key={connector.uid}
						onClick={() => connect({ connector })}
						type="button"
					>
						{connector.name}
					</button>
				))}
				<div>{status}</div>
				<div>{error?.message}</div>
			</div>

			<div>
				<button>
					<Link href="/swap">Swap</Link>
				</button>
				<button>
					<Link href="/stake">Stake</Link>
				</button>
			</div>

      {/* <div>
        <Stake/>
		<Swap/>
      </div> */}
      
		</>
	);
}

export default App;
