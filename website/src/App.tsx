import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [address, setAddress] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState<any>(null);

  const handleClaimTokens = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = {
        // "TODO: Implement claim tokens",
      };

      setSuccess(result);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Token Claim Form</h1>

      <form>
        <section>
          <label>Customer (bech32 address):</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
          />
        </section>

        <section>
          <label>Pin Code:</label>
          <input
            type="text"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
            placeholder="Enter your pin code"
          />
        </section>

        <button onClick={handleClaimTokens} disabled={isLoading}>
          Claim Tokens
        </button>

        {error && (
          <section className="error-box">
            <strong>Error:</strong> {error?.message}
          </section>
        )}

        {success && (
          <section className="success-box">
            <h5>Unsigned Tx</h5>
            <code>{success.tx}</code>
          </section>
        )}
      </form>
    </>
  );
}

export default App;
