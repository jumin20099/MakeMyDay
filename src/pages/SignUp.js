import React, { useState } from 'react';
import { auth } from '../firebaseConfig';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    // 비밀번호와 비밀번호 확인이 일치하는지 검증
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return; // 비밀번호가 일치하지 않으면 함수 종료
    }
    
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      alert('회원가입이 완료되었습니다!');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
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
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="비밀번호 확인"
      />
      <button onClick={handleSignUp}>회원가입</button>
    </div>
  );
};

export default SignUp;
