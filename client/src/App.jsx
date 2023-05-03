import { Keys, Navbar, Transactions, Transfer, Wallet } from './components';

import { useState } from 'react';

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [transaction, setTransaction] = useState([]);
  return (
    <>
      <Navbar />
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <div className="flex justify-evenly pt-12">
          <Keys />
        </div>
        <div className="flex align-center justify-evenly w-full bg-primary pt-[50px] pb-[50px] ">
          <Wallet
            balance={balance}
            setBalance={setBalance}
            privateKey={privateKey}
            setPrivateKey={setPrivateKey}
            address={address}
            setAddress={setAddress}
          />
          <Transfer
            setBalance={setBalance}
            address={address}
            privateKey={privateKey}
            setTransaction={setTransaction}
            transaction={transaction}
          />
        </div>

        <div className="flex flex-wrap justify-center align-center h-100 overflow-y-scroll mx-auto ">
          <Transactions transaction={transaction} />
        </div>
      </div>
    </>
  );
}

export default App;
