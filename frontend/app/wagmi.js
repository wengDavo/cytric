"use client";

import '@rainbow-me/rainbowkit/styles.css';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { sepolia } from 'wagmi/chains';

const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: 'cytric',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID, // Ensure this is defined in .env
  chains: [sepolia],
  ssr: false, // Ensure this is client-side only
});

export default function Providers({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

