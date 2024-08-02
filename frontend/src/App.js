import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      const res = await axios.post('http://localhost:3000/bfhl', parsedJson);
      setResponse(res.data);
      setError('');
    } catch (err) {
      setError('Invalid JSON format or API error');
    }
  };

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_alphabet', label: 'Highest Alphabet' }
  ];

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  return (
    <div className="App">
      <h1>YOUR_ROLL_NUMBER</h1>
      <div>
        <textarea
          rows="4"
          cols="50"
          value={jsonInput}
          onChange={handleInputChange}
          placeholder='Enter JSON e.g. { "data": ["A", "C", "z"] }'
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {error && <p className="error">{error}</p>}
      {response && (
        <div>
          <Select
            isMulti
            options={options}
            onChange={handleSelectChange}
          />
          {selectedOptions.map(option => (
            <div key={option.value}>
              {option.value === 'alphabets' && (
                <div>
                  <h3>Alphabets</h3>
                  <p>{response.alphabets.join(', ')}</p>
                </div>
              )}
              {option.value === 'numbers' && (
                <div>
                  <h3>Numbers</h3>
                  <p>{response.numbers.join(', ')}</p>
                </div>
              )}
              {option.value === 'highest_alphabet' && (
                <div>
                  <h3>Highest Alphabet</h3>
                  <p>{response.highest_alphabet}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
