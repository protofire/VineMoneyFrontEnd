import styles from "../styles/dapp.module.scss";
import Header from "../components/header";
import Footer from "../components/footer";
import { useEffect, useState, useContext, useRef } from "react";
import BigNumber from "bignumber.js";
import Wait from "../components/tooltip/wait";
import Loading from "../components/tooltip/loading";
import tooltip from "../components/tooltip";
import { BlockchainContext } from "../hook/blockchain";
import { formatNumber } from "../utils/helpers";

export default function Redeem() {
  const [amount, setAmount] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [fee, setFee] = useState(0);
  const [showRedeem, setShowRedeem] = useState(false);
  const [feeAmount, setFeeAmount] = useState(0);
  const [expectedCollateralReceived, setExpectedCollateralReceived] =
    useState(0);
  const [rosePrice, setRosePrice] = useState(0);
  const [selectCollateral, setSelectedCollateral] = useState("");
  const [canRedeem, setCanRedeem] = useState(false);

  const {
    getRosePrice,
    setCurrentState,
    setCurrentWaitInfo,
    currentState,
    bitUSDBalance,
    collaterals,
    redeemCollateral,
  } = useContext(BlockchainContext);

  useEffect(() => {
    if (startTime) {
      var timestamp = Date.parse(new Date()) / 1000;
      if (timestamp > startTime) {
        setShowRedeem(true);
      }
    }
  }, [startTime]);

  useEffect(() => {
    if (amount) {
      setFeeAmount((Number(amount) / rosePrice) * fee);
      setExpectedCollateralReceived(
        Number(amount) / rosePrice - (Number(amount) / rosePrice) * fee
      );
    } else {
      setFeeAmount(0);
      setExpectedCollateralReceived(0);
    }
  }, [amount, rosePrice, fee]);

  let timerLoading = useRef(null);
  useEffect(() => {
    queryData();
    timerLoading.current = setInterval(() => {
      queryData();
    }, 30000);
    return () => clearInterval(timerLoading.current);
  }, [collaterals]);

  const onKeyDown = async (e) => {
    const invalidChars = ["-", "+", "e", "E"];
    if (invalidChars.indexOf(e.key) !== -1) {
      e.preventDefault();
    }
  };

  const changeAmount = async (e) => {
    const value = Number(e.target.value);
    if (value < Number(bitUSDBalance)) {
      setAmount(value == 0 ? "" : value);
    } else {
      setAmount(Number(bitUSDBalance));
    }
  };

  const changeAmountVaule = (value) => {
    setAmount(Number(bitUSDBalance) * value);
  };

  const selectCollateralChange = (item) => {
    setSelectedCollateral(item);
    const deploymentTime = collaterals[item].deploymentTime;
    const bootstrapPeriod = collaterals[item].bootstrapPeriod;
    const baseRate = collaterals[item].baseRate;
    const redemptionFeeFloor = collaterals[item].redemptionFeeFloor;

    setStartTime(Number(deploymentTime) + bootstrapPeriod);
    const nowDate = new Date();
    const nowTime = parseInt(nowDate.getTime() / 1000);
    setCanRedeem(nowTime > Number(deploymentTime) + bootstrapPeriod);
    setFee(Number(redemptionFeeFloor) + Number(baseRate));
  };

  const queryData = async () => {
    if (Object.keys(collaterals).length !== 0) {
      const price = getRosePrice();
      setRosePrice(price);
      if (selectCollateral === "") {
        selectCollateralChange(Object.keys(collaterals)[0]);
      }
    }
  };

  let timer = null;
  const getCountDown = () => {
    const nowDate = new Date();
    const nowTime = parseInt(nowDate.getTime() / 1000);
    const t = startTime - nowTime;

    if (t <= -1) {
      clearTimeout(timer);
    } else {
      let day = Math.floor(t / 60 / 60 / 24);
      let hour = Math.floor((t / 60 / 60) % 24);
      let minute = Math.floor((t / 60) % 60);
      let second = Math.floor(t % 60);
      if (day < 10) {
        day = "0" + day;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }
      if (second < 10) {
        second = "0" + second;
      }
      timer = setTimeout(() => {
        getCountDown();
      }, 1000);
      return day + "d " + hour + "h " + minute + "m";
    }
  };

  const redeem = async () => {
    try {
      const tx = await redeemCollateral(
        selectCollateral,
        new BigNumber(amount).multipliedBy(1e18).toFixed()
      );
      setCurrentWaitInfo({
        type: "loading",
        info:
          "Redeem " + Number(amount.toFixed(4)).toLocaleString() + " bitUSD",
      });
      setCurrentState(true);
      const result = await tx.wait();
      setCurrentState(false);
      if (result.status === 0) {
        tooltip.error({
          content:
            "Transaction failed due to a network error. Please refresh the page and try again.",
          duration: 5000,
        });
      } else {
        tooltip.success({ content: "Successful", duration: 5000 });
      }
      setAmount("");
    } catch (error) {
      console.log(error);
      setCurrentState(false);
      tooltip.error({
        content:
          "Transaction failed due to a network error. Please refresh the page and try again.",
        duration: 5000,
      });
    }
  };

  const redeemWrapper = () => {
    if (!showRedeem) {
      tooltip.error({
        content: "Redemption should be available in " + getCountDown(),
        duration: 5000,
      });
      return;
    }
    if (!amount) {
      return;
    }
    redeem();
  };

  return (
    <>
      <Header type="dapp" dappMenu="Redeem"></Header>
      <div className="dappBg">
        <div className={`${styles.Redeem} ${"dappMain"}`}>
          <div className={styles.title}>
            <p>Redeem bitUSD for Collateral</p>
            <span>1 bitUSD is always redeemable for $1 of collateral.</span>
          </div>
          <div className={styles.redeemMain}>
            <div className={styles.inputMain}>
              <p
                style={{
                  color: "#bdbdbd",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "20px",
                  marginBottom: "5px",
                }}
              >
                Select collateral to redeem for:{" "}
              </p>
              <label className={styles.dropdown}>
                <div className={styles.ddButton}>
                  <img
                    style={{ width: 24, height: 24 }}
                    src={`/dapp/${collaterals[selectCollateral]?.collateral.logo}`}
                    alt="rose"
                  />
                  {collaterals[selectCollateral]?.collateral.name}
                </div>

                <input type="checkbox" className={styles.ddInput} id="test" />

                <ul className={styles.ddMenu}>
                  {Object.keys(collaterals).map((item, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() => selectCollateralChange(item)}
                      >
                        <img
                          style={{ width: 24, height: 24 }}
                          src={`/dapp/${collaterals[item]?.collateral.logo}`}
                          alt="rose"
                        />
                        {collaterals[item]?.collateral.name}
                      </li>
                    );
                  })}
                </ul>
              </label>

              {!canRedeem && selectCollateral !== "" ? (
                <p>{`Redemption should be available in ${getCountDown()}`}</p>
              ) : null}
              {canRedeem && (
                <>
                  <div className="balance">
                    <p>Redeem bitUSD</p>
                    <span>Balance {formatNumber(bitUSDBalance)} bitUSD</span>
                  </div>

                  <div className="inputTxt2">
                    <div>
                      <input
                        type="number"
                        placeholder="0"
                        onWheel={(e) => e.target.blur()}
                        id="amount"
                        onKeyDown={onKeyDown.bind(this)}
                        onChange={changeAmount.bind(this)}
                        value={amount}
                      />
                    </div>
                    <span className="font_14 gray">bitUSD</span>
                  </div>
                  <div className="changeBalance" style={{ marginTop: "12px" }}>
                    <span onClick={() => changeAmountVaule(0.25)}>25%</span>
                    <span onClick={() => changeAmountVaule(0.5)}>50%</span>
                    <span onClick={() => changeAmountVaule(0.75)}>75%</span>
                    <span
                      onClick={() => changeAmountVaule(1)}
                      style={{ border: "none" }}
                    >
                      Max
                    </span>
                  </div>
                </>
              )}
            </div>
            {canRedeem && (
              <div className={styles.infoMain}>
                <div
                  className={
                    amount && showRedeem
                      ? "button rightAngle height "
                      : "button rightAngle height disable"
                  }
                  onClick={() => redeemWrapper()}
                >
                  Redeem
                </div>
                <div
                  className="button rightAngle height disable"
                  onClick={() => redeemWrapper()}
                >
                  Redeem
                </div>
                <div className={styles.data} style={{ borderTop: "none" }}>
                  <div className={styles.dataItem}>
                    <p>Collateral Price</p>
                    <span>${formatNumber(rosePrice)}</span>
                  </div>
                  <div className={styles.dataItem}>
                    <p>Redemption Fee</p>
                    <span>{formatNumber(fee * 100)}%</span>
                  </div>
                  <div className={styles.dataItem}>
                    <p>Redemption Fee Amount</p>
                    <span>{formatNumber(feeAmount)} ROSE</span>
                  </div>
                  <div className={styles.dataItem}>
                    <p>Expected Collateral Received</p>
                    <span>{formatNumber(expectedCollateralReceived)} ROSE</span>
                  </div>
                  <div className={styles.dataItem}>
                    <p>Value of Collateral Received</p>
                    <span>
                      ${formatNumber(expectedCollateralReceived * rosePrice)}
                    </span>
                  </div>
                  <div className={styles.dataItem}>
                    <p>Actual Redemption Amount</p>
                    <span>{formatNumber(amount)} bitUSD</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {currentState ? <Wait></Wait> : null}
      {Object.keys(collaterals).length === 0 ? <Loading></Loading> : null}
      <Footer></Footer>
    </>
  );
}
