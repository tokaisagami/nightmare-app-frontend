import React, { useEffect, useState } from 'react';

const PlaceholderPage = () => {
  const [message, setMessage] = useState('');
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/api/v1/placeholders`) 
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setMessage(data.message))
      .catch(error => console.error('Fetch error:', error));
  }, [API_URL]);

  return (
    <div>
      <h1>仮のページ</h1>
      <p>{message}</p>
    </div>
  );
};

export default PlaceholderPage;
