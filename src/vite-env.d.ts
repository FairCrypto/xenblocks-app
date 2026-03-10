/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_ENDPOINT: string;
  readonly VITE_JACKS_ADDRESS_CONNECT_ENDPOINT: string;
  readonly VITE_X1_RPC_ENDPOINT: string;
  readonly VITE_AIRDROP_PROGRAM_ID: string;
  readonly VITE_X1_EXPLORER_URL: string;
  readonly VITE_XNM_TOKEN_MINT: string;
  readonly VITE_XBLK_TOKEN_MINT: string;
  readonly VITE_XUNI_TOKEN_MINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
