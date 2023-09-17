// Import necessary modules and styles
import { useEffect, useState } from "react";
import "./App.css";

const { ethereum } = window;

function FaucetApp() {
  // State variables to store the Ethereum account and its balance
  const [cuenta, setCuenta] = useState(null);
  const [saldo, setSaldo] = useState(0);
  // State variable to store any error messages
  const [error, setError] = useState(null);

  // useEffect hook to run code after the component mounts
  useEffect(() => {
    // Check if Ethereum provider (like MetaMask) is installed
    if (!window.ethereum) {
      setError("Ethereum provider not detected. Please install MetaMask.");
      return;
    }

    // Request access to user's Ethereum accounts
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((cuentas) => {
        // Set the first account as the current account
        setCuenta(cuentas[0]);
      })
      .catch((err) => {
        setError("Failed to fetch account.");
        console.error(err);
      });

    // Listen for changes in the user's Ethereum accounts
    window.ethereum.on("accountsChanged", (cuentas) => {
      setCuenta(cuentas[0]);
    });
  }, []); // Empty dependency array means this useEffect runs once after component mounts

  // useEffect hook to fetch the balance whenever the account changes
  useEffect(() => {
    async function obtenerBalance() {
      // Exit if no account is set
      if (!cuenta) return;
      const url = `http://localhost:3639/balance/${cuenta}`;
      try {
        // Fetch the balance from our backend
        const response = await fetch(url);
        const json = await response.json();
        // Update the balance in our state
        setSaldo(json.balance);
      } catch (err) {
        setError("Failed to fetch balance.");
        console.error(err);
      }
    }

    obtenerBalance();
  }, [cuenta]); // This useEffect runs whenever 'cuenta' changes

  // Function to invoke the faucet and get some test Ether
  async function invocarFaucet() {
    const url = `http://localhost:3639/faucet/${cuenta}`;
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log(json);
    } catch (err) {
      setError("Failed to send ethereum.");
      console.error(err);
    }
  }

  // Render the component
  return (
    <div>
      {/* Display any error messages */}
      {error && (
        <p style={{ color: "#ff6f61", fontSize: "130%" }}>
          Failed to invoke faucet.
        </p>
      )}
      {/* Display the Ethereum address and balance */}
      <div
        style={{
          border: "5px solid #ccc",
          padding: "2px",
          backgroundColor: "#55C2D3",
        }}>
        <h1>Address: {cuenta || "Not connected"}</h1>
      </div>
      <h1>Balance: {saldo}</h1>

      {/* Button to invoke the faucet */}
      <button
        onClick={() => invocarFaucet()}
        style={{
          padding: "15px 30px",
          backgroundColor: "#8bc34a",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "130%",
        }}>
        Request 0.5 ETH
      </button>
    </div>
  );
}

// Export the App component to be used in other parts of our app
export default FaucetApp;
