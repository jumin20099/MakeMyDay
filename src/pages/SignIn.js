import { React, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import SignInBTN from '../components/SignInBTN';
import LoadingScreen from '../components/LoadingScreen'
function SignIn() {

    // firebase에서 유저 검증, 로그인 상태 확인 하는 동안 로딩 화면 표시
    const [isLoading, setLoading] = useState(true);
    const init = async () => {
        setLoading(false);
    }
    useEffect(() => { init() }, []);

    // 구글 소셜 로그인
    const [user, setUser] = useState(null);
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (currentUser) => {
            if(currentUser){
                localStorage.setItem("username", currentUser.displayName)
                setUser(currentUser);
            } else{
                console.log('구글 소셜 로그인 에러 발생')
            }
        });
    }, []);

    // 구글 정보 보여주기
    let content;
    if (user) {
        alert("이미 로그인 되었습니다")
        window.location.href='/';
    } else {
        content = <SignInBTN />;
    }

    return (
        <div className="SignInContainer">
            {isLoading ? <LoadingScreen /> : content}
        </div>
    );
}

export default SignIn;

