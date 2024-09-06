import "../styles/globals.scss";
import { Web3OnboardProvider } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
import coinbaseWalletModule from "@web3-onboard/coinbase";
import Onboard from "@web3-onboard/core";
import { UserContextProvider } from "../hook/user";

const ethereumRopsten = {
  id: "0x23294",
  token: "ROSE",
  label: "Oasis Sapphire",
  rpcUrl: `https://sapphire.oasis.io`,
};

const chains = [ethereumRopsten];
const coinbaseWalletSdk = coinbaseWalletModule({ darkMode: true });

const wallets = [injectedModule(), coinbaseWalletSdk];

const onboard = Onboard({
  wallets,
  chains,
  appMetadata: {
    name: "bit",
    icon: '<svg width="462" height="462" viewBox="0 0 462 462" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="231.296" cy="231.033" r="230.374" fill="url(#paint0_linear_53_55)"/><path d="M281.966 247.533C291.835 247.533 301.606 245.589 310.723 241.813C319.841 238.036 328.125 232.501 335.103 225.523C342.081 218.545 347.616 210.261 351.392 201.144C355.169 192.027 357.112 182.255 357.112 172.387C357.112 162.518 355.169 152.747 351.392 143.63C347.616 134.512 342.081 126.228 335.103 119.25C328.125 112.273 319.841 106.737 310.723 102.961C301.606 99.1844 291.835 97.2407 281.966 97.2407L281.966 130.466C287.471 130.466 292.923 131.551 298.009 133.657C303.095 135.764 307.716 138.852 311.609 142.744C315.501 146.637 318.589 151.258 320.696 156.344C322.803 161.43 323.887 166.882 323.887 172.387C323.887 177.892 322.803 183.343 320.696 188.429C318.589 193.515 315.501 198.136 311.609 202.029C307.716 205.922 303.095 209.01 298.009 211.116C292.923 213.223 287.471 214.307 281.966 214.307L281.966 247.533Z" fill="white"/><path d="M281.966 364.825C291.835 364.825 301.606 362.881 310.723 359.105C319.841 355.328 328.125 349.793 335.103 342.815C342.081 335.837 347.616 327.553 351.392 318.436C355.169 309.319 357.112 299.547 357.112 289.679C357.112 279.81 355.169 270.039 351.392 260.922C347.616 251.804 342.081 243.52 335.103 236.542C328.125 229.565 319.841 224.029 310.723 220.253C301.606 216.476 291.835 214.533 281.966 214.533L281.966 247.758C287.471 247.758 292.923 248.843 298.009 250.949C303.095 253.056 307.716 256.144 311.609 260.036C315.501 263.929 318.589 268.55 320.696 273.636C322.803 278.722 323.887 284.174 323.887 289.679C323.887 295.184 322.803 300.635 320.696 305.721C318.589 310.807 315.501 315.428 311.609 319.321C307.716 323.214 303.095 326.302 298.009 328.408C292.923 330.515 287.471 331.599 281.966 331.599L281.966 364.825Z" fill="white"/><rect x="105.477" y="97.2407" width="154" height="33" fill="white"/><path d="M257.672 214.533H286.966V247.533H257.672V214.533Z" fill="white"/><path d="M127.477 214.533H237.477V247.533H127.477V214.533Z" fill="white"/><rect x="105.477" y="331.825" width="154" height="33" fill="white"/><defs><linearGradient id="paint0_linear_53_55" x1="231.296" y1="0.658691" x2="231.296" y2="461.407" gradientUnits="userSpaceOnUse"><stop stop-color="#00D7CA"/><stop offset="1" stop-color="#08726B"/></linearGradient></defs></svg>',
    description: "bit protocol",
  },
  connect: {
    autoConnectLastWallet: true,
  },
});

// const currentState = onboard.state.select();
// const { unsubscribe } = currentState.subscribe((update) => {
//   console.log('state update:', update.wallets);
// })

// Ensure the user has selected a wallet
// const initOnboard = async () => {
//   await onboard.connectWallet()
// }

// initOnboard();

function MyApp({ Component, pageProps }) {
  return (
    <Web3OnboardProvider web3Onboard={onboard}>
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </Web3OnboardProvider>
  );
}

export default MyApp;
