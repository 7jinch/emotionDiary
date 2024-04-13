/**
 * App.jsx
 */
import { useState } from 'react';
import Viewer from './components/Viewer';
import Controller from './components/Controller';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  // 상태값 변경에는 count, setCount 둘 다 필요하기 때문에
  // 이벤트 핸들러를 정의해서 하위 컴포넌트에 props로 전달하기
  const onClickButton = (value) => {
    setCount(count + value);
  };

  return (
    <div className="App">
      <h1>카운터 앱</h1>
      <section>
        <Viewer
          // props로 상태값을 전달
          count={count}
        />
      </section>
      <section>
        <Controller
          // props로 이벤트 핸들러를 전달할 수도 있음
          onClickButton={onClickButton}
        />
      </section>
    </div>
  );
}

export default App;
