import { ethers } from 'ethers';

export const mintAmmount = async (amount, contract, address) => {
  const resp = await contract._mint(address, ethers.utils.parseUnits(amount.toString(), 'ether'));

  return resp.hash;
};
