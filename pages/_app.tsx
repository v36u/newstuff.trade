import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Link from "next/link";
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useEffect, useMemo } from "react";
import { clusterApiUrl } from "@solana/web3.js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { AppType } from "next/app";
import { cn } from "~/utils/shadcn";
import { trpc } from "~/utils/trpc";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NewStuff.Trade",
  description: "Exchange your Solana NFTs with ease!",
};

const solanaNetwork = WalletAdapterNetwork.Devnet;

const App: AppType = ({ Component, pageProps }) => {
  const endpoint = useMemo(() => clusterApiUrl(solanaNetwork), []);

  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  useEffect(() => {
    document.body.className = cn(document.body.className, inter.className);
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          <header className="border-b">
            <div className="flex h-16 items-center px-4">
              <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
                <Link
                  href="/overview"
                  className="text-sm font-medium text-gray-400 transition-colors hover:text-gray-700"
                >
                  Home
                </Link>
              </nav>
              <div className="ml-auto flex items-center space-x-4">
                <WalletMultiButton />
                <WalletDisconnectButton />
              </div>
            </div>
          </header>
          <main className="flex-1 space-y-4 p-8 pt-6">
            <Component {...pageProps} />
          </main>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

const appWithTRPC = trpc.withTRPC(App);

export default appWithTRPC;
