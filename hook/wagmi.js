import { http, createConfig } from "wagmi";
import { sapphire, sapphireTestnet } from "wagmi/chains";
import { injected, coinbaseWallet } from "wagmi/connectors";
import { sapphireHttpTransport } from "@oasisprotocol/sapphire-wagmi-v2";
// import { defineChain } from "viem";

// const zkBtc = defineChain({
//   id: 0x12585a9,
//   name: "zkBTC Testnet",
//   network: "zkbtc-testnet",
//   nativeCurrency: { name: "Bitcoin", symbol: "BTC", decimals: 18 },
//   rpcUrls: {
//     default: {
//       http: ["https://devilmorallyelephant-rpc.eu-north-2.gateway.fm/"],
//     },
//   },
//   testnet: true,
// });

export const config = createConfig({
  multiInjectedProviderDiscovery: false,
  // chains: [sapphire, zkBtc, sapphireTestnet],
  chains: [sapphire, sapphireTestnet],
  // connectors: [injectedWithSapphire(), coinbaseWallet()],
  connectors: [injected(), coinbaseWallet()],
  transports: {
    [sapphire.id]: sapphireHttpTransport(),
    [sapphireTestnet.id]: sapphireHttpTransport(),
  },
});
