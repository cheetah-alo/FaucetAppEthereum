// Import necessary modules
const { Web3 } = require("web3");
const fs = require("fs");
const cors = require("cors");
const express = require("express");

// Import constants
const { PORT, ADDRESS_WALLET_JSON, KEYSTOREPATH } = require("../config/myconstants");

// Create a new Express application
const app = express();

// Middleware to handle CORS
app.use(cors());

// Create a new Web3 instance connected to a local Ethereum node
const web3 = new Web3("http://localhost:8545");

const json = JSON.parse(fs.readFileSync(KEYSTOREPATH, "utf-8"));

// API endpoint to retrieve the balance of an Ethereum account
app.get("/balance/:address", async (req, res) => {
  try {
    const balance = await web3.eth.getBalance(req.params.address);
    res.json({ balance: balance.toString() }); // Convert BigInt to string
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve balance" });
  }
});

// API endpoint to send ether from the faucet to the specified address
app.get("/faucet/:address", async (req, res) => {
  try {
    const account = await web3.eth.accounts.decrypt(json, "1234");
    const tx = {
      chainId: 8888,
      to: req.params.address,
      from: account.address,
      gas: 30000,
      value: web3.utils.toWei("0.5", "ether"),
    };
    // signed the transaction
    const txSigned = await account.signTransaction(tx);
    // send the aswaer of the transaction
    const receipt = await web3.eth.sendSignedTransaction(
      txSigned.rawTransaction
    );
    res.json({ transactionHash: receipt.transactionHash });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send ether" });
  }
});

// Start the server
app.listen(PORT, "localhost", () => {
  console.log(`Server running on port ${PORT}`);
});

// Retrieve and display the balance of an "Master" Ethereum account
(async () => {
  try {
    const balance = await web3.eth.getBalance(
      //address from the json file linked to the mining's wallet
      ADDRESS_WALLET_JSON
    );
    console.log(`Balance: ${balance}`);
  } catch (err) {
    console.error("Error retrieving balance:", err);
  }
})();
