import styles from '../styles/dapp.module.scss'
import Header from '../components/header'
import Footer from '../components/footer'
import { UserContext } from "../hook/user";
import { useEffect, useState, useContext, useRef } from 'react';
import { ethers } from "ethers";
import DepositsAndDebt from "../components/dapp/depositsAndDebt";
import BigNumber from "bignumber.js";
import Wait from "../components/tooltip/wait";
import tooltip from "../components/tooltip";

export default function Vault() {
    const { account, troveManager, balance, vUSDbalance, currentState, setCurrentState, setCurrentWaitInfo, borrowerOperationsMint, status, debt, deposits, pre, next, rosePrice } = useContext(UserContext);
    const onKeyDown = async (e) => {
        const invalidChars = ['-', '+', 'e', 'E']
        if (invalidChars.indexOf(e.key) !== -1) {
            e.preventDefault()
        }
    };

    const [isFirst, setIsFirst] = useState(false);
    useEffect(() => {
        if (Number(deposits) > 0) {
            setIsFirst(true);
        } else {
            setIsFirst(false)
        }
    }, [deposits])

    const [buttonName, setButtonName] = useState("Deposit");

    const [operateType, setOperateType] = useState("Collateral");

    const changeOperateType = (value) => {
        setOperateType(value);
        if (value == "Repay") {
            setButtonName("Repay");
        } else if (value == "Close") {
            setButtonName("Repay & Close");
        } else {
            if (operateType2 == "Deposit") {
                setButtonName("Deposit");
            } else {
                setButtonName("Withdraw");
            }
        }
    }

    const [operateType2, setOperateType2] = useState("Deposit");

    const changeOperateType2 = (value) => {
        setOperateType2(value);
        setButtonName(value);
        setCollAmount('');
    }

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

    const changeWithdrawAmount = async (e) => {
        const value = Number(e.target.value);
        if (value < withdrawMax) {
            setCollAmount(value == 0 ? '' : value);
        } else {
            setCollAmount(withdrawMax);
        }
    }

    const changeCollVaule = (value) => {
        if (buttonName == "Deposit") {
            setCollAmount(((balance - 1 > 0 ? balance - 1 : 0)) * value);
        } else if (buttonName == "Withdraw") {
            setCollAmount(withdrawMax * value);
        } else {
            setDebtAmount(Number(vUSDbalance) * value);
        }
    }

    const [currentRatio, setCurrentRatio] = useState(0);
    const [afterRatio, setAfterRatio] = useState(0);
    useEffect(() => {
        const ratio1 = (deposits * rosePrice / debt) * 100;
        setCurrentRatio(ratio1);
        if (collAmount) {
            const ratio2 = ((deposits + Number(collAmount)) * rosePrice / (debt + 10)) * 100;
            setAfterRatio(ratio2);
        }
    }, [collAmount, debt, deposits, rosePrice])

    const [showContinue, setShowContinue] = useState(false);

    const [debtAmount, setDebtAmount] = useState('');
    const changeDebtAmount = async (e) => {
        const value = Number(e.target.value);
        if (value > Number(vUSDbalance)) {
            setDebtAmount(Number(vUSDbalance));
        } else {
            setDebtAmount(value == 0 ? '' : value);
        }
    }


    const [withdrawMax, setWithdrawMax] = useState(0);
    useEffect(() => {
        const value = deposits - ((debt + 20) / rosePrice * 1.5);
        setWithdrawMax(value >= 0 ? value : 0);
    }, [deposits, rosePrice, debt])


    const Deposit = async () => {
        setShowContinue(false);

        if (!collAmount) {
            return
        }
        if (status == 0 || status == 2) {
            // console.log("0/2----------", troveManager, account, (new BigNumber(1e16)).toFixed(), (new BigNumber(collAmount).multipliedBy(1e18)).toFixed(), (new BigNumber(10).multipliedBy(1e18)).toFixed(), pre, next, { value: (new BigNumber(collAmount).multipliedBy(1e18)).toFixed() })
            try {
                const mintTx = await borrowerOperationsMint.openTrove(troveManager, account, (new BigNumber(1e16)).toFixed(), (new BigNumber(collAmount).multipliedBy(1e18)).toFixed(), (new BigNumber(10).multipliedBy(1e18)).toFixed(), pre, next, { value: (new BigNumber(collAmount).multipliedBy(1e18)).toFixed() });
                setCurrentWaitInfo({ type: "loading", info: "Deposit " + Number(collAmount.toFixed(4)).toLocaleString() + " $ROSE" })
                setCurrentState(true);
                const mintResult = await mintTx.wait();
                setCurrentState(false);
                if (mintResult.status === 0) {
                    tooltip.error({ content: "Transaction failed due to a network error. Please refresh the page and try again.", duration: 5000 })
                } else {
                    tooltip.success({ content: "Successful", duration: 5000 });
                }
                setCollAmount('');
            } catch (error) {
                setCurrentState(false);
                tooltip.error({ content: "Transaction failed due to a network error. Please refresh the page and try again.", duration: 5000 })
            }

        } else {
            try {
                const mintTx = await borrowerOperationsMint.addColl(troveManager, account, (new BigNumber(collAmount).multipliedBy(1e18)).toFixed(), pre, next, { value: (new BigNumber(collAmount).multipliedBy(1e18)).toFixed() });
                setCurrentWaitInfo({ type: "loading", info: "Deposit " + Number(collAmount.toFixed(4)).toLocaleString() + " $ROSE" })
                setCurrentState(true);
                const mintResult = await mintTx.wait();
                setCurrentState(false);
                if (mintResult.status === 0) {
                    tooltip.error({ content: "Transaction failed due to a network error. Please refresh the page and try again.", duration: 5000 })
                } else {
                    tooltip.success({ content: "Successful", duration: 5000 });
                }
                setCollAmount('');
            } catch (error) {
                setCurrentState(false);
                tooltip.error({ content: "Transaction failed due to a network error. Please refresh the page and try again.", duration: 5000 })
            }

        }

    }

    const withdrawColl = async () => {
        if (!collAmount) {
            return
        }
        try {
            const withdrawTx = await borrowerOperationsMint.withdrawColl(troveManager, account, (new BigNumber(collAmount).multipliedBy(1e18)).toFixed(), pre, next);
            setCurrentWaitInfo({ type: "loading", info: "Withdraw " + Number(collAmount.toFixed(4)).toLocaleString() + " $ROSE" })
            setCurrentState(true);
            const result = await withdrawTx.wait();
            setCurrentState(false);
            if (result.status === 0) {
                tooltip.error({ content: "Transaction failed due to a network error. Please refresh the page and try again.", duration: 5000 })
            } else {
                tooltip.success({ content: "Successful", duration: 5000 });
            }
            setCollAmount('');
        } catch (error) {
            setCurrentState(false);
            tooltip.error({ content: "Transaction failed due to a network error. Please refresh the page and try again.", duration: 5000 })
        }

    }

    const repayDebt = async () => {
        if (!debtAmount) {
            return
        }
        try {
            const repayTx = await borrowerOperationsMint.repayDebt(troveManager, account, (new BigNumber(debtAmount).multipliedBy(1e18)).toFixed(), pre, next);
            setCurrentWaitInfo({ type: "loading", info: "Repay " + Number(debtAmount.toFixed(4)).toLocaleString() + " $vUSD" })
            setCurrentState(true);
            const result = await repayTx.wait();
            setCurrentState(false);
            if (result.status === 0) {
                tooltip.error({ content: "Transaction failed due to a network error. Please refresh the page and try again.", duration: 5000 })
            } else {
                tooltip.success({ content: "Successful", duration: 5000 });
            }
            setDebtAmount('');
        } catch (error) {
            setCurrentState(false);
            tooltip.error({ content: "Transaction failed due to a network error. Please refresh the page and try again.", duration: 5000 })
        }

    }

    const [showClose, setShowClose] = useState(false);


    const repayClose = async () => {
        if (Number(vUSDbalance) < Number(debt)) {
            tooltip.error({ content: "You do not have enough vUSD in your wallet to repay your debt. You require an additional " + Number((Number(debt) - Number(vUSDbalance)).toFixed(4)).toLocaleString() + " $vUSD.", duration: 5000 })
            return
        }
        setShowClose(false);
        try {
            const closeTx = await borrowerOperationsMint.closeTrove(troveManager, account);
            setCurrentWaitInfo({ type: "loading", info: "" })
            setCurrentState(true);
            const result = await closeTx.wait();
            setCurrentState(false);
            if (result.status === 0) {
                tooltip.error({ content: "Transaction failed due to a network error. Please refresh the page and try again.", duration: 5000 })
            } else {
                tooltip.success({ content: "Successful", duration: 5000 });
            }
            setOperateType("Collateral");
            setOperateType2("Deposit");
            setButtonName("Deposit");
        } catch (error) {
            setCurrentState(false);
            tooltip.error({ content: "Transaction failed due to a network error. Please refresh the page and try again.", duration: 5000 })
        }

    }

    const changeShowClose = () => {
        if (Number(vUSDbalance) < Number(debt)) {
            return
        } else {
            setShowClose(true);
        }
    }

    const Operate = () => {
        if (buttonName == "Deposit") {
            setShowContinue(true);
        } else if (buttonName == "Withdraw") {
            withdrawColl();
        } else if (buttonName == "Repay") {
            repayDebt();
        } else {
            repayClose();
        }
    }

    return (
        <>
            <Header type="dapp" dappMenu="Vault"></Header>
            <div className='dappBg'>
                <div className={`${styles.Vault} ${"dappMain"}`} >
                    {isFirst
                        ? null
                        : <div className={styles.topType}>
                            <h3>Vault</h3>
                            <p>Boost the value of your $ROSE by depositing it into Vault to elevate your collateral ratio and unlock its full potential via VINE protocol.</p>
                        </div>}

                    <DepositsAndDebt></DepositsAndDebt>

                    {isFirst
                        ? <div className={styles.topType}><h3>Manage Your Vault</h3></div>
                        : null}
                    <div className={styles.rose}>
                        {isFirst
                            ? null
                            : <div className={styles.CoinType}>
                                <img src='/dapp/rose.svg' alt='rose' />
                                $ROSE
                            </div>}
                        <div className={styles.enterAmount}>
                            {isFirst
                                ? <div className={styles.operateType}>
                                    <div className={operateType == "Collateral" ? styles.active : ""} onClick={() => changeOperateType("Collateral")}>Collateral</div>
                                    <div className={operateType == "Repay" ? styles.active : ""} onClick={() => changeOperateType("Repay")}>Repay vUSD</div>
                                    <div className={operateType == "Close" ? styles.active : ""} onClick={() => changeOperateType("Close")}>Close</div>
                                </div> : null}
                            {isFirst && operateType == "Collateral"
                                ? <div className={styles.operateType2}>
                                    <div className={operateType2 == "Deposit" ? styles.active : ""} onClick={() => changeOperateType2("Deposit")}>Deposit $ROSE</div>
                                    <div className={operateType2 == "Withdraw" ? styles.active : ""} onClick={() => changeOperateType2("Withdraw")}>Withdraw $ROSE</div>
                                </div> : null}

                            {buttonName == "Deposit"
                                ? <><div className={styles.miniTitle}>
                                    <span>Enter amount</span>
                                    <span style={{ "fontSize": "12px" }}>Balance {Number(Number(balance).toFixed(4)).toLocaleString()} $ROSE</span>
                                </div>
                                    <div className='inputTxt3'>
                                        <input type='number' placeholder='0' onWheel={(e) => e.target.blur()} id="collAmount" onKeyDown={onKeyDown.bind(this)} onChange={changeCollAmount.bind(this)} value={collAmount}></input>
                                        <span>$ROSE</span>
                                    </div></>
                                : buttonName == "Withdraw" ?
                                    <><div className={styles.miniTitle}>
                                        <span>Enter amount</span>
                                        <span style={{ "fontSize": "12px" }}>Balance {Number(Number(withdrawMax).toFixed(4)).toLocaleString()} $ROSE</span>
                                    </div>
                                        <div className='inputTxt3'>
                                            <input type='number' placeholder='0' onWheel={(e) => e.target.blur()} id="collAmount" onKeyDown={onKeyDown.bind(this)} onChange={changeWithdrawAmount.bind(this)} value={collAmount}></input>
                                            <span>$ROSE</span>
                                        </div></>
                                    : buttonName == "Repay"
                                        ? <><div className={styles.miniTitle}>
                                            <span>{operateType} vUSD</span>
                                            <span style={{ "fontSize": "12px" }}>Balance {Number(Number(vUSDbalance).toFixed(4)).toLocaleString()} vUSD</span>
                                        </div>
                                            <div className='inputTxt3'>
                                                <input type='number' placeholder='0' onWheel={(e) => e.target.blur()} id="debtAmount" onKeyDown={onKeyDown.bind(this)} onChange={changeDebtAmount.bind(this)} value={debtAmount}></input>
                                                <span>$vUSD</span>
                                            </div></>
                                        : null}
                            {operateType == "Close" ? null : <div className="changeBalance">
                                <span onClick={() => changeCollVaule(0.25)}>25%</span>
                                <span onClick={() => changeCollVaule(0.5)}>50%</span>
                                <span onClick={() => changeCollVaule(0.75)}>75%</span>
                                <span onClick={() => changeCollVaule(1)} style={{ "border": "none" }}>Max</span>
                            </div>}
                            {!isFirst ? (<><div className={styles.miniTitle} style={{ "fontSize": "12px", "marginTop": "10px" }}>
                                <span>Current Collateral Ratio </span>
                                <span>{Number(Number(currentRatio).toFixed(4)).toLocaleString()}%</span>
                            </div>
                                {collAmount ? <div className={styles.miniTitle} style={{ "fontSize": "12px", "marginTop": "10px", "color": "#509D7B" }}>
                                    <span>Collateral Ratio after Deposit </span>
                                    <span>{Number(Number(afterRatio).toFixed(4)).toLocaleString()}%</span>
                                </div> : null}</>) : null}

                            {operateType == "Close"
                                ? <>
                                    <div className={`${styles.miniTitle} ${styles.borderGreen}`} style={{ "fontSize": "12px", "marginTop": "10px" }}>
                                        <span>Total Collateral</span>
                                        <span>{Number(Number(deposits).toFixed(4)).toLocaleString()} $ROSE</span>
                                    </div>
                                    <div className={`${styles.miniTitle} ${styles.borderGray}`} style={{ "fontSize": "12px", "marginTop": "10px" }}>
                                        <span>Your Total Debt</span>
                                        <span>{Number(Number(debt).toFixed(4)).toLocaleString()} $vUSD</span>
                                    </div>
                                    <div className={`${styles.miniTitle}`} style={{ "fontSize": "12px", "marginTop": "10px" }}>
                                        <span>Wallet Balance</span>
                                        <div className={styles.walletBalance} ><span style={Number(vUSDbalance) < Number(debt) ? null : { "color": "#fff" }}>{Number(Number(vUSDbalance).toFixed(4)).toLocaleString()}</span> $vUSD</div>
                                    </div>
                                </>
                                : null}

                        </div>
                        <div style={{ "padding": "8px" }}>
                            {buttonName == "Deposit" || buttonName == "Withdraw"
                                ? <div className={!collAmount ? "button rightAngle height disable" : 'button rightAngle height'} onClick={() => Operate()}>{buttonName}</div>
                                : buttonName == "Repay"
                                    ? <div className={!debtAmount ? "button rightAngle height disable" : 'button rightAngle height'} onClick={() => Operate()}>{buttonName}</div>
                                    : <div className={Number(vUSDbalance) < Number(debt) ? "button rightAngle height disable" : 'button rightAngle height'} onClick={() => changeShowClose()}>{buttonName}</div>
                            }
                        </div>
                        {operateType == "Close"
                            ? Number(vUSDbalance) < Number(debt) ? <div className={styles.closeTip}>
                                <p>You do not have enough vUSD in your wallet to repay your debt. You require an additional <span>{Number((Number(debt) - Number(vUSDbalance)).toFixed(4)).toLocaleString()}</span> $vUSD.</p>
                            </div> : null
                            : <div className={styles.data}>
                                <div className={styles.dataItem}>
                                    <p>Total Value Locked</p>
                                    <span>${Number((deposits * rosePrice).toFixed(4)).toLocaleString()}</span>
                                </div>
                                <div className={styles.dataItem}>
                                    <p>Minted vUSD</p>
                                    <span>${Number((debt).toFixed(4)).toLocaleString()}</span>
                                </div>
                                <div className={styles.dataItem}>
                                    <p>Mint Fee</p>
                                    <span>0.5%</span>
                                </div>
                                <div className={styles.dataItem}>
                                    <p>Borrow Interest Rate</p>
                                    <span>2.5%</span>
                                </div>
                            </div>}
                    </div>
                </div >
            </div>

            {currentState ? <Wait></Wait> : null
            }
            {
                showContinue ?
                    <div className={styles.showTip}>
                        <div className={styles.tipMain}>
                            <div className={styles.close}>
                                <img src='/icon/close.svg' alt='icon' onClick={() => setShowContinue(false)} />
                            </div>
                            <div className={styles.tipDesc}>
                                A minimum of 10 vUSD will be minted when depositing $ROSE.
                            </div>
                            <div className={styles.button}>
                                <span className='button' onClick={() => Deposit()}>Continue</span>
                                <span className='button' style={{ "background": "#2b2929" }} onClick={() => setShowContinue(false)}> Cancel</span>
                            </div>
                        </div>
                    </div>
                    : null
            }
            {showClose ?
                <div className={styles.showTip}>
                    <div className={`${styles.tipMain} ${styles.closeMain}`}>
                        <div className={styles.close}>
                            <img src='/icon/close.svg' alt='icon' onClick={() => setShowClose(false)} />
                        </div>
                        <div className={styles.closeTitle}>You are about to close your $ROSE account</div>
                        <p className={styles.closeDesc}>You will need to repay any outstanding vUSD debt:</p>
                        <div className={styles.closeCoin}>
                            <p>{Number(Number(debt).toFixed(4)).toLocaleString()}</p>
                            <div>
                                <img src='/dapp/vUSD.svg' alt='vUSD'></img>
                                $vUSD
                            </div>
                        </div>
                        <p className={styles.closeDesc}>You will receive your collateral of:</p>
                        <div className={styles.closeCoin}>
                            <p>{Number(Number(deposits).toFixed(4)).toLocaleString()}</p>
                            <div>
                                <img src='/dapp/rose.svg' alt='rose'></img>
                                $ROSE
                            </div>
                        </div>
                        <div className={styles.button}>
                            <span className='button rightAngle height' style={{ "width": "100%" }} onClick={() => Operate()}>Repay & Close</span>
                        </div>
                    </div>
                </div> : null
            }
            <Footer></Footer>
        </>
    )
}
