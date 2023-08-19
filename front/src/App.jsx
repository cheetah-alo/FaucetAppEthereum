// Import necessary modules and styles
import { useEffect, useState } from "react";
import "./App.css";

function App() {
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
        setError("Failed to request Ethereum accounts.");
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

      const url = `http://localhost:3333/balance/${cuenta}`;
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
    const url = `http://localhost:33303/faucet/${cuenta}`;
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log(json);
    } catch (err) {
      setError("Failed to invoke faucet.");
      console.error(err);
    }
  }

  // Render the component
  return (
    <div>
      {/* Display any error messages */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* Display the Ethereum address and balance */}
      <h1>Address: {cuenta || "Not connected"}</h1>
      <h1>Balance: {saldo}</h1>
      {/* Button to invoke the faucet */}
      <button onClick={invocarFaucet} disabled={!cuenta}>
        Invocar Faucet
      </button>
    </div>
  );
}

// Export the App component to be used in other parts of our app
export default App;
