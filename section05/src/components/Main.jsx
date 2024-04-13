/**
 * src/components/Main.jsx
 */
import './Main.css';

// Main 컴포넌트
function Main() {
  const user = {
    name: `king`,
    birth: 1995,
    isLogin: true,
  };

  if (user.isLogin) {
    return <div className="logout">로그아웃</div>;
  } else {
    return <div>로그인</div>;
  }
  // return <>{user.isLogin ? <div>로그아웃</div> : <div>로그인</div>}</>;
}

export default Main;
/**
 * jsx 주의사항
 *
 * 1. 중괄호 내부에는 자바스크립트 표현식만 넣을 수 있고 조건문이나 반복문은 사용할 수 없음
 * 2. 숫자, 문자열, 배열 값만 화면에 렌더링되고
 *    불리언, undefined, null 값 등은 화면에 렌더링되지 않음(오류를 발생시키지는 않음)
 * 3. 객체는 객체 자체를 렌더링 하려고 하면 오류가 발생하고 객체의 프로퍼티를 렌더링하는 것은 가능함
 * 4. 모든 태그는 닫혀있어야 함
 * 5. 최상위 태그는 반드시 하나여야만 함
 */
