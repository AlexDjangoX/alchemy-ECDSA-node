import { useState } from 'react';
import server from './server';

import * as secp from 'ethereum-cryptography/secp256k1';
import { utf8ToBytes } from 'ethereum-cryptography/utils';
import { keccak256 } from 'ethereum-cryptography/keccak';

const Transfer = ({
  address,
  privateKey,
  setBalance,
  setTransaction,
  transaction,
}) => {
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
  console.log(transaction);
  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Public key of recipient"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
};

export default Transfer;
