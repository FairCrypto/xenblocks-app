import { Connection, PublicKey } from '@solana/web3.js';
import { deriveAirdropRecordPDA } from './pda';
import { deserializeAirdropRecord } from './deserialize';
import { AirdropRecord } from './types';
import { config } from './config';

let connection: Connection | null = null;

function getConnection(): Connection {
  if (!connection) {
    connection = new Connection(config.rpcEndpoint, 'confirmed');
  }
  return connection;
}

/**
 * Fetch a single airdrop record by SOL wallet and ETH address
 */
export async function fetchAirdropRecord(
  solAddress: string,
  ethAddress: string
): Promise<AirdropRecord | null> {
  const conn = getConnection();
  const programId = new PublicKey(config.programId);
  const solWallet = new PublicKey(solAddress);

  const [pda] = deriveAirdropRecordPDA(programId, solWallet, ethAddress);
  const accountInfo = await conn.getAccountInfo(pda);

  if (!accountInfo) {
    return null;
  }

  return deserializeAirdropRecord(accountInfo.data);
}
