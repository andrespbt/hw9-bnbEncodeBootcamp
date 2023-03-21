import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import abi from './abi/abi.json';
import { getContractInfo, mintAmmount, transferAmount } from './helpers';
import { Form } from './components/Form';
import { ContractInformation } from './components/ContractInformation';

function App() {
  const [contractObject, setContractObject] = useState({});
  const [connected, setConnected] = useState(false);
  const [contractInfo, setContractInfo] = useState({});
  const [formValues, setFormValues] = useState({
    mint: '',
    transfer: { from: '', to: '', value: '' },
  });
  const [transactionHash, setTransactionHash] = useState(null);
  const { ethereum } = window;
  let contract = null;

  // UseEffect on component mount
  useEffect(() => {
    if (ethereum) {
      const address = '0x67efb6498193CaAaA13baD48c9e2DaC69dfd9b35';
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      contract = new ethers.Contract(address, abi, signer);
      setContractObject(contract);

      // Call getContractInfo to get the contract information using async await
      getContractInfo(contract, setContractInfo);
    }
  }, []);

  // Connect function
  const onConnectButtonClick = () => {
    if (!connected) {
      ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
        setConnected(true);
      });
    }
  };

  // Form submit
  const onFormSubmit = async (e, formValues) => {
    e.preventDefault();
    let lastTransactionHash = null;
    const {
      mint,
      transfer: { to, value, isApproved },
    } = formValues;

    // Mint
    if (mint) {
      // Call mint and save transaction hash
      lastTransactionHash = await mintAmmount(mint, contractObject, ethereum.selectedAddress);
      // Update amounts
      setContractInfo({
        ...contractInfo,
        balanceOfAccount: Number(contractInfo.balanceOfAccount) + Number(mint),
        totalSupply: Number(contractInfo.totalSupply) + Number(mint),
      });
      // Clear form
      setFormValues({ mint: '' });

      // Set transaction hash
      setTransactionHash(lastTransactionHash);
      return;
    }

    // Transfer
    if (to && value) {
      // Call transfer and save transaction hash
      lastTransactionHash = await transferAmount(to, value, contractObject);

      // Update amounts
      setContractInfo({
        ...contractInfo,
        balanceOfAccount: Number(contractInfo.balanceOfAccount) - Number(value),
      });

      // Clear form
      setFormValues({ transfer: { to: '', value: '' } });

      // Set transaction hash
      setTransactionHash(lastTransactionHash);
      return;
    }
  };

  return (
    <div className="App">
      <h1>{contractInfo.name}</h1>

      {/* Connect Button */}
      <button onClick={onConnectButtonClick}>{connected ? 'Connected' : 'Connect wallet'}</button>

      {/* Information */}

      {contractInfo && connected && <ContractInformation info={contractInfo} />}

      {/* Form */}
      {connected && (
        <Form
          contract={contract}
          connected={connected}
          onSubmit={onFormSubmit}
          formValues={formValues}
          setFormValues={setFormValues}
          transactionHash={transactionHash}
        />
      )}
    </div>
  );
}

export default App;
