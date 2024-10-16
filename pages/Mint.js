import styles from '../styles/dapp.module.scss'
import Header from '../components/header'
import Footer from '../components/footer'
import { UserContext } from "../hook/user";
import { useEffect, useState, useContext, useRef } from 'react';
import BigNumber from "bignumber.js";
import Wait from "../components/tooltip/wait";
import tooltip from "../components/tooltip";
import DepositsAndDebt from "../components/dapp/depositsAndDebt"

export default function Mint() {
    const { account, troveManager, balance, currentState, setCurrentState, setCurrentWaitInfo, borrowerOperationsMint, status, debt, deposits, pre, next, rosePrice } = useContext(UserContext);

    const onKeyDown = async (e) => {
        const invalidChars = ['-', '+', 'e', 'E']
        if (invalidChars.indexOf(e.key) !== -1) {
            e.preventDefault()
        }
    };

    const [ratioType, setRatioType] = useState("Custom");

    const [collAmount, setCollAmount] = useState('');
    const changeCollAmount = async (e) => {
        const value = Number(e.target.value);
        const maxBalance = (balance - 1 > 0 ? balance - 1 : 0);
        if (value < maxBalance) {
            setCollAmount(value == 0 ? '' : value);
        } else {
            setCollAmount(maxBalance);
        }
    }

    const changeCollVaule = (value) => {
        setCollAmount((balance - 1 > 0 ? balance - 1 : 0) * value);
    }


    const [collateralRatio, setCollateralRatio] = useState(0);
    const changeCollateralRatio = async (e) => {
        const value = Number(e.target.value);
        setCollateralRatio(value == 0 ? '' : value);
    }

    const [debtMax, setDebtMax] = useState(0);
    useEffect(() => {
        if (collateralRatio && ratioType == "Auto") {
            const max = Number(deposits + collAmount) * rosePrice / (collateralRatio / 100) - debt;
            setDebtMax(max);
        } else {
            const max = Number(deposits + collAmount) * rosePrice / 1.55 - debt;
            setDebtMax(max);
        }

    }, [collAmount, rosePrice, collateralRatio, ratioType])




    const [debtAmount, setDebtAmount] = useState('');
    const changeDebtAmount = async (e) => {
        const value = Number(e.target.value);
        if (value > debtMax) {
            setDebtAmount(debtMax);
        } else {
            setDebtAmount(value == 0 ? '' : value);
        }
    }

    const changeDebtVaule = (value) => {
        setDebtAmount(debtMax * value);
    }

    const [ratio, setRatio] = useState(0);
    const [ratioNew, setRatioNew] = useState(0);
    useEffect(() => {
        const value = (deposits * rosePrice) / debt * 100;
        setRatio(value)
        if (collateralRatio && ratioType == "Auto") {
            setRatioNew(collateralRatio)
        } else {
            const valueNew = ((deposits + Number(collAmount)) * rosePrice) / (debt + Number(debtAmount)) * 100;
            setRatioNew(valueNew)
        }
    }, [collAmount, rosePrice, collateralRatio, debtAmount, ratioType])

    const changeRatioType = (index) => {
        setRatioType(index);
        if (index == "Auto") {
            setCollateralRatio(0);
        }
    }

    useEffect(() => {
        if (collAmount) {
            if (collateralRatio && ratioType == "Auto") {
                const max = Number(deposits + collAmount) * rosePrice / (collateralRatio / 100) - debt;
                setDebtAmount(max);
            } else {
                const max = Number(deposits + collAmount) * rosePrice / 1.55 - debt;
                setDebtAmount(max);
            }
        }
    }, [collAmount, ratioType, collateralRatio])

    const Mint = async () => {
        if (!collAmount || !debtAmount) {
            return
        }
        if (Number(debtAmount) < 10) {
            tooltip.error({ content: "A Minimum Debt of 10 vUSD is Required!", duration: 5000 })
            return
        }
        if (status == 0 || status == 2) {
            try {
                const mintTx = await borrowerOperationsMint.openTrove(troveManager, account, (new BigNumber(1e16)).toFixed(), (new BigNumber(collAmount).multipliedBy(1e18)).toFixed(), (new BigNumber(debtAmount).multipliedBy(1e18)).toFixed(), pre, next, { value: (new BigNumber(collAmount).multipliedBy(1e18)).toFixed() });
                setCurrentWaitInfo({ type: "loading", info: "Mint " + Number(debtAmount.toFixed(4)).toLocaleString() + " $vUSD" })
                setCurrentState(true);
                const mintResult = await mintTx.wait();
                setCurrentState(false);
                if (mintResult.status === 0) {
                    tooltip.error({ content: "Transaction failed due to a network error. Please refresh the page and try again.", duration: 5000 })
                } else {
                    tooltip.success({ content: "Successful", duration: 5000 });
                }
                setCollAmount('');
                setDebtAmount('');
            } catch (error) {
                setCurrentState(false);
                tooltip.error({ content: "Transaction failed due to a network error. Please refresh the page and try again.", duration: 5000 })
            }
        } else {
            try {
                const mintTx = await borrowerOperationsMint.adjustTrove(troveManager, account, (new BigNumber(1e16)).toFixed(), (new BigNumber(collAmount).multipliedBy(1e18)).toFixed(), 0, (new BigNumber(debtAmount).multipliedBy(1e18)).toFixed(), true, pre, next, { value: (new BigNumber(collAmount).multipliedBy(1e18)).toFixed() });
                setCurrentWaitInfo({ type: "loading", info: "Mint " + Number(debtAmount.toFixed(4)).toLocaleString() + " $vUSD" })
                setCurrentState(true);
                const mintResult = await mintTx.wait();
                setCurrentState(false);
                if (mintResult.status === 0) {
                    tooltip.error({ content: "Transaction failed due to a network error. Please refresh the page and try again.", duration: 5000 })
                } else {
                    tooltip.success({ content: "Successful", duration: 5000 });
                }
                setCollAmount('');
                setDebtAmount('');
            } catch (error) {
                setCurrentState(false);
                tooltip.error({ content: "Transaction failed due to a network error. Please refresh the page and try again.", duration: 5000 })
            }

        }

    }


    return (
        <>
            <Header type="dapp" dappMenu="Mint"></Header>
            <div className='dappBg'>
                <div className={`${styles.Mint} ${"dappMain"}`} >
                    <div className={styles.topType}>
                        <h3>Mint vUSD</h3>
                        <p>Deposit your $ROSE as collateral in Vault to mint vUSD. Stake vUSD or provide liquidity to earn rewards using the VINE Protocol.</p>
                    </div>
                    <DepositsAndDebt></DepositsAndDebt>
                    <div className={styles.mintMain}>
                        <div className={styles.CoinType}>
                            <img src='/dapp/vUSD.svg' alt='vUSD' />
                            $vUSD
                        </div>
                        <div className={styles.enterAmount}>
                            <div className={styles.miniTitle}>
                                <span>Enter amount</span>
                                <span style={{ "fontSize": "12px" }}>Balance {Number(Number(balance).toFixed(4)).toLocaleString()} $ROSE</span>
                            </div>
                            <div className='inputTxt3'>
                                <input type='number' placeholder='0' onWheel={(e) => e.target.blur()} id="collAmount" onKeyDown={onKeyDown.bind(this)} onChange={changeCollAmount.bind(this)} value={collAmount}></input>
                                <span>$ROSE</span>
                            </div>
                            <div className="changeBalance">
                                <span onClick={() => changeCollVaule(0.25)}>25%</span>
                                <span onClick={() => changeCollVaule(0.5)}>50%</span>
                                <span onClick={() => changeCollVaule(0.75)}>75%</span>
                                <span onClick={() => changeCollVaule(1)} style={{ "border": "none" }}>Max</span>
                            </div>
                        </div>
                        <div className={styles.ratio}>
                            <span className={styles.miniTitle}>Collateral Ratio</span>
                            <div className={styles.autoOrcustom}>
                                <div className={styles.buttonList}>
                                    <span className={ratioType == "Custom" ? 'button rightAngle' : 'button rightAngle noactive'} onClick={() => changeRatioType("Custom")}>Custom</span>
                                    <span className={ratioType == "Auto" ? 'button rightAngle' : 'button rightAngle noactive'} onClick={() => changeRatioType("Auto")}>Auto</span>
                                </div>
                                {ratioType == "Auto" ? <div className='inputTxt' style={{ "width": "120px" }}>
                                    <input type='number' placeholder='0' onWheel={(e) => e.target.blur()} id="collateralRatio" onKeyDown={onKeyDown.bind(this)} onChange={changeCollateralRatio.bind(this)} value={collateralRatio}></input>
                                    <span>%</span>
                                </div> : null}
                            </div>
                        </div>
                        <div className={styles.enterAmount}>
                            <div className={styles.miniTitle}>
                                <span>Mint vUSD</span>
                                <span style={{ "fontSize": "12px" }}>max {Number(Number(debtMax).toFixed(2)).toLocaleString()} vUSD</span>
                            </div>
                            <div className='inputTxt3'>
                                <input type='number' placeholder='0' onWheel={(e) => e.target.blur()} id="debtAmount" onKeyDown={onKeyDown.bind(this)} onChange={changeDebtAmount.bind(this)} value={debtAmount}></input>
                                <span>$vUSD</span>
                            </div>
                            <div className="changeBalance">
                                <span onClick={() => changeDebtVaule(0.25)}>25%</span>
                                <span onClick={() => changeDebtVaule(0.5)}>50%</span>
                                <span onClick={() => changeDebtVaule(0.75)}>75%</span>
                                <span onClick={() => changeDebtVaule(1)} style={{ "border": "none" }}>Max</span>
                            </div>
                        </div>
                        <div className={styles.debt}>
                            <div className={styles.dataList}>
                                <div className={styles.dataItem}>
                                    <p>+ Collateral Assets</p>
                                    <span>${Number((Number(collAmount) * rosePrice).toFixed(2)).toLocaleString()}</span>
                                </div>
                                <div className={styles.dataItem}>
                                    <p>+ Minted vUSD</p>
                                    <div>
                                        <span>{Number(Number(debt).toFixed(2)).toLocaleString()} vUSD</span>
                                        {collAmount && debtAmount ? <span> ➡️ {Number((Number(debtAmount) + Number(debt)).toFixed(2)).toLocaleString()} vUSD</span> : null}
                                    </div>
                                </div>
                                <div className={styles.dataItem}>
                                    <p>+ Collateral Ratio</p>
                                    <div>
                                        <span>{Number(Number(ratio).toFixed(2)).toLocaleString()}%</span>
                                        {collAmount && debtAmount ? <span> ➡️ {Number(Number(ratioNew).toFixed(2)).toLocaleString()}%</span> : null}
                                    </div>
                                </div>
                                <div className={styles.dataItem}>
                                    <p>+ Mint Fee</p>
                                    <span>10 vUSD</span>
                                </div>
                                <div className={styles.dataItem}>
                                    <p>Liquidation Price</p>
                                    <span>ROSE = ${(Number(debt * 1.5 / deposits).toFixed(4)).toLocaleString()}</span>
                                </div>
                            </div>
                            <div className={styles.total}>
                                <p>Total Debt</p>
                                <span>{Number((debt + Number(debtAmount) + 10).toFixed(2)).toLocaleString()} vUSD</span>
                            </div>
                        </div>
                        <div className={styles.button}>
                            <div className={!collAmount || !debtAmount ? "button rightAngle height disable" : 'button rightAngle height'} onClick={() => Mint()}>Mint</div>
                        </div>
                    </div>
                </div>
            </div>


            {currentState ? <Wait></Wait> : null}

            <Footer></Footer>
        </>
    )
}
