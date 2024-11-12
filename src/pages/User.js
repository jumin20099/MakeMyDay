import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import ShareBTN from '../components/ShareBTN';

function User() {
    const [user, setUser] = useState(null);
    const { docId } = useParams(); // URL에서 docId를 추출합니다.
    const navigate = useNavigate();
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const userId = currentUser ? currentUser.uid : null;

    const [message, setMessage] = useState('');
    const [isOwner, setIsOwner] = useState(false);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            const docRef = doc(db, "users", docId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUser({ id: docSnap.id, ...docSnap.data() }); // 사용자 정보를 설정합니다.
                setMessages(docSnap.data().messages || []); // 메시지 배열을 설정합니다.
                // 사용자가 로그인되어 있고, 문서의 creatorId와 현재 사용자의 id가 일치하는지 확인합니다.
                if (auth.currentUser && docSnap.data().creatorId === auth.currentUser.uid) {
                    setIsOwner(true);
                } else {
                    setIsOwner(false);
                }
            } else {
                console.log("No such document!");
            }
        };

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user); // 현재 로그인한 사용자를 설정합니다.
                fetchUser(user)
            } else {
                // 사용자가 로그아웃한 경우, 사용자 상태를 null로 설정합니다.
                setUser(null);
            }
        });

        fetchUser();
        return () => unsubscribe();
    }, [docId, auth]); // docId가 변경될 때마다 fetchUser 함수를 다시 실행합니다.


    const deleteUser = async () => {
        if (!currentUser) {
            console.log("사용자가 로그인되어 있지 않습니다.");
            return;
        }

        const docRef = doc(db, "users", docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const creatorId = docSnap.data().creatorId;
            if (userId === creatorId) {
                await deleteDoc(docRef);
                console.log('삭제되었습니다.');
                navigate('/');
            } else {
                alert("본인이 만든 케이크만 삭제할 수 있습니다.")
            }
        } else {
            console.log("해당 문서가 존재하지 않습니다.");
        }
    };

    const handleAddMessage = async () => {
        if (message.trim()) {
            const updatedMessages = [...messages, message];
            await updateDoc(doc(db, "users", docId), { messages: updatedMessages });
            setMessages(updatedMessages);
            setMessage('');
        }
    };

    return (
        <div>
            {user ? (
                <>
                    <h2>사용자 정보</h2>
                    <p>닉네임: {user.nickname}</p>
                    <p>생년월일: {user.birthday}</p>
                    <p>선택한 케이크: {user.cake_type}</p>
                    {isOwner && (
                        <>
                            <h3>메시지 목록</h3>
                            <ol>
                                {messages.map((msg, index) => (
                                    <li key={index}>{msg}</li>
                                ))}
                            </ol>
                            <button onClick={deleteUser}>삭제</button>
                            <ShareBTN />
                        </>
                    )}
                    {!isOwner && (
                        <>
                            <input type='text' value={message} onChange={(e) => setMessage(e.target.value)} placeholder='생일을 축하해주세요!'></input>
                            <button onClick={handleAddMessage}>쓰기</button>
                        </>
                    )}

                </>
            ) : (
                <>
                    <p>사용자 정보를 불러오는데 실패하였습니다</p>
                    <a href="/">메인으로 가기</a>
                </>
            )}
        </div>
    );
}

export default User;
