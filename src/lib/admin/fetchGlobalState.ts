import { AnchorProvider, Program, type BN } from "@coral-xyz/anchor";
import { Connection, Keypair } from "@solana/web3.js";
import idl from "./idl.json";

export interface GlobalStateV2 {
  runCounter: bigint;
  xnmAirdropped: bigint;
  xblkAirdropped: bigint;
  xuniAirdropped: bigint;
  nativeAirdropped: bigint;
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

export async function fetchGlobalState(rpcUrl: string): Promise<GlobalStateV2> {
  const connection = new Connection(rpcUrl, "confirmed");
  const provider = makeReadOnlyProvider(connection);
  const program = new Program(idl as never, provider);

  const accounts = await (
    program.account as Record<
      string,
      { all: () => Promise<Array<{ account: Record<string, unknown> }>> }
    >
  )["globalStateV2"].all();

  if (accounts.length === 0) {
    throw new Error("GlobalStateV2 account not found");
  }

  const account = accounts[0].account;
  return {
    runCounter: toBigInt(account.runCounter as BN),
    xnmAirdropped: toBigInt(account.xnmAirdropped as BN),
    xblkAirdropped: toBigInt(account.xblkAirdropped as BN),
    xuniAirdropped: toBigInt(account.xuniAirdropped as BN),
    nativeAirdropped: toBigInt(account.nativeAirdropped as BN),
  };
}
