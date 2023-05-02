import Wallet from './Wallet';
import Transfer from './Transfer';
import Transactions from './Transactions';
import './App.scss';
import { useState } from 'react';

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [transaction, setTransaction] = useState([]);
  return (
    <div className="app">
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
      <Transactions transaction={transaction} />
    </div>
  );
}

export default App;
