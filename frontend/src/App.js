
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css'; 

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  

  useEffect(() => {
    console.log("hey");
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const users = await axios.get('http://localhost:5000/users');     
      setUsers(users.data); 
      //setFilteredUsers(users.data);
      
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSearch = () => {
    const filtered = users.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredUsers(filtered);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input 
        type="text" 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
        onKeyPress={handleKeyPress} 
        placeholder="Enter user name"
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">Search</button>
      <div className="user-list">
        {filteredUsers.map(user => (
          <div key={user._id} className="user-card">
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Age: {user.age}</p>
            <p>City: {user.city}</p>
            <p>Country: {user.country}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

