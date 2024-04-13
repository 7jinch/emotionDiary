/**
 * components/Header.jsx
 */
// 리액트 내장 메서드인 memo 불러오기(useMemo 아님)
import { memo } from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="Header">
      <h3>오늘은 📆</h3>
      <h1>{new Date().toDateString()}</h1>
    </div>
  );
};

// memo 함수에 최적화할 컴포넌트를 인수로 줌
// -> Header 컴포넌트는 props가 변경되지 않았을 때는 리렌더링되지 않음
const memoizedHeader = memo(Header);

// export default Header;
export default memoizedHeader; // 최적화된 컴포넌트를 내보내기 -> 이제 리렌더링이 발생하지 않음

// 추가적인 작업(최적화 등)을 한 컴포넌트를 고차 컴포넌트라고 부름
// Higher Order Component(HOC)
