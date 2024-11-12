import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Navigate } from "react-router-dom";
import googleIcon from "../images/google.png"

const GoogleSignInButton = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
      try {
        await auth.signInWithEmailAndPassword(email, password);
        alert('로그인에 성공했습니다!');
      } catch (error) {
        console.error(error.message);
      }
    };

  const signInWithGoogle = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      // Google 로그인 성공 후 처리
      console.log(result.user);
    }).catch((error) => {
      // 로그인 실패 처리
      console.error(error);
    });
  };

  return (
    <div id='GoogleSignInBTN'>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
      />
      <button onClick={handleSignIn}>로그인</button>
      <button onClick={signInWithGoogle}><img src={googleIcon} alt="구글 소셜 로그인" width="100px" /></button>
      <a href="signup">회원가입</a>
    </div>
  );
};

export default GoogleSignInButton;
