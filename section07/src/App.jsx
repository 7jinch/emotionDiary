/**
 * App.jsx
 */
import { useState, useEffect, useRef } from 'react';
import Viewer from './components/Viewer';
import Controller from './components/Controller';
import Even from './components/Even';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState(``);

  // 값이 바뀌어도 리렌더링되지 않는 useRef 활용해서
  // 마운트가 되었는지 확인할 플래그 생성
  const isMount = useRef(false);

  // 1. 마운트: 탄생
  // 배열의 값이 변경되어야 콜백함수가 실행되는데 빈 배열임
  // -> 빈 배열일 경우 처음 마운트될 때만 콜백함수가 실행됨
  useEffect(() => {
    console.log(`마운트`);
  }, []);

  // 2. 업데이트: 변화, 리렌더링
  // 콜백함수는 마운트시에도 실행되고 리렌더링될 때마다 실행됨
  useEffect(() => {
    // 만약 아직 마운트가 되지 않았다면
    if (!isMount.current) {
      isMount.current = true; // 마운트 상태라고 변경
      return; // 바로 리턴
    }
    // 이렇게 하면 아래 코드는 마운트가 된 직후에는 실행되지 않음
    // 리렌더링될 때에만 실행
    console.log(`업데이트`);
  });

  // 3. 언마운트: 죽음
  // Even 컴포넌트 참고

  const onClickButton = (value) => {
    setCount(count + value);
  };

  return (
    <div className="App">
      <h1>카운터 앱</h1>
      <section>
        <input
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <p>{input}</p>
      </section>
      <section>
        <Viewer count={count} />
        {count % 2 === 0 ? <Even /> : null}
      </section>
      <section>
        <Controller onClickButton={onClickButton} />
      </section>
    </div>
  );
}

export default App;
