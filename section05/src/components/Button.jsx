/**
 * src/components/Button.jsx
 */
// 상위 컴포넌트로부터 전달받은 props는 객체 형태임
// 객체 구조분해할당도 가능함
const Button = ({ text, color, children }) => {
  // 이벤트 핸들러 정의
  const onClickHandler = (event) => {
    console.log(event);
    console.log(text);
  };

  return (
    <button
      // 이벤트 핸들러 등록
      onClick={onClickHandler}
      // onMouseEnter={onClickHandler}
      style={{ color: color }}
    >
      {text} - {color.toUpperCase()}
      {children}
    </button>
  );
};

// props의 기본값도 지정해 줄 수 있음
Button.defaultProps = {
  color: 'black',
};

export default Button;
