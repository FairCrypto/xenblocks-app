import { PublicKey } from '@solana/web3.js';

/**
 * On-chain AirdropRecord account data structure
 */
export interface AirdropRecord {
  solWallet: PublicKey;
  ethAddress: number[]; // [u8; 42]
  xnmAirdropped: bigint;
  xblkAirdropped: bigint;
  xuniAirdropped: bigint;
  reserved: bigint[]; // [u64; 5] - reserved for future tokens
  lastUpdated: bigint;
  bump: number;
}

/**
 * Offset constants for AirdropRecord deserialization (NEW schema)
 */
export const AIRDROP_RECORD_OFFSETS = {
  DISCRIMINATOR: 0,
  SOL_WALLET: 8,
  ETH_ADDRESS: 8 + 32,
  XNM_AIRDROPPED: 8 + 32 + 42,
  XBLK_AIRDROPPED: 8 + 32 + 42 + 8,
  XUNI_AIRDROPPED: 8 + 32 + 42 + 8 + 8,
  RESERVED: 8 + 32 + 42 + 8 + 8 + 8,
  LAST_UPDATED: 8 + 32 + 42 + 8 + 8 + 8 + 40,
  BUMP: 8 + 32 + 42 + 8 + 8 + 8 + 40 + 8,
} as const;

export const AIRDROP_RECORD_SIZE = 8 + 32 + 42 + 8 + 8 + 8 + 40 + 8 + 1; // 155 bytes

/**
 * Offset constants for AirdropRecord deserialization (OLD/legacy schema)
 */
export const AIRDROP_RECORD_LEGACY_OFFSETS = {
  DISCRIMINATOR: 0,
  SOL_WALLET: 8,
  ETH_ADDRESS: 8 + 32,
  TOTAL_AIRDROPPED: 8 + 32 + 42,
  LAST_UPDATED: 8 + 32 + 42 + 8,
  BUMP: 8 + 32 + 42 + 8 + 8,
} as const;

export const AIRDROP_RECORD_LEGACY_SIZE = 8 + 32 + 42 + 8 + 8 + 1; // 99 bytes
