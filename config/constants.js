// Constants

// port
const PORT = 3639;

// Addresse create for the Ethereum account lacated in the "../node/data/keystore/UTC--2023.."
const ADDRESS_WALLET_JSON = "0x00000000000000000000000000000000000000000";

// address from my test metamask account
const DEFAULT_ACCOUNT = "0x0000000000000000000000000000000000000000";

// Load and decrypt an Ethereum account using a keystore file and password
const keystorePath =
  "../node/data/keystore/UTC--2023-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json";

module.exports = {
  PORT,
  ADDRESS_WALLET_JSON,
  DEFAULT_ACCOUNT,
  KEYSTOREPATH,
};
