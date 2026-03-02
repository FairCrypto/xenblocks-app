import { Connection, PublicKey } from '@solana/web3.js';
import { deriveAirdropRecordPDA, deriveAirdropRecordPDALegacy } from './pda';
import { deserializeAirdropRecord, deserializeAirdropRecordV2 } from './deserialize';
import { config } from './config';

/**
 * Unified result type for both V1 and V2 airdrop records
 */
export interface AirdropRecordResult {
  ethAddress: number[];
  xnmAirdropped: bigint;
  xblkAirdropped: bigint;
  xuniAirdropped: bigint;
  nativeAirdropped: bigint;
  lastUpdated: bigint;
  bump: number;
  version: 1 | 2;
}

let connection: Connection | null = null;

function getConnection(): Connection {
  if (!connection) {
    connection = new Connection(config.rpcEndpoint, 'confirmed');
  }
  return connection;
}

/**
 * Fetch a single airdrop record by ETH address (V2 first, V1 fallback)
 */
export async function fetchAirdropRecord(
  solAddress: string | null,
  ethAddress: string
): Promise<AirdropRecordResult | null> {
  const conn = getConnection();
  const programId = new PublicKey(config.programId);

  // Try V2 PDA first (ETH-only)
  const [v2Pda] = deriveAirdropRecordPDA(programId, ethAddress);
  const v2Account = await conn.getAccountInfo(v2Pda);

  if (v2Account) {
    const record = deserializeAirdropRecordV2(v2Account.data);
    return {
      ethAddress: record.ethAddress,
      xnmAirdropped: record.xnmAirdropped,
      xblkAirdropped: record.xblkAirdropped,
      xuniAirdropped: record.xuniAirdropped,
      nativeAirdropped: record.nativeAirdropped,
      lastUpdated: record.lastUpdated,
      bump: record.bump,
      version: 2,
    };
  }

  // Fall back to V1 PDA (requires sol_wallet)
  if (!solAddress) {
    return null;
  }

  const solWallet = new PublicKey(solAddress);
  const [v1Pda] = deriveAirdropRecordPDALegacy(programId, solWallet, ethAddress);
  const v1Account = await conn.getAccountInfo(v1Pda);

  if (!v1Account) {
    return null;
  }

  const record = deserializeAirdropRecord(v1Account.data);
  return {
    ethAddress: record.ethAddress,
    xnmAirdropped: record.xnmAirdropped,
    xblkAirdropped: record.xblkAirdropped,
    xuniAirdropped: record.xuniAirdropped,
    nativeAirdropped: record.nativeAirdropped,
    lastUpdated: record.lastUpdated,
    bump: record.bump,
    version: 1,
  };
}
