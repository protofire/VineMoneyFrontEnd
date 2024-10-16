import { createContext, useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import * as sapphire from '@oasisprotocol/sapphire-paratime';
import BigNumber from "bignumber.js";
import { useConnectWallet } from '@web3-onboard/react';
import idoHook from "../abi/ido";
import tokenHook from "../abi/token";
import BorrowerOperationsHook from "../abi/BorrowerOperations";
import SortedTrovesHook from "../abi/SortedTroves";
import TroveManagerHook from "../abi/TroveManager";
import PriceFeedHook from "../abi/PriceFeed";
import TroveManagerGettersHook from "../abi/TroveManagerGetters";
import tokenLockerHook from "../abi/tokenLocker";
import BoostCalculatorHook from "../abi/BoostCalculator";
import VineLpTokenPoolHook from "../abi/VineLpTokenPool";
import LPPriceOracleHook from "../abi/LPPriceOracle";
import StabilityPoolHook from "../abi/StabilityPool";
import MultiCollateralHintHelpersHook from "../abi/MultiCollateralHintHelpers";
import IncentiveVotingHook from "../abi/IncentiveVoting";
import idovestingHook from "../abi/idovesting";
import vineVaultHook from "../abi/vineVault";

export const UserContext = createContext({
    account: "",
    setAccount: () => { },
    ethersProvider: undefined,
    setEthersProvider: () => { },
    idoAddr: "",
    usdcAddr: "",
    idoAbi: "",
    tokenAbi: "",
    tokenLockerAbi: "",
    signer: undefined,
    setSigner: () => { },
    infuraRPC: "",
    currentState: false,
    setCurrentState: () => { },
    currentWaitInfo: {},
    setCurrentWaitInfo: () => { },

    troveManager: "",
    sortedTroves: "",
    borrowerOperations: "",
    troveManagerGetters: "",
    priceFeed: "",
    debtToken: "",
    vineToken: "",
    tokenLocker: "",
    BoostCalculator: "",
    VineLpTokenPool: "",
    mockLp: "",
    LPPriceOracle: "",
    stabilityPool: "",
    MultiCollateralHintHelpers: "",
    incentiveVoting: "",
    idovesting: "",
    vineVault: "",
    VUSDUSDCLP: "",
    usdcPool: "",

    BorrowerOperationsAbi: "",
    SortedTrovesAbi: "",
    TroveManagerAbi: "",
    PriceFeedAbi: "",
    TroveManagerGettersAbi: "",
    BoostCalculatorAbi: "",
    VineLpTokenPoolAbi: "",
    LPPriceOracleAbi: "",
    StabilityPoolAbi: "",
    MultiCollateralHintHelpersAbi: "",
    IncentiveVotingAbi: "",
    idovestingAbi: "",
    vineVaultAbi: "",

    sapphireProvider: undefined,
    setSapphireProvider: () => { },
    sapphireProviderSigner: undefined,
    setSapphireProviderSigner: () => { },

    balance: 0,
    totalRose: 0,

    signInAuth: {},
    setSignInAuth: () => { },
    signInAuthToken: {},
    setSignInAuthToken: () => { },


    sortedTrovesToken: "",
    troveManagerGettersSigner: "",
    borrowerOperationsMint: "",
    priceFeedToken: "",
    debtTokenQuery: "",
    vineTokenQuery: "",
    tokenLockerMain: "",
    tokenLockerQuery: "",
    boostCalculatorQuery: "",
    vineLpTokenPoolMain: "",
    troveManagerMain: "",
    incentiveVotingMain: "",
    mockLpQuery: "",
    vineLpTokenPoolQuery: "",
    lPPriceOracleQuery: "",
    mockLpMain: "",
    stabilityPoolMain: "",
    stabilityPoolQuery: "",
    multiCollateralHintHelpersQuery: "",
    troveManagerQuery: "",
    incentiveVotingQuery: "",
    idovestingQuery: "",
    idovestingMain: "",
    vineVaultMain: "",
    vineVaultQuery: "",
    VUSDUSDCLPQuery: "",
    usdcPoolQuery: "",
    VUSDUSDCLPMain: "",
    usdcPoolMain: "",


    status: 0,
    deposits: 0,
    debt: 0,
    pre: 0,
    next: 0,
    rosePrice: 0,
    vUSDbalance: 0,
    lpPrice: 0,
    vinePrice: 0,
    boost: 0,
    totalTvl: 0,

    vaultEarned: 0,
    vineRoseEarned: 0,
    stabilityEarned: 0,
    vusdUsdcEarned: 0,


    formatNum: (num) => { },
});


export const UserContextProvider = ({ children }) => {
    const [account, setAccount] = useState("");
    const [ethersProvider, setEthersProvider] = useState(undefined);
    const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
    const [signInAuth, setSignInAuth] = useState({});
    const [signInAuthToken, setSignInAuthToken] = useState({});

    const formatNum = (num) => {
        if (Number(num) >= 1000000000) {
            return Number(num / 1000000000).toLocaleString() + "B";
        } else if (num >= 1000000) {
            return Number(num / 1000000).toLocaleString() + "M";
        } else {
            return Number(num).toLocaleString();
        }
    }

    const [signer, setSigner] = useState(undefined);
    const infuraRPC = "https://sapphire.oasis.io";

    const idoAddr = "0xfc340b4bAA34Ce98c312d4b6B739CCD56f5359c5";
    const usdcAddr = "0x5A80eA8e945312D24a85d1F1C684f092aD43B566";
    const idoAbi = idoHook;
    const tokenAbi = tokenHook;

    const troveManager = "0x935affb325dc0077f059f5634cf12f053bda7339";
    const sortedTroves = "0x55caaa1f9f8b3495539b37963772a85c149a9303";
    const borrowerOperations = "0x1882560361578F2687ddfa2F4CEcca7ae2e614FD";
    const troveManagerGetters = "0x2660effd3242C11Ee2681303206E0307300B3c5A";
    const priceFeed = "0x523fBA7f981571Ea08c3FA520729C9C73178aB02";
    const debtToken = "0x9b439999b816eCc2B733f9889509157b7983B8C4";
    const vineToken = "0xCC34EBcB6ecD87754380C811BdD8b6A35be40dd7";
    const tokenLocker = "0x8E0f121DC898022815B758E73D9Baa7f5876A4C1";
    const BoostCalculator = "0x1337d669E5BF8e4096505Dd6E255484a2ed9A386";
    const mockLp = '0x70A83aeA847676F820dA766d6e4975165E2fd852';//VinelpToken
    const VineLpTokenPool = "0x9327e5e12F79dC0363f754d95bc7Eec3BA356b8a";
    const LPPriceOracle = "0x6b7BC9dD2b851587863fa5c77636869fe1206d9a";
    const stabilityPool = '0xc2e73270A5Bb1000E8f91371Be09B1a033Ef0e40';
    const MultiCollateralHintHelpers = "0xE76C78Bfc91c1098958C35bBB724C7257Beda62B";
    const incentiveVoting = "0xfd46c5e4814F34a4d4875Cb72854dAe3c2F4dd8B";
    const idovesting = "0xe306605c97da3D5daFe9FeF56Cc95133E0Cb235C";//iDOTokenVesting
    const vineVault = "0xfD2B5211a81a59B0BFeF391E84BaBfC60689B631";
    const VUSDUSDCLP = "0xc1Ef81E267443E59474596982791D3A58455201F";
    const usdcPool = "0xF9E586056511E72f2E22A8Aea429CC9d3De89BdD";
    const wRose = "0x8Bc2B030b299964eEfb5e1e0b36991352E56D2D3";


    const BorrowerOperationsAbi = BorrowerOperationsHook;
    const SortedTrovesAbi = SortedTrovesHook;
    const TroveManagerAbi = TroveManagerHook;
    const PriceFeedAbi = PriceFeedHook;
    const TroveManagerGettersAbi = TroveManagerGettersHook;
    const tokenLockerAbi = tokenLockerHook;
    const BoostCalculatorAbi = BoostCalculatorHook;
    const VineLpTokenPoolAbi = VineLpTokenPoolHook;
    const LPPriceOracleAbi = LPPriceOracleHook;
    const StabilityPoolAbi = StabilityPoolHook;
    const MultiCollateralHintHelpersAbi = MultiCollateralHintHelpersHook;
    const IncentiveVotingAbi = IncentiveVotingHook;
    const idovestingAbi = idovestingHook;
    const vineVaultAbi = vineVaultHook;


    const [sapphireProvider, setSapphireProvider] = useState(undefined);
    const [sapphireProviderSigner, setSapphireProviderSigner] = useState(undefined);

    const [balance, setBalance] = useState(0);
    const [vUSDbalance, setvUSDbalance] = useState(0);


    useEffect(() => {
        if (account) {
            setSapphireProvider(sapphire.wrap(new ethers.providers.Web3Provider(wallet.provider)));
            setSapphireProviderSigner(sapphire.wrap(new ethers.providers.Web3Provider(wallet.provider).getSigner()));
        } else {
            setSapphireProvider(sapphire.wrap(new ethers.providers.JsonRpcProvider(infuraRPC)));
            setSapphireProviderSigner(sapphire.wrap(new ethers.providers.JsonRpcProvider(infuraRPC).getSigner()));
        }
    }, [account])

    const [totalRose, setTotalRose] = useState(0);
    const getBalance = (async () => {
        const user = await ethersProvider.getBalance(account);
        setBalance((new BigNumber(user._hex).div(1e18)).toFixed());
        const totalRose = await ethersProvider.getBalance(stabilityPool);
        setTotalRose((new BigNumber(totalRose._hex).div(1e18)).toFixed());
    })

    const [currentState, setCurrentState] = useState(false);
    const [currentWaitInfo, setCurrentWaitInfo] = useState({ type: "", info: "" });


    const [sortedTrovesToken, setSortedTrovesToken] = useState(null);
    const [troveManagerGettersSigner, setTroveManagerGettersSigner] = useState(null);
    const [priceFeedToken, setPriceFeedToken] = useState(null);
    const [debtTokenQuery, setDebtTokenQuery] = useState(null);

    const [vineTokenQuery, setVineTokenQuery] = useState(null);
    const [tokenLockerQuery, setTokenLockerQuery] = useState(null);
    const [boostCalculatorQuery, setBoostCalculatorQuery] = useState(null);
    const [mockLpQuery, setMockLpQuery] = useState(null);
    const [vineLpTokenPoolQuery, setVineLpTokenPoolQuery] = useState(null);
    const [lPPriceOracleQuery, setLPPriceOracleQuery] = useState(null);
    const [stabilityPoolMain, setStabilityPoolMain] = useState(null);
    const [stabilityPoolQuery, setStabilityPoolQuery] = useState(null);
    const [multiCollateralHintHelpersQuery, setMultiCollateralHintHelpersQuery] = useState(null);
    const [troveManagerQuery, setTroveManagerQuery] = useState(null);
    const [incentiveVotingQuery, setIncentiveVotingQuery] = useState(null);
    const [idovestingQuery, setIdovestingQuery] = useState(null);
    const [vineVaultQuery, setVineVaultQuery] = useState(null);

    const [VUSDUSDCLPQuery, setVUSDUSDCLPQuery] = useState(null);
    const [usdcPoolQuery, setusdcPoolQuery] = useState(null);
    const [wRoseQuery, setwRoseQuery] = useState(null);
    // const [borrowerOperationsQuery, setBorrowerOperationsQuery] = useState(null);

    useEffect(() => {
        if (sapphireProvider) {
            setSortedTrovesToken(new ethers.Contract(sortedTroves, SortedTrovesAbi, sapphireProvider));
            setPriceFeedToken(new ethers.Contract(priceFeed, PriceFeedAbi, sapphireProvider));
            setVineTokenQuery(new ethers.Contract(vineToken, tokenAbi, sapphireProvider));
            setTokenLockerQuery(new ethers.Contract(tokenLocker, tokenLockerAbi, sapphireProvider));
            setBoostCalculatorQuery(new ethers.Contract(BoostCalculator, BoostCalculatorAbi, sapphireProvider));

            setMockLpQuery(new ethers.Contract(mockLp, tokenAbi, sapphireProvider));
            setVineLpTokenPoolQuery(new ethers.Contract(VineLpTokenPool, VineLpTokenPoolAbi, sapphireProvider));
            setLPPriceOracleQuery(new ethers.Contract(LPPriceOracle, LPPriceOracleAbi, sapphireProvider));
            setStabilityPoolQuery(new ethers.Contract(stabilityPool, StabilityPoolAbi, sapphireProvider));
            setMultiCollateralHintHelpersQuery(new ethers.Contract(MultiCollateralHintHelpers, MultiCollateralHintHelpersAbi, sapphireProvider));
            setTroveManagerQuery(new ethers.Contract(troveManager, TroveManagerAbi, sapphireProvider));

            setIncentiveVotingQuery(new ethers.Contract(incentiveVoting, IncentiveVotingAbi, sapphireProvider));
            setIdovestingQuery(new ethers.Contract(idovesting, idovestingAbi, sapphireProvider));
            setVineVaultQuery(new ethers.Contract(vineVault, vineVaultAbi, sapphireProvider));

            setVUSDUSDCLPQuery(new ethers.Contract(VUSDUSDCLP, tokenAbi, sapphireProvider));
            setusdcPoolQuery(new ethers.Contract(usdcPool, VineLpTokenPoolAbi, sapphireProvider));
            setwRoseQuery(new ethers.Contract(wRose, VineLpTokenPoolAbi, sapphireProvider));

            // setBorrowerOperationsQuery(new ethers.Contract(borrowerOperations, BorrowerOperationsAbi, sapphireProvider));


            if (signInAuth) {
                setTroveManagerGettersSigner(new ethers.Contract(troveManagerGetters, TroveManagerGettersAbi, sapphireProvider));
            }
            if (signInAuthToken) {
                setDebtTokenQuery(new ethers.Contract(debtToken, tokenAbi, sapphireProvider))
            }
        }
    }, [sapphireProvider, signInAuth, signInAuthToken])

    const [borrowerOperationsMint, setBorrowerOperationsMint] = useState(null);
    const [tokenLockerMain, setTokenLockerMain] = useState(null);
    const [mockLpMain, setMockLpMain] = useState(null);
    const [vineLpTokenPoolMain, setVineLpTokenPoolMain] = useState(null);
    const [troveManagerMain, setTroveManagerMain] = useState(null);
    const [incentiveVotingMain, setIncentiveVotingMain] = useState(null);
    const [idovestingMain, setIdovestingMain] = useState(null);
    const [vineVaultMain, setVineVaultMain] = useState(null);

    const [VUSDUSDCLPMain, setVUSDUSDCLPMain] = useState(null);
    const [usdcPoolMain, setusdcPoolMain] = useState(null);

    useEffect(() => {
        if (sapphireProviderSigner) {
            setBorrowerOperationsMint(new ethers.Contract(borrowerOperations, BorrowerOperationsAbi, sapphireProviderSigner));
            setTokenLockerMain(new ethers.Contract(tokenLocker, tokenLockerAbi, sapphireProviderSigner));
            setMockLpMain(new ethers.Contract(mockLp, tokenAbi, sapphireProviderSigner));
            setVineLpTokenPoolMain(new ethers.Contract(VineLpTokenPool, VineLpTokenPoolAbi, sapphireProviderSigner));
            setStabilityPoolMain(new ethers.Contract(stabilityPool, StabilityPoolAbi, sapphireProviderSigner));
            setTroveManagerMain(new ethers.Contract(troveManager, TroveManagerAbi, sapphireProviderSigner));
            setIncentiveVotingMain(new ethers.Contract(incentiveVoting, IncentiveVotingAbi, sapphireProviderSigner));
            setIdovestingMain(new ethers.Contract(idovesting, idovestingAbi, sapphireProviderSigner));
            setVineVaultMain(new ethers.Contract(vineVault, vineVaultAbi, sapphireProviderSigner));
            setVUSDUSDCLPMain(new ethers.Contract(VUSDUSDCLP, tokenAbi, sapphireProviderSigner));
            setusdcPoolMain(new ethers.Contract(usdcPool, VineLpTokenPoolAbi, sapphireProviderSigner));
        }
    }, [sapphireProviderSigner])


    const [status, setStatus] = useState(0);
    const [deposits, setDeposits] = useState(0);
    const [debt, setDebt] = useState(0);
    const [pre, setPre] = useState(0);
    const [next, setNext] = useState(0);
    const [rosePrice, setRosePrice] = useState(0);
    const [lpPrice, setLpPrice] = useState(0);
    const [vinePrice, setVinePrice] = useState(0);
    const [boost, setBoost] = useState(0);
    const [totalTvl, setTotalTvl] = useState(0);

    const [vaultEarned, setvaultEarned] = useState(0);
    const [vineRoseEarned, setvineRoseEarned] = useState(0);
    const [stabilityEarned, setstabilityEarned] = useState(0);
    const [vusdUsdcEarned, setvusdUsdcEarned] = useState(0);
    const getData = async () => {
        if (account) {
            getBalance();
            const trove = await troveManagerGettersSigner.getTrove(signInAuth, troveManager);
            setDeposits(Number((new BigNumber(trove.coll._hex).div(1e18)).toFixed()));
            setDebt(Number((new BigNumber(trove.debt._hex).div(1e18)).toFixed()));
            setStatus(trove.status);

            const pre = await sortedTrovesToken.getPrev(account);
            const next = await sortedTrovesToken.getNext(account);
            setPre(pre);
            setNext(next);
            // const balanceOf = await debtTokenQuery.checkBalanceOf(signInAuthToken);
            const balanceOf = await debtTokenQuery.balanceOf(account);
            setvUSDbalance((new BigNumber(balanceOf._hex).div(1e18)).toFixed());

            const boost = await boostCalculatorQuery.getBoostedAmount(account, 10000, 0, 100000);
            setBoost(new BigNumber(boost._hex).multipliedBy(2).div(10000).toFixed());

            //vUSD Minting
            const vaultEarned = await vineVaultQuery.claimableRewardAfterBoost(account, account, "0x0000000000000000000000000000000000000000", troveManager);
            setvaultEarned(Number(vaultEarned.adjustedAmount._hex) / 1e18);

            //VINE/ROSE LP
            const vineRoseEarned = await vineVaultQuery.claimableRewardAfterBoost(account, account, "0x0000000000000000000000000000000000000000", VineLpTokenPool);
            setvineRoseEarned(Number(vineRoseEarned.adjustedAmount._hex) / 1e18);

            //Stability Pool
            const stabilityEarned = await vineVaultQuery.claimableRewardAfterBoost(account, account, "0x0000000000000000000000000000000000000000", stabilityPool);
            setstabilityEarned(Number(stabilityEarned.adjustedAmount._hex) / 1e18);

            //vUSD/USDC LP
            const vusdUsdcEarned = await vineVaultQuery.claimableRewardAfterBoost(account, account, "0x0000000000000000000000000000000000000000", usdcPool);
            setvusdUsdcEarned(Number(vusdUsdcEarned.adjustedAmount._hex) / 1e18);
        }
        const rosePrice = await priceFeedToken.loadPrice("0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE");
        setRosePrice(Number(rosePrice) / 1e18);
        const lpPrice = await lPPriceOracleQuery.getReferenceData("LP", "USD");
        setLpPrice(Number(lpPrice[0]._hex) / 1e18);
        const wRosebalance = await wRoseQuery.balanceOf(mockLp);
        const wRosebalance2 = await vineTokenQuery.balanceOf(mockLp);
        const vPrice = Number(wRosebalance._hex) * Number(rosePrice) / 1e18 / Number(wRosebalance2._hex);
        // console.log(vPrice)
        setVinePrice(vPrice);

        const totalTvl = await ethersProvider.getBalance(borrowerOperations);
        // console.log((Number(totalTvl) / 1e18),(Number(rosePrice) / 1e18))
        // console.log((Number(totalTvl) / 1e18) * (Number(rosePrice) / 1e18));
        setTotalTvl((Number(totalTvl) / 1e18) * (Number(rosePrice) / 1e18))
    }

    let timerLoading = useRef(null);
    useEffect(() => {
        if (troveManagerGettersSigner && sortedTrovesToken && priceFeedToken && debtTokenQuery && ethersProvider && lPPriceOracleQuery) {
            getData();
            timerLoading.current = setInterval(() => {
                getData();
            }, 3000)
            return () => clearInterval(timerLoading.current);
        }
    }, [troveManagerGettersSigner, sortedTrovesToken, priceFeedToken, debtTokenQuery, ethersProvider, lPPriceOracleQuery])



    // const txs = new ethers.Contract(stabilityPool, StabilityPoolAbi, ethersProvider);

    // const getTransactionItem = async () => {
    //     let filterFrom = txs.filters.CollateralGainWithdrawn(null, null);
    //     const RewardClaimed = await txs.queryFilter(filterFrom, 3288360, 3296155 + 100);
    //     console.log("--------------", RewardClaimed)
    // }

    // useEffect(() => {
    //     if (txs) {
    //         getTransactionItem()
    //     }
    // }, [txs])



    return (
        <UserContext.Provider
            value={{
                account,
                setAccount,
                ethersProvider,
                setEthersProvider,
                idoAddr,
                usdcAddr,
                idoAbi,
                tokenAbi,
                signer,
                setSigner,
                infuraRPC,
                currentState,
                setCurrentState,
                currentWaitInfo,
                setCurrentWaitInfo,
                troveManager,
                sortedTroves,
                borrowerOperations,
                troveManagerGetters,
                priceFeed,
                debtToken,
                vineToken,
                tokenLocker,
                BoostCalculator,
                VineLpTokenPool,
                LPPriceOracle,
                stabilityPool,
                MultiCollateralHintHelpers,
                incentiveVoting,
                idovesting,
                vineVault,
                VUSDUSDCLP,
                usdcPool,
                mockLp,
                sapphireProvider,
                setSapphireProvider,
                BorrowerOperationsAbi,
                SortedTrovesAbi,
                TroveManagerAbi,
                PriceFeedAbi,
                TroveManagerGettersAbi,
                BoostCalculatorAbi,
                VineLpTokenPoolAbi,
                LPPriceOracleAbi,
                StabilityPoolAbi,
                MultiCollateralHintHelpersAbi,
                IncentiveVotingAbi,
                idovestingAbi,
                vineVaultAbi,
                sapphireProviderSigner,
                setSapphireProviderSigner,
                balance,
                totalRose,
                signInAuth,
                setSignInAuth,
                signInAuthToken,
                setSignInAuthToken,
                sortedTrovesToken,
                troveManagerGettersSigner,
                borrowerOperationsMint,
                priceFeedToken,
                status,
                deposits,
                debt,
                pre,
                next,
                rosePrice,
                vUSDbalance,
                lpPrice,
                vinePrice,
                boost,
                totalTvl,
                debtTokenQuery,
                vineTokenQuery,
                tokenLockerMain,
                vineLpTokenPoolMain,
                troveManagerMain,
                incentiveVotingMain,
                mockLpQuery,
                vineLpTokenPoolQuery,
                lPPriceOracleQuery,
                stabilityPoolMain,
                stabilityPoolQuery,
                multiCollateralHintHelpersQuery,
                troveManagerQuery,
                incentiveVotingQuery,
                tokenLockerQuery,
                boostCalculatorQuery,
                idovestingQuery,
                vineVaultQuery,
                idovestingMain,
                mockLpMain,
                vineVaultMain,
                VUSDUSDCLPQuery,
                usdcPoolQuery,
                VUSDUSDCLPMain,
                usdcPoolMain,
                formatNum,
                vaultEarned,
                vineRoseEarned,
                stabilityEarned,
                vusdUsdcEarned
            }}>
            {children}
        </UserContext.Provider>
    );
};