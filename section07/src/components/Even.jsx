/**
 * components/Even.jsx
 */
import { useEffect } from 'react';

const Even = () => {
  // 3. 언마운트
  // useEffect는 빈 배열일 경우 처음 마운트될 때만 콜백함수가 실행되고
  // 언마운트될 때 종료됨 -> 반환문을 실행함
  useEffect(() => {
    // 클린업, 정리함수
    return () => {
      console.log(`언마운트`);
    };
  }, []);

  return <div>짝수입니다</div>;
};

export default Even;
