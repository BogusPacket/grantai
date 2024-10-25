import React, { useState } from 'react';
import axios from 'axios';

function RunScript() {
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleRunScript = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/run-script');
      setOutput(response.data.output);
      setError(response.data.error);
    } catch (err) {
      setError(`Error: ${err.message}`);
    }
  };

  return (
    <div>
      <h1>Run Python Script</h1>
      <button onClick={handleRunScript}>Run Script</button>
      <div>
        <h2>Output:</h2>
        <pre>{output}</pre>
      </div>
      {error && (
        <div>
          <h2>Error:</h2>
          <pre>{error}</pre>
        </div>
      )}
    </div>
  );
}

export default RunScript;