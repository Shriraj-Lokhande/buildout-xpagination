// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  
  useEffect(() => {
    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => {
        console.error('Error fetching data:', error);
        alert('Failed to fetch data');
      });
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  
  const handleNextPage = () => {
    if (currentPage === totalPages) {
      setCurrentPage(1); 
    } else {
      setCurrentPage(currentPage + 1); 
    }
  };

  
  const handlePreviousPage = () => {
    if (currentPage === 1) {
      setCurrentPage(totalPages); 
    } else {
      setCurrentPage(currentPage - 1); 
    }
  };

  
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  return (
    <div className="container">
      <h1>Employee Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {getPaginatedData().map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-controls">
        <button
          onClick={handlePreviousPage}
          disabled={data.length === 0}
          data-testid="prev-button"
        >
          Previous
        </button>
        <span data-testid="page-indicator">Page {currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={data.length === 0}
          data-testid="next-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
