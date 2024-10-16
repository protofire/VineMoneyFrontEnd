import styles from '../styles/dapp.module.scss'
import Header from '../components/header'
import Footer from '../components/footer'
import { useEffect, useState, useContext, useRef } from 'react';
import BigNumber from "bignumber.js";
import Wait from "../components/tooltip/wait";
import tooltip from "../components/tooltip";
import { UserContext } from "../hook/user";

export default function Reward() {
    const { debt, balance, account, currentState, setCurrentState, setCurrentWaitInfo,
        stabilityPoolQuery, vineLpTokenPoolQuery, vineVaultMain, troveManager, stabilityPool, VineLpTokenPool,
        vinePrice, usdcPoolQuery, usdcPool, vaultEarned, vineRoseEarned, stabilityEarned, vusdUsdcEarned } = useContext(UserContext);

    const [openVault, setOpenVault] = useState(false);
    const [openPool, setOpenPool] = useState(false);
    const [openLp, setOpenLp] = useState(false);
    const [openusdcLp, setOpenusdcLp] = useState(false);

    const [showInfoTip, setShowInfoTip] = useState(false);


    const [unStakeLpBalance, setUnStakeLpBalance] = useState(0);
    const [accountDeposits, setAccountDeposits] = useState(0);
    const [unStakeLpBalance2, setUnStakeLpBalance2] = useState(0);
    const queryData = async () => {

        const deposit1 = await vineLpTokenPoolQuery.balanceOf(account);
        setUnStakeLpBalance((new BigNumber(deposit1._hex).div(1e18)).toFixed());
        const deposit2 = await stabilityPoolQuery.accountDeposits(account);
        setAccountDeposits((new BigNumber(deposit2[0]._hex).div(1e18)).toFixed());

        const deposit3 = await usdcPoolQuery.balanceOf(account);
        setUnStakeLpBalance2((new BigNumber(deposit3._hex).div(1e18)).toFixed());

    }

    let timerLoading = useRef(null);
    useEffect(() => {
        queryData();
        timerLoading.current = setInterval(() => {
            queryData();
        }, 2000)
        return () => clearInterval(timerLoading.current);
    }, [account]);

    const cancelBubble = (event) => {
        event.stopPropagation();
    };

    const [showClaim, setShowClaim] = useState(false);
    useEffect(() => {
        if (vaultEarned || vineRoseEarned || stabilityEarned || vusdUsdcEarned) {
            setShowClaim(true)
        }
    }, [vaultEarned, vineRoseEarned, stabilityEarned, vusdUsdcEarned]);

    const [totalEarned, setTotalEarned] = useState(0);
    useEffect(() => {
        const num = vaultEarned + vineRoseEarned + stabilityEarned + vusdUsdcEarned;
        setTotalEarned(num);
    }, [vaultEarned, vineRoseEarned, stabilityEarned, vusdUsdcEarned])

    const ClaimAll = async () => {
        if (!showClaim) {
            return;
        }
        let claimArr = [];
        if (vaultEarned) {
            claimArr.push(troveManager);
        }
        if (stabilityEarned) {
            claimArr.push(stabilityPool);
        }
        if (vineRoseEarned) {
            claimArr.push(VineLpTokenPool)
        }
        if (vusdUsdcEarned) {
            claimArr.push(usdcPool)
        }
        try {
            // console.log(account, "0x0000000000000000000000000000000000000000", claimArr, 10)
            const tx = await vineVaultMain.batchClaimRewards(account, "0x0000000000000000000000000000000000000000", claimArr, 10);
            setCurrentWaitInfo({ type: "loading" })
            setCurrentState(true);
            const result = await tx.wait();
            setCurrentState(false);
            if (result.status === 0) {
                tooltip.error({ content: "Transaction failed due to a network error. Please refresh the page and try again.", duration: 5000 })
            } else {
                tooltip.success({ content: "Successful", duration: 5000 });
            }
        } catch (error) {
            console.log(error)
            setCurrentState(false);
            tooltip.error({ content: "Transaction failed due to a network error. Please refresh the page and try again.", duration: 5000 })
        }
    };

    const Claim = async (value, num) => {
        if (!num) {
            return
        }
        try {
            const tx = await value.claimReward(account);
            setCurrentWaitInfo({ type: "loading" })
            setCurrentState(true);
            const result = await tx.wait();
            setCurrentState(false);
            if (result.status === 0) {
                tooltip.error({ content: "Transaction failed due to a network error. Please refresh the page and try again.", duration: 5000 })
            } else {
                tooltip.success({ content: "Successful", duration: 5000 });
            }
        } catch (error) {
            console.log(error)
            setCurrentState(false);
            tooltip.error({ content: "Transaction failed due to a network error. Please refresh the page and try again.", duration: 5000 })
        }
    };

    return (
        <>
            <Header type="dapp" dappMenu="Reward"></Header>
            <div className='dappBg'>
                <div className={`${styles.Reward} ${"dappMain3"}`}>
                    {/* <div className={styles.dataInfo2}>
                        <div className={styles.value}>
                            <span>Your Rewards</span>
                            <div>
                                <p>{Number(deposits.toFixed(4)).toLocaleString()}</p>
                                <span className={styles.span}>Lockable with a max boost</span>
                            </div>
                        </div>
                        <div className={styles.value}>
                            <span>Your Deposits</span>
                            <div className={styles.imgtype}>
                                <p>{Number(debt.toFixed(4)).toLocaleString()}</p>
                                <img src='/dapp/vUSD.svg' alt='vUSD' />
                                <p>
                                    vUSD
                                </p>
                            </div>
                        </div>
                        <div className={styles.value}>
                            <span>Your Boost</span>
                            <div>
                                <p>0.00x</p>
                                <span className={styles.span}>Up to 0.00 $VINE</span>
                            </div>
                        </div>
                    </div> */}
                    <div className={styles.centerMain}>
                        <div className={styles.desc}>
                            <p>Rewards</p>
                            <span>There are a number of ways to earn $VINE, such as minting vUSD against collateral or by depositing vUSD in to the Stability Pool. Each week, the amount of $VINE allocated to these actions changes depending on the outcome of the emissions vote.</span>
                        </div>
                        <div className={styles.earned}>
                            <p className="font_12_73">Earned</p>
                            <div className={styles.coinValue}>
                                <img src='/dapp/vine.svg' alt='' />
                                <div>
                                    <p>{Number(totalEarned.toFixed(4)).toLocaleString()} $VINE</p>
                                    <span>≈ ${Number(Number(totalEarned * Number(vinePrice)).toFixed(4)).toLocaleString()}</span>
                                </div>
                            </div>
                            <div className={styles.opButton}>
                                <div className={showClaim ? 'button_border' : 'button_border disable'} onClick={() => ClaimAll()}>
                                    Claim ALL
                                </div>
                                <div className='button_border' onClick={() => setShowInfoTip(true)}>
                                    LOCK ALL
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className={styles.tab}>
                        <div className={styles.tabItem} onClick={() => setOpenVault(!openVault)}>
                            <div>
                                <img className={styles.logo} src='/dapp/vine.svg' alt='rose' />
                                <p>Vault</p>
                            </div>
                            <div onClick={cancelBubble.bind(this)}>
                                {/* <span className={vaultNum ? 'button_border' : 'button_border disable'} onClick={() => Claim(troveManagerMain, vaultNum)}>
                                    Claim
                                </span> */}
                                <img onClick={() => setOpenVault(!openVault)} className={styles.open} style={openVault ? { "transform": "rotate(180deg)" } : null} src='/dapp/arr_bottom.svg' alt='arr' />
                            </div>
                        </div>
                        {openVault ? <div className={styles.tabMain}>
                            <div>
                                <span className='font_12_gray'>Position</span>
                                <p className='font_14'>{Number(debt.toFixed(4)).toLocaleString()} $vUSD</p>
                                <span className='font_12_gray'>Deposited</span>
                            </div>
                            <div>
                                <span className='font_12_gray'>Earned $VINE</span>
                                <p className='font_14'>{Number(vaultEarned.toFixed(4)).toLocaleString()} $VINE</p>
                            </div>
                            {/* <div>
                                <span className='font_12_gray'>Locked $VINE</span>
                                <p className='font_14'>0 $VINE</p>
                            </div> */}
                        </div> : null}
                    </div>
                    <div className={styles.tab}>
                        <div className={styles.tabItem} onClick={() => setOpenPool(!openPool)}>
                            <div>
                                <img className={styles.logo} src='/dapp/vUSD.svg' alt='rose' />
                                <p>Stability Pool</p>
                            </div>
                            <div onClick={cancelBubble.bind(this)}>
                                {/* <span className={stabilityPoolNum ? 'button_border' : 'button_border disable'} onClick={() => Claim(stabilityPoolMain, stabilityPoolNum)}>
                                    Claim
                                </span> */}
                                <img onClick={() => setOpenPool(!openPool)} className={styles.open} style={openPool ? { "transform": "rotate(180deg)" } : null} src='/dapp/arr_bottom.svg' alt='arr' />
                            </div>
                        </div>
                        {openPool ? <div className={styles.tabMain}>
                            <div>
                                <span className='font_12_gray'>Position</span>
                                <p className='font_14'>{Number(Number(accountDeposits).toFixed(4)).toLocaleString()} $vUSD</p>
                                <span className='font_12_gray'>Deposited</span>
                            </div>
                            <div>
                                <span className='font_12_gray'>Earned $VINE</span>
                                <p className='font_14'>{Number(stabilityEarned.toFixed(4)).toLocaleString()} $VINE</p>
                            </div>
                            {/* <div>
                                <span className='font_12_gray'>Locked $VINE</span>
                                <p className='font_14'>0 $VINE</p>
                            </div> */}
                        </div> : null}
                    </div>
                    <div className={styles.tab}>
                        <div className={styles.tabItem} onClick={() => setOpenLp(!openLp)}>
                            <div>
                                <img className={styles.logo} src='/dapp/vineArose.svg' alt='rose' />
                                <p>VINE/ROSE LP</p>
                            </div>
                            <div onClick={cancelBubble.bind(this)}>
                                {/* <span className={vineLpTokenNum ? 'button_border' : 'button_border disable'} onClick={() => Claim(vineLpTokenPoolMain, vineLpTokenNum)}>
                                    Claim
                                </span> */}
                                <img onClick={() => setOpenLp(!openLp)} className={styles.open} style={openLp ? { "transform": "rotate(180deg)" } : null} src='/dapp/arr_bottom.svg' alt='arr' />
                            </div>
                        </div>
                        {openLp ? <div className={styles.tabMain}>
                            <div>
                                <span className='font_12_gray'>Position</span>
                                <p className='font_14'>{Number(Number(unStakeLpBalance).toFixed(4)).toLocaleString()} LP</p>
                                <span className='font_12_gray'>Deposited</span>
                            </div>
                            <div>
                                <span className='font_12_gray'>Earned $VINE</span>
                                <p className='font_14'>{Number(vineRoseEarned.toFixed(4)).toLocaleString()} $VINE</p>
                            </div>
                            {/* <div>
                                <span className='font_12_gray'>Locked $VINE</span>
                                <p className='font_14'>0 $VINE</p>
                            </div> */}
                        </div> : null}
                    </div>
                    <div className={styles.tab}>
                        <div className={styles.tabItem} onClick={() => setOpenusdcLp(!openusdcLp)}>
                            <div>
                                <img className={styles.logo} src='/dapp/usdc.svg' alt='rose' />
                                <p>vUSD/USDC LP</p>
                            </div>
                            <div onClick={cancelBubble.bind(this)}>
                                {/* <span className={vineLpTokenNum ? 'button_border' : 'button_border disable'} onClick={() => Claim(vineLpTokenPoolMain, vineLpTokenNum)}>
                                    Claim
                                </span> */}
                                <img onClick={() => setOpenusdcLp(!openusdcLp)} className={styles.open} style={openusdcLp ? { "transform": "rotate(180deg)" } : null} src='/dapp/arr_bottom.svg' alt='arr' />
                            </div>
                        </div>
                        {openusdcLp ? <div className={styles.tabMain}>
                            <div>
                                <span className='font_12_gray'>Position</span>
                                <p className='font_14'>{Number(Number(unStakeLpBalance2).toFixed(4)).toLocaleString()} LP</p>
                                <span className='font_12_gray'>Deposited</span>
                            </div>
                            <div>
                                <span className='font_12_gray'>Earned $VINE</span>
                                <p className='font_14'>{Number(vusdUsdcEarned.toFixed(4)).toLocaleString()} $VINE</p>
                            </div>
                            {/* <div>
                                <span className='font_12_gray'>Locked $VINE</span>
                                <p className='font_14'>0 $VINE</p>
                            </div> */}
                        </div> : null}
                    </div>
                </div>
            </div>
            {showInfoTip
                ? <div className='infoTip'>
                    <div className='info infoNoPadding'>
                        <div className='infoTitle'>
                            <div>
                                <img className='vUSD' src='/dapp/vUSD.svg' alt='vUSD' />
                                <p>Lock $VINE</p>
                            </div>
                            <div className="close">
                                <img src='/icon/close.svg' alt='icon' onClick={() => setShowInfoTip(false)} />
                            </div>
                        </div>
                        <div className={styles.enterAmount}>
                            <div className={styles.miniTitle}>
                                <span>Enter amount</span>
                                <span style={{ "fontSize": "12px" }}>Balance {Number(Number(balance).toFixed(4)).toLocaleString()} $ROSE</span>
                            </div>
                            <div className='inputTxt3'>
                                <input type='number' placeholder='0' ></input>
                                <span>$ROSE</span>
                            </div>
                            <div className="changeBalance">
                                <span>25%</span>
                                <span>50%</span>
                                <span>75%</span>
                                <span style={{ "border": "none" }}>Max</span>
                            </div>
                        </div>
                        <div className="data">
                            <div className="dataItem">
                                <p>Amount to lock</p>
                                <span>1,000</span>
                            </div>
                            <div className="dataItem">
                                <p>Boost</p>
                                <span>2.00x</span>
                            </div>
                            {/* <div className='button rightAngle height' style={{ "marginTop": "10px" }}>Lock</div> */}
                            <div className='button rightAngle height disable' style={{ "marginTop": "10px", "border": "1px solid #333" }}>COMING SOON</div>

                        </div>
                    </div>
                </div>
                : null}
            {currentState ? <Wait></Wait> : null}
            <Footer></Footer>
        </>
    )
}
