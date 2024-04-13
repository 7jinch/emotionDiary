/**
 * components/Exam.jsx
 */
// useReducer 훅 가져오기
import { useReducer } from 'react';

// 상태를 실제로 변화시키는 변환기 역할을 해 주는 함수
// useReducer의 dispatch 함수가 호출되면 useReducer의 인수로 전달된 reducer 함수가 호출되고
// 이때 매개변수로는 상태값과 dispatch의 인수로 전달된 액션 객체를 받음
function reducer(state, action) {
  // reducer 함수에서 새로운 상태값을 반환해주면 useReducer가 불러와서 상태값을 변경시켜줌
  // if (action.type === `INCREASE`) return state + action.data;
  // else if (action.type === `DECREASE`) return state + action.data;

  // type이 많아지면 switch문을 사용하기도 함
  switch (action.type) {
    case `INCREASE`:
      return state + action.data;
    case `DECREASE`:
      return state + action.data;
    default:
      return state;
  }
}

const Exam = () => {
  // useState처럼 배열을 반환함(상태값과 상태변화를 요청하는 함수)
  // 그래서 dispatch를 호출하면(상태변화를 요청하면)
  // useReducer가 상태변화를 실제로 처리할 함수(여기서는 인수로 준 reducer 함수)를 호출함
  // 그런데 그건 위처럼 직접 구현해야 함
  // 초기값은 0으로 줌
  const [state, dispatch] = useReducer(reducer, 0); // useReducer 훅 호출하기

  // 클릭 이벤트 핸들러
  const onClickPlus = () => {
    // 클릭시 dispatch 함수 호출해서 상태변화를 요청함
    // 인수로는 상태값이 어떻게 번화되기를 원하는지 정보를 전달해줘야함(보통 객체를 전달함)
    // 이 객체를 액션 객체라고 부름
    dispatch({
      type: 'INCREASE',
      data: 1,
    });
    // dispatch 함수 호출하면서 액션 객체를 인수로 전달하면
    // useReducer가 요청을 처리할 상태를 변화시킬 reducer 함수를 호출하면서 인수로 전달함
  };

  const onClickMinus = () => {
    dispatch({
      type: `DECREASE`,
      data: -1,
    });
  };

  return (
    <div>
      <h1>{state}</h1>
      <button onClick={onClickPlus}>+</button>
      <button onClick={onClickMinus}>-</button>
    </div>
  );
};

export default Exam;
