import styles from "../../styles/dapp.module.scss";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { UserContext } from "../../hook/user";
import { BlockchainContext } from "../../hook/blockchain";
import { useEffect, useState, useContext } from "react";
import BigNumber from "bignumber.js";
import Wait from "../../components/tooltip/wait";
import tooltip from "../../components/tooltip";
import DepositsAndDebt from "../../components/dapp/depositsAndDebt";
import { useRouter } from "next/router";
import ManageDeposit from "../../components/deposit/manageDeposit";
import InitialDeposit from "../../components/deposit/initialDeposit";

export default function Vault() {
  const router = useRouter();
  const { userTroves, collaterals } = useContext(BlockchainContext);

  const [isFirst, setIsFirst] = useState(false);

  useEffect(() => {
    if (userTroves[router.query.vault]?.deposits === 0) setIsFirst(true);
  }, [collaterals, userTroves]);

  return (
    <>
      <Header type="dapp" dappMenu="Vault"></Header>
      <div className="dappBg">
        {isFirst ? (
          <InitialDeposit address={router.query.vault} />
        ) : (
          <ManageDeposit address={router.query.vault} />
        )}
      </div>

      <Footer></Footer>
    </>
  );
}
