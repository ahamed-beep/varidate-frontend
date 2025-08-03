import React, { useState } from 'react';
import axios from 'axios';
import TextareaAutosize from 'react-textarea-autosize';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const PromptForm = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');
    setError('');

    try {
      const res = await axios.post('http://localhost:3000/api/generate', {
        prompt,
      });
      setResponse(res.data.reply);
    } catch (err) {
      console.error(err);
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: 'auto',
        padding: '20px',
        backgroundColor: '#1e1e1e',
        color: '#fff',
        fontFamily: 'monospace',
        borderRadius: '10px',
        boxShadow: '0 0 15px rgba(0,0,0,0.6)',
      }}
    >
      <form onSubmit={handleSubmit}>
        <label style={{ fontSize: '1.1rem', marginBottom: '5px' }}>
          Enter your prompt:
        </label>
        <TextareaAutosize
          minRows={6}
          maxRows={20}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{
            width: '100%',
            marginBottom: '15px',
            backgroundColor: '#2d2d2d',
            color: '#fff',
            padding: '10px',
            border: '1px solid #555',
            borderRadius: '6px',
            resize: 'none',
            fontSize: '1rem',
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: loading ? '#444' : '#007acc',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
          }}
        >
          {loading ? 'Sending...' : 'Submit'}
        </button>
      </form>

      {error && (
        <p style={{ color: 'red', marginTop: '15px' }}>❌ {error}</p>
      )}

      {response && (
        <div style={{ marginTop: '30px' }}>
          <h3 style={{ marginBottom: '10px', color: '#00d8ff' }}>
            ✅ Response:
          </h3>
          <SyntaxHighlighter
            language="javascript"
            style={vscDarkPlus}
            wrapLongLines={true}
            customStyle={{
              padding: '15px',
              borderRadius: '10px',
              backgroundColor: '#1e1e1e',
            }}
          >
            {response}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
};

export default PromptForm;
