import server from '../server';
import * as secp from 'ethereum-cryptography/secp256k1';
import { toHex } from 'ethereum-cryptography/utils';
import { generatedKeysObject } from '../../utils/constants';

console.log(Object.values(generatedKeysObject));

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

  return (
    <div className="flex flex-col   w-[420px] h-[480px] bg-secondary  shadow-card rounded-md ">
      <div className="flex flex-col ">
        <h1 className="flex align-center justify-center text-black text-3xl font-light  pt-8 pb-0 ">
          Your Wallet
        </h1>

        <div className=" flex flex-col justify-center ">
          <label className="flex flex-col p-6 ">
            <span className="flex self-start after:content-['*'] after:ml-0.5 after:text-red-500   text-slate-700 text-2xl font-light">
              Private key
            </span>
            <input
              className="mt-2 px-6 py-4 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-lg focus:ring-1 text-slate-700 "
              placeholder="Private key"
              value={privateKey}
              onChange={onChange}
            />
          </label>
          <div className="flex flex-col p-6 pt-2">
            <span className=" text-slate-700 text-2xl font-light">
              Your Balance
            </span>
            <span
              className="mt-2 px-6 py-4 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-lg focus:ring-1  text-slate-700"
              placeholder="Public key of recipient"
            >
              Balance: {balance}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
{
  /* <div className="flex flex-col  w-[420px] h-[510px] bg-secondary shadow-card rounded-md  ">
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
</div>; */
}
