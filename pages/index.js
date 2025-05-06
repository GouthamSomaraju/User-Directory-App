import { useState } from "react";
// import './index.css'

export default function Home({ intialState }) {
  const [data, setData] = useState(intialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDetails, setShowDetails] = useState({});
  const [page, setPage] = useState(1);
  const limit = 5;

  const loadMore = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users?_start=${page * limit}&_limit=${limit}`);
      const newUsers = await response.json();

      if (newUsers.length === 0) {
        setError("No more users to load.");
      } else {
        setData(prev => [...prev, ...newUsers]);
        setPage(prev => prev + 1);
      }
    } catch (err) {
      setError('Failed to load more users.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
      <h1>Users Directory App (SSG)</h1>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '15px',
        marginBottom: '20px'
      }}>
        {data.map(user => (
          <div key={user.id} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '15px',
            width: 'calc(33.333% - 20px)', // 3 cards per row
            boxSizing: 'border-box',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
            textAlign: 'center',
            alignItems:'center'
            
          }}>
            <p style={{textAlign: 'center'}}><strong>Name:</strong> {user.name}</p>
            <p style={{textAlign: 'center'}}><strong>Email:</strong> {user.email}</p>
            <p style={{textAlign: 'center'}}><strong>City:</strong> {user.address.city}</p>

            <button
              onClick={() =>
                setShowDetails(prev => ({
                  ...prev,
                  [user.id]: !prev[user.id]
                }))
              }
              style={{ marginTop: '10px', borderRadius: '8px',
                border: '1px solid transparent',
                padding: '0.6em 1.2em',
                fontSize: '1em',
                fontWeight: '500',
                fontFamily: 'inherit',
                color: 'aliceblue',
                backgroundColor: '#1a1a1a',
                cursor: 'pointer',
                transition: "border-color 0.25s" }}
            >
              {showDetails[user.id] ? 'Hide Details' : 'Show Details'}
            </button>

            {showDetails[user.id] && (
              <>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Website:</strong> {user.website}</p>
              </>
            )}
          </div>
        ))}
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={loadMore} disabled={loading} style={{ marginTop: '10px', borderRadius: '8px',
                border: '1px solid transparent',
                padding: '0.6em 1.2em',
                fontSize: '1em',
                fontWeight: '500',
                fontFamily: 'inherit',
                color: 'aliceblue',
                backgroundColor: '#1a1a1a',
                cursor: 'pointer',
                transition: "border-color 0.25s" }}>
        {loading ? "Loading..." : "Load More Users"}
      </button>
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users?_start=0&_limit=5');
  const users = await response.json();

  return {
    props: { intialState: users }
  };
}
