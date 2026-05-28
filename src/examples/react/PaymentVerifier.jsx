import React, { useState } from 'react';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';
const API_KEY = process.env.REACT_APP_API_KEY;

export const PaymentVerifier = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const triggerRefresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/api/verify/manual-refresh`, {
        method: 'POST',
        headers: {
          'x-api-key': API_KEY
        }
      });
      const data = await response.json();
      if (data.success) {
        setPayments(data.data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Payment Verification</h2>
      <button 
        onClick={triggerRefresh}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? 'Verifying...' : 'Verify New Payments'}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="mt-4">
        {payments.map(p => (
          <div key={p.transactionId} className="bg-gray-100 p-2 mb-2 rounded">
            <p><strong>Amount:</strong> ₹{p.amount}</p>
            <p><strong>From:</strong> {p.senderName}</p>
            <p><strong>Provider:</strong> {p.provider}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
