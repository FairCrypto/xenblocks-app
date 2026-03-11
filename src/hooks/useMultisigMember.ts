import { useState, useEffect } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import * as multisig from "@sqds/multisig";
import { adminConfig } from "@/lib/admin/config";

export function useMultisigMember() {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const [isMember, setIsMember] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!connected || !publicKey) {
      setIsMember(false);
      setLoading(false);
      return;
    }

    if (!adminConfig.multisigAddress) {
      setIsMember(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    const multisigPda = new PublicKey(adminConfig.multisigAddress);

    multisig.accounts.Multisig.fromAccountAddress(connection, multisigPda)
      .then((account) => {
        const found = account.members.some((m) =>
          new PublicKey(m.key).equals(publicKey),
        );
        setIsMember(found);
      })
      .catch(() => {
        setIsMember(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [connected, publicKey, connection]);

  return { isMember, loading };
}
