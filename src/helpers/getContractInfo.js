import { ethers } from 'ethers';

export const getContractInfo = async (contract, setFunction) => {
  const { ethereum } = window;

  // Get contract information using async
  const name = await contract.name();
  const symbol = await contract.symbol();
  const decimals = await contract.decimals();
  let totalSupply = ethers.utils.formatUnits((await contract.totalSupply()).toString()).split('.')[0];
  const balanceOfAccount = ethers.utils
    .formatUnits((await contract.balanceOf(ethereum.selectedAddress)).toString())
    .split('.')[0];
  const owner = await contract.getOwner();

  // Set contract information in an object
  setFunction({
    name,
    symbol,
    decimals,
    totalSupply,
    balanceOfAccount,
    owner,
  });
};
