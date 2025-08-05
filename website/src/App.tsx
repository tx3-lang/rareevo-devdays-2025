import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { protocol } from "rare";

function App() {
  const [address, setAddress] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ cbor: string } | null>(null);

  const handleClaimTokens = async () => {
    if (!address.trim() || !pinCode.trim()) {
      setError("Please enter both address and pin code");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Convert pin code string to Uint8Array
      const pinBytes = new TextEncoder().encode(pinCode);

      const result = await protocol.claimTokensTx({
        customer: address,
        pin: pinBytes,
      });

      console.log("Claim tokens result:", result);

      setSuccess({ cbor: result.tx });
    } catch (error) {
      console.error("Error claiming tokens:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Error claiming tokens. Please try again."
      );
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
      <div className="card">
        {error && (
          <div className="error-box">
            <strong>Error:</strong> {error}
          </div>
        )}

        {success && (
          <div className="success-box">
            <strong>Success!</strong>
            <div className="cbor-data">
              <strong>CBOR:</strong> {success.cbor}
            </div>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="address" className="form-label">
            Address:
          </label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="pinCode" className="form-label">
            Pin Code:
          </label>
          <input
            id="pinCode"
            type="password"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
            placeholder="Enter your pin code"
            className="form-input"
          />
        </div>

        <button
          onClick={handleClaimTokens}
          disabled={isLoading}
          className="claim-button"
        >
          {isLoading ? "Claiming..." : "Claim Tokens"}
        </button>
      </div>
      <p className="read-the-docs">
        Enter your address and pin code to claim your tokens
      </p>
    </>
  );
}

export default App;
