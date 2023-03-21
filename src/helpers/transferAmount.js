import { ethers } from 'ethers';

export const transferAmount = async (addressTo, amount, contract) => {
  const resp = await contract.transfer(addressTo, ethers.utils.parseEther(amount.toString(), 'ethers'));
  return resp.hash;
};
