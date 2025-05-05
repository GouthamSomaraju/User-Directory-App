import React from 'react';
import UserCard from './UserCard';

const UserList = ({ users }) => {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '15px',
      marginBottom: '20px'
    }}>
  {users.map(user => (
    <UserCard key={user.id} user={user} />
  ))}
</div>

  );
};

export default UserList;
