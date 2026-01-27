import { PublicKey } from '@solana/web3.js';
import {
  AIRDROP_RECORD_OFFSETS,
  AIRDROP_RECORD_LEGACY_OFFSETS,
  AIRDROP_RECORD_LEGACY_SIZE,
  AirdropRecord,
} from './types';

/**
 * Deserialize an AirdropRecord from account data
 * Handles both legacy (99 bytes) and new (155 bytes) schemas
 */
export function deserializeAirdropRecord(data: Uint8Array): AirdropRecord {
  const buffer = Buffer.from(data);
  const isLegacySchema = data.length === AIRDROP_RECORD_LEGACY_SIZE;

  const solWallet = new PublicKey(
    buffer.slice(
      AIRDROP_RECORD_OFFSETS.SOL_WALLET,
      AIRDROP_RECORD_OFFSETS.ETH_ADDRESS
    )
  );

  const ethAddress = Array.from(
    buffer.slice(
      AIRDROP_RECORD_OFFSETS.ETH_ADDRESS,
      AIRDROP_RECORD_OFFSETS.XNM_AIRDROPPED
    )
  );

  if (isLegacySchema) {
    // Legacy schema: single total_airdropped field
    const totalAirdropped = buffer.readBigUInt64LE(
      AIRDROP_RECORD_LEGACY_OFFSETS.TOTAL_AIRDROPPED
    );
    const lastUpdated = buffer.readBigInt64LE(
      AIRDROP_RECORD_LEGACY_OFFSETS.LAST_UPDATED
    );
    const bump = buffer.readUInt8(AIRDROP_RECORD_LEGACY_OFFSETS.BUMP);

    return {
      solWallet,
      ethAddress,
      xnmAirdropped: totalAirdropped,
      xblkAirdropped: 0n,
      xuniAirdropped: 0n,
      reserved: [0n, 0n, 0n, 0n, 0n],
      lastUpdated,
      bump,
    };
  }

  // New schema with separate XNM/XBLK/XUNI fields
  const xnmAirdropped = buffer.readBigUInt64LE(
    AIRDROP_RECORD_OFFSETS.XNM_AIRDROPPED
  );
  const xblkAirdropped = buffer.readBigUInt64LE(
    AIRDROP_RECORD_OFFSETS.XBLK_AIRDROPPED
  );
  const xuniAirdropped = buffer.readBigUInt64LE(
    AIRDROP_RECORD_OFFSETS.XUNI_AIRDROPPED
  );

  const reserved: bigint[] = [];
  for (let i = 0; i < 5; i++) {
    reserved.push(
      buffer.readBigUInt64LE(AIRDROP_RECORD_OFFSETS.RESERVED + i * 8)
    );
  }

  const lastUpdated = buffer.readBigInt64LE(AIRDROP_RECORD_OFFSETS.LAST_UPDATED);
  const bump = buffer.readUInt8(AIRDROP_RECORD_OFFSETS.BUMP);

  return {
    solWallet,
    ethAddress,
    xnmAirdropped,
    xblkAirdropped,
    xuniAirdropped,
    reserved,
    lastUpdated,
    bump,
  };
}
