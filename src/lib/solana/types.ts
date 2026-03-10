/**
 * On-chain AirdropRecord account data structure (123 bytes, ETH-only PDA)
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
 * Offset constants for AirdropRecord deserialization (123 bytes)
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
