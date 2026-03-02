import { PublicKey } from '@solana/web3.js';

/**
 * On-chain AirdropRecord V1 account data structure (155 bytes, includes sol_wallet)
 */
export interface AirdropRecord {
  solWallet: PublicKey;
  ethAddress: number[]; // [u8; 42]
  xnmAirdropped: bigint;
  xblkAirdropped: bigint;
  xuniAirdropped: bigint;
  nativeAirdropped: bigint;
  reserved: bigint[]; // [u64; 4]
  lastUpdated: bigint;
  bump: number;
}

/**
 * On-chain AirdropRecordV2 account data structure (123 bytes, ETH-only key)
 */
export interface AirdropRecordV2 {
  ethAddress: number[]; // [u8; 42]
  xnmAirdropped: bigint;
  xblkAirdropped: bigint;
  xuniAirdropped: bigint;
  nativeAirdropped: bigint;
  reserved: bigint[]; // [u64; 4]
  lastUpdated: bigint;
  bump: number;
}

/**
 * Offset constants for AirdropRecord V1 deserialization (155 bytes)
 */
export const AIRDROP_RECORD_OFFSETS = {
  DISCRIMINATOR: 0,
  SOL_WALLET: 8,
  ETH_ADDRESS: 8 + 32,
  XNM_AIRDROPPED: 8 + 32 + 42,
  XBLK_AIRDROPPED: 8 + 32 + 42 + 8,
  XUNI_AIRDROPPED: 8 + 32 + 42 + 8 + 8,
  NATIVE_AIRDROPPED: 8 + 32 + 42 + 8 + 8 + 8,
  RESERVED: 8 + 32 + 42 + 8 + 8 + 8 + 8,
  LAST_UPDATED: 8 + 32 + 42 + 8 + 8 + 8 + 8 + 32,
  BUMP: 8 + 32 + 42 + 8 + 8 + 8 + 8 + 32 + 8,
} as const;

export const AIRDROP_RECORD_SIZE = 8 + 32 + 42 + 8 + 8 + 8 + 8 + 32 + 8 + 1; // 155 bytes

/**
 * Offset constants for AirdropRecordV2 deserialization (123 bytes, no sol_wallet)
 */
export const AIRDROP_RECORD_V2_OFFSETS = {
  DISCRIMINATOR: 0,
  ETH_ADDRESS: 8,
  XNM_AIRDROPPED: 8 + 42,
  XBLK_AIRDROPPED: 8 + 42 + 8,
  XUNI_AIRDROPPED: 8 + 42 + 8 + 8,
  NATIVE_AIRDROPPED: 8 + 42 + 8 + 8 + 8,
  RESERVED: 8 + 42 + 8 + 8 + 8 + 8,
  LAST_UPDATED: 8 + 42 + 8 + 8 + 8 + 8 + 32,
  BUMP: 8 + 42 + 8 + 8 + 8 + 8 + 32 + 8,
} as const;

export const AIRDROP_RECORD_V2_SIZE = 8 + 42 + 8 + 8 + 8 + 8 + 32 + 8 + 1; // 123 bytes

/**
 * Offset constants for AirdropRecord deserialization (OLD/legacy schema, 99 bytes)
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
