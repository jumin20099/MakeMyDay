import { React } from 'react';

function ShareBTN() {

  const shareInfo = async () => {
    // Web Share API 지원 여부 확인
    if (navigator.share) {
      try {
        // 공유할 내용
        const shareData = {
          title: 'Make My Day',
          text: '당신의 케이크를 친구들에게 공유해보세요!',
          url: window.location.href,
        };

        // 공유 실행
        await navigator.share(shareData);
        // alert('공유 성공!');
      } catch (error) {
        // 사용자가 공유를 취소하거나 공유 과정에서 오류 발생
        console.error('공유 실패:', error);
      }
    } else {
      // Web Share API를 지원하지 않는 경우
      alert('이 브라우저에서는 Web Share API를 지원하지 않습니다.');
    }
  };

  return <button onClick={shareInfo}>공유하기</button>;
}

export default ShareBTN;
