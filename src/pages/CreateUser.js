import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from '../firebaseConfig';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/CreateUser.css"
import tiramisu from "../images/tiramisu.jpg"
import vanilla from "../images/vanilla.jpg"
import choco from "../images/choco.jpg"
import mango from "../images/mango.png"
import strawberry from "../images/strawberry.jpg"
import kiwi from "../images/kiwi.jpg"
import blueberry from "../images/blueberry.jpg"
import cheese from "../images/cheese.jpg"
import matcha from "../images/matcha.jpg"

function Create() {
    const cakes = [
        { type: "티라미수", image: tiramisu },
        { type: "바닐라", image: vanilla },
        { type: "초콜릿", image: choco },
        { type: "망고", image: mango },
        { type: "딸기", image: strawberry },
        { type: "키위", image: kiwi },
        { type: "블루베리", image: blueberry },
        { type: "치즈", image: cheese },
        { type: "말차", image: matcha },
    ];

    const [nickname, setNickname] = useState("");
    const [birthday, setBirthday] = useState("");
    const [selectedCake, setSelectedCake] = useState(cakes[0].type);
    const navigate = useNavigate();
    const currentDate = new Date();
    const auth = getAuth(); // Firebase Auth 인스턴스를 가져옵니다.
    const [user, setUser] = useState(null); // 현재 로그인한 사용자 상태를 관리합니다.

    useEffect(() => {
        // 사용자 로그인 상태 감지
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                // Firestore에서 사용자 문서 확인
                const userRef = doc(db, "users", currentUser.uid);
                getDoc(userRef).then((docSnap) => {
                    if (docSnap.exists()) {
                        alert('이미 케이크가 생성 되었습니다.');
                        navigate(`/cakes/${docSnap.data().nickname}/${docSnap.id}`);
                    }
                });
            }
        });

        return () => unsubscribe(); // 구독 해제
    }, [auth, navigate]);

    const isValidBirthday = (birthday) => {
        return /^\d{8}$/.test(birthday); // YYYYMMDD 형식 확인
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidBirthday(birthday)) {
            alert("생년월일은 YYYYMMDD 형식으로 입력해주세요.");
            return;
        }

        try {
            // Firestore에 사용자 정보 및 케이크 타입 저장, 문서 ID로 사용자 UID 사용
            await setDoc(doc(db, "users", user.uid), {
                nickname: nickname,
                birthday: birthday,
                cake_type: selectedCake,
                creatorId: user.uid,
                date: currentDate.toISOString().slice(0, 19).replace('T', ' '),
            });
            localStorage.setItem("userNickname", nickname)
            navigate(`/cakes/${nickname}/` + user.uid);
        } catch (error) {
            console.error("문서 추가 오류: ", error);
        }
    };

    return (
        <div id="Create">
            <form onSubmit={handleSubmit}>
                <h3>Make My Day | MMD</h3>
                <Carousel data-bs-theme="dark" style={{ width: '300px' }} interval={null} onSelect={(selectedIndex, e) => setSelectedCake(cakes[selectedIndex].type)}>
                    {cakes.map((cake, index) => (
                        <Carousel.Item key={index}>
                            <img
                                className="d-block w-100"
                                style={{ width: '300px', height: '300px' }}
                                src={cake.image}
                                alt={cake.type}
                            />
                            <Carousel.Caption>
                                <h3>{cake.type}</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
                <input
                    placeholder="닉네임을 입력해주세요"
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                />
                <br />
                <input
                    maxLength='8'
                    placeholder="20070123"
                    type="text"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                />
                <br />
                <br />
                <button type="submit">다음</button>
            </form>
        </div>
    );
}

export default Create;
