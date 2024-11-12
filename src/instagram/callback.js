import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function InstagramCallback() {
  // URL에서 바로 code의 초기값을 가져옴
  const initialCode = new URL(window.location.href).searchParams.get("code") || "";
  const [code, setCode] = useState(initialCode);
  const navigate = useNavigate();

  const fetchLogin = useCallback(async () => {
    if (!code) return; // code가 없으면 초기 실행을 방지

    try {
      const param = { code };

      const response = await (
        await fetch('https://localhost:3001/instagram/oauth', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(param),
        })
      ).json();

      console.log(response);

      // 서버 응답에서 토큰을 추출하여 로컬 스토리지에 저장
      if (response.access_token) {
        localStorage.clear();
        localStorage.setItem("access_token", response.access_token);
        localStorage.setItem("user_id", response.user_id);
        navigate("/main"); // 로그인 성공 시 메인 페이지로 이동
      } else {
        alert("로그인에 실패했습니다. 토큰을 받지 못했습니다.");
      }
    } catch (error) {
      alert("로그인 함수에서 오류가 발생했습니다!");
      console.error(error);
    }
  }, [code, navigate]);

  useEffect(() => {
    fetchLogin(); // 컴포넌트 마운트 시 로그인 시도
  }, [fetchLogin]);

  return <div className="App">잠시만 기다려 주세요...</div>;
}

export default InstagramCallback;