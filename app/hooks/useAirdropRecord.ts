"use client";

import { useState, useEffect } from 'react';
import { fetchAirdropRecord, AirdropRecordResult } from '@/app/lib/solana/accounts';

export interface AirdropData {
  record: AirdropRecordResult | null;
  xnmAirdropped: bigint;
  xblkAirdropped: bigint;
  xuniAirdropped: bigint;
  nativeAirdropped: bigint;
  lastUpdated: bigint;
  version: 1 | 2 | null;
}

export function useAirdropRecord(
  solAddress: string | null,
  ethAddress: string | null
) {
  const [data, setData] = useState<AirdropData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!ethAddress) {
      setData(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    fetchAirdropRecord(solAddress, ethAddress)
      .then((record) => {
        if (record) {
          setData({
            record,
            xnmAirdropped: record.xnmAirdropped,
            xblkAirdropped: record.xblkAirdropped,
            xuniAirdropped: record.xuniAirdropped,
            nativeAirdropped: record.nativeAirdropped,
            lastUpdated: record.lastUpdated,
            version: record.version,
          });
        } else {
          setData({
            record: null,
            xnmAirdropped: 0n,
            xblkAirdropped: 0n,
            xuniAirdropped: 0n,
            nativeAirdropped: 0n,
            lastUpdated: 0n,
            version: null,
          });
        }
      })
      .catch((err) => {
        setError(err);
        setData(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [solAddress, ethAddress]);

  return { data, isLoading, error };
}

/**
 * Convert API amount (18 decimals) to token amount (9 decimals)
 * API returns amounts with 18 decimals, on-chain uses 9 decimals
 */
export function toTokenAmount(amount: number | string | undefined): bigint {
  if (!amount) return 0n;

  try {
    const amountStr = amount.toString();

    // Handle scientific notation (e.g., "1.351984E+25")
    if (amountStr.toUpperCase().includes('E')) {
      const [mantissaStr, expStr] = amountStr.toUpperCase().split('E');
      const [intPart, decPart = ''] = mantissaStr.split('.');
      const mantissaDigits = intPart + decPart;
      const scientificExp = parseInt(expStr);
      const decimalPlaces = decPart.length;
      const actualExp = scientificExp - decimalPlaces;

      if (actualExp < 0) return 0n;

      const fullNumber = mantissaDigits + '0'.repeat(actualExp);
      const bigIntValue = BigInt(fullNumber);
      // Divide by 10^9 to convert from 18 to 9 decimals
      return bigIntValue / BigInt(10 ** 9);
    } else {
      // Regular number
      const [integerPart] = amountStr.split('.');
      const bigIntValue = BigInt(integerPart || '0');
      if (bigIntValue < BigInt(10 ** 9)) return 0n;
      return bigIntValue / BigInt(10 ** 9);
    }
  } catch {
    return 0n;
  }
}

/**
 * Format bigint token amount for display (with commas)
 * Divides by 10^9 since tokens are stored with 9 decimal places
 */
export function formatTokenAmount(amount: bigint): string {
  const divisor = BigInt(10 ** 9);
  const wholeTokens = amount / divisor;
  return wholeTokens.toLocaleString();
}

/**
 * Format bigint timestamp to readable date
 */
export function formatTimestamp(timestamp: bigint): string {
  if (timestamp === 0n) return 'Never';
  const date = new Date(Number(timestamp) * 1000);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
