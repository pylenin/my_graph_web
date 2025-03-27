import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Container } from '@mui/material';

const GraphForm = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [graphCode, setGraphCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('csv', csvFile);
    formData.append('prompt', prompt);

    try {
      const response = await axios.post('https://text-to-bi-test-3d3e72bc9c89.herokuapp.com/api/generate-graph', formData);
      setGraphCode(response.data.code); // Store the JS code
      eval(response.data.code); // Execute the returned JS to render the chart
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setCsvFile(e.target.files[0])}
        />
        <TextField
          label="Enter Prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          fullWidth
        />
        <Button type="submit" variant="contained">Generate Graph</Button>
      </form>
      <div id="chart-container"></div> {/* Chart will render here */}
    </Container>
  );
};

export default GraphForm;