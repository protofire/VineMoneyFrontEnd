import '../styles/globals.scss'
import { Web3OnboardProvider } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import coinbaseWalletModule from '@web3-onboard/coinbase'
import Onboard from '@web3-onboard/core'
import { UserContextProvider } from "../hook/user";


const ethereumRopsten = {
  id: '0x23294',
  token: 'ROSE',
  label: 'Oasis Sapphire',
  rpcUrl: `https://sapphire.oasis.io`
}

const chains = [ethereumRopsten]
const coinbaseWalletSdk = coinbaseWalletModule({ darkMode: true })


const wallets = [injectedModule(), coinbaseWalletSdk]


const onboard = Onboard({
  wallets,
  chains,
  appMetadata: {
    name: "vine",
    icon: '<svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.7633 30.9637L9.83367 40.8587C9.34302 41.4024 9.39835 42.2301 9.95726 42.7074C10.5162 43.1846 11.367 43.1308 11.8577 42.5871L20.5513 32.9536L18.7633 30.9637ZM22.5077 26.8145L24.3023 28.7971L29.0427 23.5442L46.0941 42.5834C46.5827 43.1289 47.4333 43.1858 47.994 42.7106C48.5548 42.2354 48.6133 41.4079 48.1248 40.8624L30.3431 21.0078C29.6589 20.2438 28.4394 20.2415 27.7522 21.003L22.5077 26.8145Z" fill="#38A3A5"/><path fill-rule="evenodd" clip-rule="evenodd" d="M33.6048 30.8908L28.9124 36.0905L11.861 17.0513C11.3725 16.5058 10.5218 16.4489 9.96109 16.9241C9.40033 17.3993 9.34179 18.2268 9.83033 18.7723L27.612 38.6269C28.2962 39.3909 29.5157 39.3931 30.2029 38.6317L35.3994 32.8735L33.6048 30.8908ZM37.354 26.7363L39.142 28.7263L48.1215 18.776C48.6121 18.2323 48.5568 17.4046 47.9979 16.9273C47.439 16.45 46.5881 16.5039 46.0975 17.0476L37.354 26.7363Z" fill="#57CC99"/><path d="M27.5195 5.43351C32.7402 2.44789 39.3993 4.24327 42.437 9.45546L45.1803 14.1626C45.8458 15.3045 46.6792 16.3398 47.6524 17.2336L51.7276 20.9763C56.139 25.0279 56.5056 31.8635 52.5517 36.3427L48.852 40.5339C47.9849 41.5162 47.2701 42.6236 46.7314 43.8191L44.455 48.8714C41.9882 54.346 35.5784 56.8032 30.0767 54.3833L25.1053 52.1966C23.8923 51.6631 22.6061 51.3163 21.2905 51.1681L15.8986 50.5607C9.93146 49.8885 5.60138 44.5356 6.18554 38.5535L6.72465 33.0327C6.85221 31.7264 6.78344 30.4078 6.52062 29.1208L5.39925 23.6297C4.20086 17.7614 7.91508 12.026 13.7487 10.7367L19.1377 9.54568C20.4247 9.26125 21.6609 8.78392 22.8047 8.12981L27.5195 5.43351Z" stroke="#57CC99" stroke-width="2.15407"/><path d="M5.63316 37.2671C1.66756 33.2224 1.66756 26.7481 5.63316 22.7034L9.56813 18.69C10.5287 17.7103 11.3365 16.5918 11.9646 15.372L14.492 10.4633C17.1058 5.38697 23.3231 3.3667 28.4217 5.93702L33.2779 8.38518C34.5114 9.00705 35.832 9.43866 37.1947 9.66537L42.6201 10.568C48.2248 11.5004 52.0442 16.7578 51.1986 22.3763L50.3601 27.9473C50.1567 29.2983 50.1567 30.6722 50.3601 32.0232L51.1986 37.5942C52.0442 43.2127 48.2248 48.4701 42.6201 49.4025L37.1947 50.3051C35.832 50.5318 34.5114 50.9634 33.2779 51.5853L28.4217 54.0335C23.3231 56.6038 17.1058 54.5835 14.492 49.5071L11.9645 44.5985C11.3365 43.3787 10.5287 42.2602 9.56813 41.2805L5.63316 37.2671Z" stroke="#38A3A5" stroke-width="3.29143"/></svg>',
    description: "vine",
  },
  connect: {
    autoConnectLastWallet: true
  },

})

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
  )
}

export default MyApp 