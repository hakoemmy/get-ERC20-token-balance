 
import { utils } from "ethers";

 // Function to format token balance to ETH value
 export const formatTokenBalanceToETH = (balance: string, decimals: number) => {
    const ethValue = utils.formatUnits(balance, decimals);
    return ethValue.toString();
  };
