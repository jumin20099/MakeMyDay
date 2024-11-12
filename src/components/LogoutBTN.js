import { React } from 'react';
import { signOut, getAuth } from 'firebase/auth';

function GoogleLogoutButton() {
  const GoogleSignOut = () => {
    const auth = getAuth();
    localStorage.clear()
    return (
      signOut(auth).then(console.log('구글 로그아웃 완료'))
    );
  }

  return (
    <div className="GoogleLogout">
      <button onClick={GoogleSignOut}>Google 로그아웃</button>
    </div>
  );
}

export default GoogleLogoutButton;
