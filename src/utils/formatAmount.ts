export function formatAmount(amount:any, decimals = 18) {
    if (!isBigInt(amount)) return "0.00";
  
    const formattedStr = formatUnits(
      amount,
      isBigInt(decimals) ? decimals.valueOf() : decimals,
    );
  
    return parseFloat(formattedStr).toFixed(2);
  }