import { React, useState, useEffect } from 'react';
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

const clientId = 7258951234215357;
const redirectUri = "https://localhost:3000/callback/instagram";

function App() {
  const handleLogin = () => {
    window.location.href = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`;
  };

  const [test, setTest] = useState()

  async function getTest() {
    // document에 대한 참조 생성
    const docRef = doc(db, "items", "1");
    // 참조에 대한 Snapshot 쿼리
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setTest(docSnap.data())
    }
  };
  // 최초 마운트 시에 getTest import
  useEffect(() => {
    getTest()
  }, [])

  return (
    <div className="App">
      <button onClick={handleLogin}>Instagram 로그인</button>
      {test !== undefined &&
        <div>{test.name}</div>}
    </div>
  );
}

export default App;
