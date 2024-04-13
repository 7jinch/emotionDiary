import { useState } from 'react';

// 컴포넌트를 분리하기
const Counter = () => {
  // 상태값 생성을 받음
  // 인수로 초기값을 줄 수 있음
  // 반환값은 2개의 요소를 담은 배열
  // 첫번째는 초기값, 두번째는 상태변화 함수
  const [count, setCount] = useState(0); // 배열 구조분해할당으로 받기

  return (
    <div>
      <h1>{count}</h1>
      <button
        onClick={() => {
          // +1로 상태값 변화함 -> 리렌더링함
          setCount(count + 1);
        }}
      >
        +
      </button>
    </div>
  );
};

export default Counter;
