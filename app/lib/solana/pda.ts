import { PublicKey } from '@solana/web3.js';

/**
 * Derive the PDA for an airdrop record
 * Seeds: ["airdrop_record", sol_wallet, eth_address[0..20]]
 */
export function deriveAirdropRecordPDA(
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
