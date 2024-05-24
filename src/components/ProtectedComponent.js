import React, { useEffect, useState } from 'react';
import AuthService from '../services/AuthService';
import axios from 'axios';

const ProtectedComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      axios
        .get('http://localhost:8080/api/protected', {
          headers: { Authorization: 'Bearer ' + user.token }
        })
        .then(response => setData(response.data))
        .catch(error => console.log('Error fetching protected data', error));
    }
  }, []);

  return (
    <div>
      {data ? <div>Protected Data: {data}</div> : <div>Please log in to view this data.</div>}
    </div>
  );
};

export default ProtectedComponent;
