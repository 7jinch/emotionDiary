// 1. hook은 함수 컴포넌트, 커스텀 훅 내부에서만 호출 가능
// 2. hook은 조건문, 반복문 내부에서는 호출될 수 없음
// 3. 커스텀 훅을 만들 수도 있음

import { useState } from 'react';

// 커스텀 훅 정의
// 접두사로 use를 붙이면 됨
function useInput() {
  const [input, setInput] = useState(``);

  const onChange = (e) => {
    setInput(e.target.value);
  };

  return [input, onChange];
}

const HookExam = () => {
  // 커스텀 훅 생성
  const [input, onChange] = useInput();

  return (
    <>
      <input
        value={input}
        // 커스텀 훅 등록
        onChange={onChange}
      />
      <p>{input}</p>
    </>
  );
};

export default HookExam;
