import React, { useState } from 'react';
import { GreeterClient } from './proto/ServiceServiceClientPb.ts';
import { HelloRequest } from './proto/service_pb.js';
import './App.css';

function App() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const createGrpcClient = () => {
    return new GreeterClient('http://localhost:8080');
  };

  const callService = async (serviceNumber) => {
    setLoading(true);
    setError('');
    try {
      const client = createGrpcClient();
      const request = new HelloRequest();
      request.setName('User');
      
      const metadata = { service: `service${serviceNumber}` };
      const response = await client.sayHello(request, metadata);
      setResponse(response.getMessage());
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>EnvoyLight - gRPC Routing Demo</h1>
        <div className="button-container">
          <button onClick={() => callService(1)} disabled={loading}>
            Call Service 1
          </button>
          <button onClick={() => callService(2)} disabled={loading}>
            Call Service 2
          </button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p className="error">Error: {error}</p>}
        {response && <p className="response">Response: {response}</p>}
      </header>
    </div>
  );
}

export default App; 