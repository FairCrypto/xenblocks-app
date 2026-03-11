import { AnchorProvider, Program, type BN } from "@coral-xyz/anchor";
import { Connection, Keypair } from "@solana/web3.js";
import idl from "./idl.json";

export interface AirdropRun {
  runId: bigint;
  runDate: Date;
  totalRecipients: number;
  totalAmount: bigint;
  totalXnmAmount: bigint;
  totalXblkAmount: bigint;
  totalXuniAmount: bigint;
  totalNativeAmount: bigint;
  dryRun: boolean;
}

function toBigInt(bn: BN): bigint {
  return BigInt(bn.toString());
}

function makeReadOnlyProvider(connection: Connection): AnchorProvider {
  return new AnchorProvider(connection, {
    publicKey: Keypair.generate().publicKey,
    signTransaction: () => Promise.reject(new Error("read-only")),
    signAllTransactions: () => Promise.reject(new Error("read-only")),
  });
}

export async function fetchRuns(rpcUrl: string): Promise<AirdropRun[]> {
  const connection = new Connection(rpcUrl, "confirmed");
  const provider = makeReadOnlyProvider(connection);
  const program = new Program(idl as never, provider);

  const accounts = await (
    program.account as Record<
      string,
      { all: () => Promise<Array<{ account: Record<string, unknown> }>> }
    >
  )["airdropRunV2"].all();

  const runs: AirdropRun[] = accounts.map(({ account }) => ({
    runId: toBigInt(account.runId as BN),
    runDate: new Date(Number(toBigInt(account.runDate as BN)) * 1000),
    totalRecipients: account.totalRecipients as number,
    totalAmount: toBigInt(account.totalAmount as BN),
    totalXnmAmount: toBigInt(account.totalXnmAmount as BN),
    totalXblkAmount: toBigInt(account.totalXblkAmount as BN),
    totalXuniAmount: toBigInt(account.totalXuniAmount as BN),
    totalNativeAmount: toBigInt(account.totalNativeAmount as BN),
    dryRun: account.dryRun as boolean,
  }));

  runs.sort((a, b) => (a.runId > b.runId ? -1 : a.runId < b.runId ? 1 : 0));
  return runs.slice(0, 25);
}
