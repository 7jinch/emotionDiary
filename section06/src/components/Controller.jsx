/**
 * components/Controller.jsx
 */
const Controller = ({ onClickButton }) => {
  return (
    <div>
      <button
        // 상위 컴포넌트로부터 받은 이벤트 핸들러를 클릭 이벤트에 등록
        onClick={() => {
          onClickButton(-100);
        }}
      >
        -100
      </button>
      <button
        onClick={() => {
          onClickButton(-10);
        }}
      >
        -10
      </button>
      <button
        onClick={() => {
          onClickButton(-1);
        }}
      >
        -1
      </button>
      <button
        onClick={() => {
          onClickButton(1);
        }}
      >
        +1
      </button>
      <button
        onClick={() => {
          onClickButton(10);
        }}
      >
        +10
      </button>
      <button
        onClick={() => {
          onClickButton(100);
        }}
      >
        +100
      </button>
    </div>
  );
};

export default Controller;
