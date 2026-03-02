import { PublicKey } from '@solana/web3.js';

/**
 * Derive the PDA for an airdrop record (V2 — ETH-only, no sol_wallet)
 * Normalizes ETH address to lowercase to prevent case-sensitive PDA collisions.
 *
 * Seeds: ["airdrop_record_v2", eth_address[0..21], eth_address[21..42]]
 */
export function deriveAirdropRecordPDA(
  programId: PublicKey,
  ethAddress: string
): [PublicKey, number] {
  const ethBytes = Buffer.from(ethAddress.toLowerCase());
  if (ethBytes.length !== 42) {
    throw new Error(
      `Invalid ETH address length: ${ethBytes.length}, expected 42`
    );
  }

  return PublicKey.findProgramAddressSync(
    [
      Buffer.from('airdrop_record_v2'),
      ethBytes.subarray(0, 21),
      ethBytes.subarray(21, 42),
    ],
    programId
  );
}

/**
 * Derive the PDA for an airdrop record (V1 legacy — includes sol_wallet)
 *
 * Seeds: ["airdrop_record", sol_wallet, eth_address[0..20]]
 */
export function deriveAirdropRecordPDALegacy(
  programId: PublicKey,
  solWallet: PublicKey,
  ethAddress: string
): [PublicKey, number] {
  const ethBytes = Buffer.from(ethAddress).slice(0, 20);
  return PublicKey.findProgramAddressSync(
    [Buffer.from('airdrop_record'), solWallet.toBuffer(), ethBytes],
    programId
  );
}
