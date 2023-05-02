const secp = require('ethereum-cryptography/secp256k1');
const { toHex } = require('ethereum-cryptography/utils');

const generateKeys = () => {
  let keys = {};

  for (let i = 0; i < 3; i++) {
    const privateKey = toHex(secp.utils.randomPrivateKey());
    const publicKey = toHex(secp.getPublicKey(privateKey));
    const userAddress = publicKey.slice(-20);

    keys['Key ' + i] = {
      private: privateKey,
      public: publicKey,
      address: userAddress,
    };
  }

  return keys;
};

const generatedKeysObject = generateKeys();

module.exports = { generatedKeysObject };
