import React, { useEffect, useState } from 'react';

const PlaceholderPage = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/v1/placeholders')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setMessage(data.message))
      .catch(error => console.error('Fetch error:', error));
  }, []);

  return (
    <div>
      <h1>仮のページ</h1>
      <p>{message}</p>
    </div>
  );
};

export default PlaceholderPage;
