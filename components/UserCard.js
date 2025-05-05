import React, { useState } from 'react';
import '../pages/index.css'

const UserCard = ({ user }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div  style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      width: 'calc(33.333% - 20px)', // 3 cards per row
      boxSizing: 'border-box',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
      textAlign: 'center',
      
      alignItems:'center'}}>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>City:</strong> {user.address.city}</p>
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>

      {showDetails && (
        <div className="mt-3 text-sm space-y-1">
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Website:</strong> {user.website}</p>
        </div>
      )}
    </div>
  );
};

export default UserCard;
