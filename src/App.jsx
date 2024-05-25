import React, { useState, useEffect } from 'react'; 
import './App.css';

function App() {
  const [inventory, setInventory] = useState(() => {
    const savedInventory = localStorage.getItem('inventory');
    return savedInventory ? JSON.parse(savedInventory) : [];
  });

  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(inventory));
  }, [inventory]);

  function handleAddItem() {
    const itemInput = document.getElementById('itemInput').value;
    if (itemInput.trim() !== '') { 
      setInventory([...inventory, itemInput]);
      document.getElementById('itemInput').value = '';
    }
  }

  function handleRemoveItem(index) { 
    const itemToRemove = inventory[index];
    if (window.confirm(`Are you sure you want to delete "${itemToRemove}"?`)) {
      setInventory(inventory.filter((item, i) => i !== index)); 
    }
  }

  return (
    <div className="app-container">
      <h1>Inventory Management System</h1>
      <div className="input-container">
        <input type="text" id="itemInput" placeholder="Type item name" /> 
        <button onClick={handleAddItem}>Add Item</button>
      </div>
      <ul>
        {inventory.map((item, index) => (
          <li key={index} className="item"> 
            {item} 
            <button className="delete-button" onClick={() => handleRemoveItem(index)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
