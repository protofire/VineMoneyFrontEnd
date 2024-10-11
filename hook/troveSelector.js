import { createContext, useState, useContext } from "react";
import { BlockchainContext } from "./blockchain";

export const TroveSelectorContext = createContext({
  // STATES
  deposits: 0,
  debt: 0,
  status: "",
  price: 0,
  collateral: {},

  // FUNCTIONS
  troveData: () => {},
});

export const TroveSelectorProvider = ({ children }) => {
  const { userTroves, collaterals, collateralPrices } =
    useContext(BlockchainContext);

  // STATES
  const [deposits, setDeposits] = useState(0);
  const [debt, setDebt] = useState(0);
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState(0);
  const [collateral, setCollateral] = useState({});

  // QUERY FUNCTIONS
  const troveData = (address) => {
    const collateral = collaterals[address];
    const price = collateralPrices[address];
    const userTrove = userTroves[address];

    setCollateral(collateral);
    setPrice(price);
    setDeposits(userTrove.deposits);
    setDebt(userTrove.debt);
    setStatus(userTrove.status);
  };

  return (
    <TroveSelectorContext.Provider
      value={{ deposits, debt, status, price, collateral, troveData }}
    >
      {children}
    </TroveSelectorContext.Provider>
  );
};
