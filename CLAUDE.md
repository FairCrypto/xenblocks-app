# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

XENBLOCKS Web App - a Vite + React Router SPA displaying Proof-of-Work mining information for the X1 blockchain. Shows miner leaderboards, statistics, and maps Ethereum addresses to X1 addresses.

## Commands

```bash
bun install           # Install dependencies
bun run dev           # Development server on port 3001
bun run build         # Production build (tsc + vite build) to dist/
bun run preview       # Preview production build on port 3001
bun run lint          # Run ESLint
```

## Tech Stack

- **Build**: Vite 7 + TypeScript 5 (strict mode)
- **Framework**: React 19 + React Router 7 (SPA with BrowserRouter)
- **Styling**: Tailwind CSS 3.4 + DaisyUI 4.12
- **Linting**: ESLint 10 (flat config)
- **Blockchain**: Solana Web3.js, @solana/spl-token
- **UI**: Custom "xenblocks" dark theme (neon-green #19FF14)

## Architecture

### File Structure
```
src/
├── main.tsx              # React entry point (BrowserRouter, HelmetProvider)
├── App.tsx               # Routes definition + ThemeProvider
├── index.css             # Global styles & animations
├── vite-env.d.ts         # Vite env type declarations
├── api.ts                # API client (leaderboard, address lookup)
├── components/           # Reusable components (NavBar, Footer, Section, etc.)
├── hooks/                # Custom hooks (pagination, airdrop, token metadata)
├── context/              # Theme context provider
├── lib/solana/           # Solana integration (config, accounts, PDA, types)
└── routes/
    ├── Home.tsx           # Landing page (/)
    ├── Leaderboard.tsx    # Paginated miner leaderboard (/leaderboard)
    └── LeaderboardSlug.tsx # Individual miner detail (/leaderboard/:slug)
```

### Key Patterns

**API Layer** (`src/api.ts`):
- `getLeaderboard(page, limit)` - Paginated miner list with stats
- `fetchLeaderboardEntry(account)` - Individual miner data
- `fetchX1Address(account)` - Ethereum → X1 address mapping

**State Management**: URL search params for pagination state (page, limit) via custom hooks in `src/hooks/`.

**Theme**: Custom DaisyUI theme "xenblocks" defined in `tailwind.config.ts` with ProtoMono font.

## Environment Variables

Required in `.env` (prefixed with `VITE_`):
```
VITE_API_ENDPOINT=                        # Leaderboard API base URL
VITE_JACKS_ADDRESS_CONNECT_ENDPOINT=      # Address mapping API
VITE_X1_RPC_ENDPOINT=                     # X1 RPC endpoint
VITE_AIRDROP_PROGRAM_ID=                  # Airdrop program ID
VITE_X1_EXPLORER_URL=                     # X1 block explorer URL
VITE_XNM_TOKEN_MINT=                      # XNM token mint address
VITE_XBLK_TOKEN_MINT=                     # XBLK token mint address
VITE_XUNI_TOKEN_MINT=                     # XUNI token mint address
```

## Deployment

Push to `main` branch for automatic Vercel deployment.
