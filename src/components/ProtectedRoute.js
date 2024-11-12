import React, { useEffect, useState } from "react";
import LoadingScreen from './LoadingScreen'
import { auth } from '../firebaseConfig';
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

    useEffect(() => {
        // Firebase 인증 상태 감지
        const unsubscribe = auth.onAuthStateChanged(currentUser => {
            setUser(currentUser);
            setIsLoading(false); // 로딩 상태 업데이트
        });

        // 컴포넌트 언마운트 시 구독 해제를 위한 클린업 함수
        return () => unsubscribe();
    }, []);

    // 로딩 중 표시
    if (isLoading) {
        return <LoadingScreen/>;
    }

    // 인증되지 않은 사용자 리다이렉트
    if (!user) {
        return <Navigate to="/signin" />;
    }

    // 인증된 사용자에게 컨텐츠 표시
    return <div>{children}</div>;
}

export default ProtectedRoute;
