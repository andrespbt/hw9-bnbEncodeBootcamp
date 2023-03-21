export const ContractInformation = ({ info }) => {
  const { name, symbol, decimals, totalSupply, balanceOfAccount, owner } = info;
  return (
    <div className="info-container">
      <h2>Contract Information</h2>
      <div className="info-text-container">
        <span>
          <strong>Name:</strong> {name}
        </span>
        <span>
          <strong>Symbol:</strong> {symbol}
        </span>
        <span>
          <strong>Decimals:</strong> {decimals}
        </span>
      </div>
      <div className="info-text-container">
        <span>
          <strong>Total Supply:</strong> {totalSupply}
        </span>
        <span>
          <strong>Owner:</strong> {owner}
        </span>
        <span>
          <strong>Your balance:</strong> {balanceOfAccount}
        </span>
      </div>
    </div>
  );
};
