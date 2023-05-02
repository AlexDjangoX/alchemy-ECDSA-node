import server from './server';
import * as secp from 'ethereum-cryptography/secp256k1';
import { toHex } from 'ethereum-cryptography/utils';

const Wallet = ({
  address,
  setAddress,
  balance,
  setBalance,
  privateKey,
  setPrivateKey,
}) => {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    const address = toHex(secp.getPublicKey(privateKey));
    console.log('address', address);
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      console.log(balance);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  console.log(privateKey);
  console.log(balance);
  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private key
        <input
          placeholder="Please provide your Private key"
          value={privateKey}
          onChange={onChange}
        ></input>
      </label>
      <p>{`Your address ${address.slice(0, 10)}`}</p>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
};

export default Wallet;
