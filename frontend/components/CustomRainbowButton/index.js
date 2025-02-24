"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import wallet from "../../public/images/wallet.png";

export default function CustomRainbowButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="p-1 px-3 md:p-2 md:px-4 text-white flex gap-1 items-center bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] rounded-full transition transform active:scale-90"
                  >
                    <Image src={wallet} alt="wallet icon" width={16} height={16} />
                    <p>Connect Wallet</p>
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="p-1 px-3 md:p-2 md:px-4 text-white flex gap-1 items-center bg-red-500 rounded-full transition transform active:scale-90"
                  >
                    Wrong network
                  </button>
                );
              }
              return (
                <button
                  onClick={openAccountModal}
                  type="button"
                  className="p-1 px-3 md:p-2 md:px-4 text-white flex gap-1 items-center bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] rounded-full transition transform active:scale-90"
                >
                  <Image src={wallet} alt="wallet icon" width={16} height={16} />
                  <p>{account.displayName}</p>
                </button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}

