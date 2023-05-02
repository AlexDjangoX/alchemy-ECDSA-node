const express = require('express');
const app = express();
const cors = require('cors');
const port = 3042;

const secp = require('ethereum-cryptography/secp256k1');
const { toHex, utf8ToBytes } = require('ethereum-cryptography/utils');
const { keccak256 } = require('ethereum-cryptography/keccak');

app.use(cors());
app.use(express.json());

// let generatedKeysObject = require('./script/generateKeys').generatedKeysObject;

const generatedKeysObject = {
  'Key 0': {
    private: '3b138a9c6ba951dae886dacdbaab779156eaa3a600fffc97d4085c0aa1517b05',
    public:
      '04f94309b4c114f0c81608d40b9bf99012a5334b2969901aa5e0f40b7d4419e015cbd7385bf5d97d6193f61c96caa80e587c613fb9ade47af44229004b85e16145',
    address: '7af44229004b85e16145',
  },
  'Key 1': {
    private: '4fd8f71cff7be9f0d5b7222666c851d9cefaff25018492a35410a0fc16f56c2e',
    public:
      '040f3f5660a2ecf07d0cb8e03ab2d89d4e0eb306dc340635e48dbdd9bd9c3ec0b036c5559ecff501ec60a8cf2f1570e0b44f8107096adcd0a4e1e298015b7443da',
    address: 'd0a4e1e298015b7443da',
  },
  'Key 2': {
    private: '77d9ebacd71cee39ae8db38070a517a7245dce7149af907c4fccbff6bd0e3f0d',
    public:
      '04cb53ea7543a254b91e61570b6efd6c47f949222d1dac50d2adb4f42059da2ecf4b1e8f53b6a496a608b2d0d7588d1cbc42cee5b1537af572f1451ab189768e15',
    address: 'f572f1451ab189768e15',
  },
};

const balances = {
  [generatedKeysObject['Key 0'].public]: 100,
  [generatedKeysObject['Key 1'].public]: 50,
  [generatedKeysObject['Key 2'].public]: 75,
};

app.get('/balance/:address', (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post('/send', (req, res) => {
  const { sender, recipient, amount, nonce, signedTransaction } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  const [signature, recoveryBit] = signedTransaction;

  const unit8ArraySignature = Uint8Array.from(Object.values(signature));

  const messageToBytes = utf8ToBytes(
    recipient + amount + JSON.stringify(nonce)
  );

  const messageHashToHex = toHex(keccak256(messageToBytes));

  const publicKey = secp.recoverPublicKey(
    messageHashToHex,
    unit8ArraySignature,
    recoveryBit
  );

  const verifyTransaction = secp.verify(
    unit8ArraySignature,
    messageHashToHex,
    publicKey
  );

  handleTransactionResponse(
    verifyTransaction,
    balances,
    sender,
    recipient,
    amount,
    res
  );
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

const setInitialBalance = (address) => {
  if (!balances[address]) {
    balances[address] = 0;
  }
  balances[address];
};

const handleTransactionResponse = (
  verifyTransaction,
  balances,
  sender,
  recipient,
  amount,
  res
) => {
  if (!verifyTransaction) {
    return res.status(400).send({ message: 'Invalid Transaction' });
  }
  if (balances[sender] < amount) {
    return res.status(400).send({ message: 'Not enough funds!' });
  } else if (sender === recipient) {
    return res
      .status(400)
      .send({ message: 'Please enter a different recipient address' });
  }
  balances[sender] -= amount;
  balances[recipient] += amount;
  res.send({ balance: balances[sender] });
};

// const publicKeys = Object.values(generatedKeysObject).map((el) => el.public);

// const privateKeys = Object.values(generatedKeysObject).map((el) => el.private);
