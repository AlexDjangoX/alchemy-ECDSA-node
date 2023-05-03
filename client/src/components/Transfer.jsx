import { useState } from 'react';
import server from '../server';

import * as secp from 'ethereum-cryptography/secp256k1';
import { utf8ToBytes } from 'ethereum-cryptography/utils';
import { keccak256 } from 'ethereum-cryptography/keccak';

const Transfer = ({ address, privateKey, setBalance, setTransaction }) => {
  const [sendAmount, setSendAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  let [nonce, setNonce] = useState(0);

  const setValue = (setter) => (evt) => setter(evt.target.value);

  const transfer = async (event) => {
    event.preventDefault();

    const messageHash = keccak256(
      utf8ToBytes(recipient + sendAmount + JSON.stringify(nonce))
    );

    const signedTransaction = await secp.sign(messageHash, privateKey, {
      recovered: true,
    });

    const headerContent = {
      sender: address,
      amount: parseInt(sendAmount),
      recipient,
      nonce,
      signedTransaction,
    };

    try {
      const {
        data: { balance },
      } = await server.post(`send`, headerContent);

      const newTransaction = {
        timeStamp: new Date().toLocaleString(),
        sender: address,
        amount: balance,
        recipient,
        nonce: nonce,
      };

      setTransaction((transaction) => [...transaction, newTransaction]);
      setBalance(balance);
      setNonce((previous) => previous + 1);
    } catch (ex) {
      alert('Alert ', ex.response.data.message);
    }
  };

  return (
    <div className="flex flex-col   w-[420px] h-[480px] bg-secondary  shadow-card rounded-md ">
      <form className="flex flex-col " onSubmit={transfer}>
        <h1 className="flex align-center justify-center text-black text-3xl font-light  pt-8 pb-0 ">
          Send Transaction
        </h1>
        <div className=" flex flex-col justify-center ">
          <label className="flex flex-col p-6 ">
            <span className="flex self-start after:content-['*'] after:ml-0.5 after:text-red-500   text-slate-700 text-2xl font-light">
              Send Amount
            </span>
            <input
              className="mt-2 px-6 py-4 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-lg focus:ring-1  text-slate-700 "
              placeholder="Be generous"
              value={sendAmount}
              onChange={setValue(setSendAmount)}
            />
          </label>
          <label className="flex flex-col p-6 pt-2">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block  text-slate-700 text-2xl font-light">
              Recipient
            </span>
            <input
              className="mt-2 px-6 py-4 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-lg focus:ring-1  text-slate-700"
              placeholder="Public key "
              value={recipient}
              onChange={setValue(setRecipient)}
            />
          </label>
          <div className="flex justify-center p-6">
            <button
              type="submit"
              value="Transfer"
              className="rounded-full text-red bg-blue-900  h-14 w-64 outline-1 outline-white outline"
            >
              Transfer
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Transfer;
