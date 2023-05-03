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
