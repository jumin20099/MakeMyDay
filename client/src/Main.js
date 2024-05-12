import {React,useState, useEffect} from 'react';

function Main() {
    const [data, setData] = useState([]); // 데이터를 저장할 상태

    useEffect(() => {
        // 데이터를 로드하는 함수
        const fetchData = async () => {
            try {
                const response = await fetch('https://localhost:3001/view'); // 백엔드 URL
                if (!response.ok) {
                    throw new Error('데이터를 불러오는데 실패했습니다.');
                }
                const data = await response.json();
                setData(data); // 상태 업데이트
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []); // 컴포넌트가 마운트될 때 한 번만 실행
    return (
        <div className="App">
            <h1>데이터 보기</h1>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{item.title}: {item.content}: {item.date}</li> // 키와 타이틀, 컨텐츠 표시
                ))}
            </ul>
        </div>
    )

}

export default Main;