import React from 'react';
import UserList from '../components/UserList'


export default function Users({ users }) {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 style={{textAlign:'center'}}>User Directory App (SSR)</h1>
      <UserList users={users} />
    </div>
  );
}


export async function getServerSideProps() {
  let response = await fetch("https://jsonplaceholder.typicode.com/users");
  let users = await response.json();
  return {
    props: { users },
  };
}
