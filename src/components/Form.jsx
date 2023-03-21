import { useState } from 'react';
import { transfer } from '../helpers/transferAmount';

export const Form = ({ onSubmit, formValues, setFormValues, transactionHash }) => {
  const url = 'https://testnet.bscscan.com/tx/';
  return (
    <form onSubmit={e => onSubmit(e, formValues)}>
      <fieldset>
        <legend>Mint</legend>
        <input
          type="text"
          placeholder="Enter ammount to mint"
          onChange={e => setFormValues({ ...formValues, mint: e.target.value })}
          value={formValues.mint || ''}
        />
        <input
          type="submit"
          value="Mint"
        />
      </fieldset>

      <fieldset>
        <legend>Transfer</legend>
        <label htmlFor="to">Address to transfer</label>
        <input
          id="to"
          type="text"
          placeholder="Enter address to transfer"
          onChange={e => setFormValues({ ...formValues, transfer: { ...formValues.transfer, to: e.target.value } })}
          value={formValues.transfer?.to || ''}
        />

        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="text"
          placeholder="Enter amount to transfer"
          onChange={e => setFormValues({ ...formValues, transfer: { ...formValues.transfer, value: e.target.value } })}
          value={formValues.transfer?.value || ''}
        />

        <input
          type="submit"
          value="Transfer"
        />
      </fieldset>

      {transactionHash && (
        <>
          <h3>Transaction Succeed !</h3>
          <a
            target="_blank"
            href={`${url}${transactionHash}`}
            rel="noreferrer">
            Transaction url
          </a>
        </>
      )}
    </form>
  );
};
