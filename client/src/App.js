import React from 'react';

const clientId = '7258951234215357';
const redirectUri = 'https://localhost:3000/callback/instagram';

function App() {
  const handleLogin = () => {
    window.location.href = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`;
  };
  
  return (
    <div className="App">
      <button onClick={handleLogin}>Instagram 로그인</button>
    </div>
  );
}

export default App;
