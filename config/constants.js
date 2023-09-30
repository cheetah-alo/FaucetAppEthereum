// Constants

// port
const PORT = 3639;

// Addresse create for the Ethereum account lacated in the "../node/data/keystore/UTC--2023.."
const ADDRESS_WALLET_JSON = "0xcEB8b310696f642271aD28E5b9A80022a72C90c8";

// address from my test metamask account
const DEFAULT_ACCOUNT = "0xd88414acafb9882f113bc7cf1537815678e0abc8";

// Load and decrypt an Ethereum account using a keystore file and password
const KEYSTOREPATH =
  "../node/data/keystore/UTC--2023-09-30T09-47-03.152372000Z--ceb8b310696f642271ad28e5b9a80022a72c90c8.json";

module.exports = {
  PORT,
  ADDRESS_WALLET_JSON,
  DEFAULT_ACCOUNT,
  KEYSTOREPATH,
};
