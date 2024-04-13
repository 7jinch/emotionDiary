/**
 * App.jsx
 */
import { useState, useRef, useReducer } from 'react';
import Header from './components/Header';
import Editor from './components/Editor';
import List from './components/List';
// import Exam from './components/Exam';
import './App.css';

// 임시 데이터 객체를 담은 배열
// 리렌더링될 때마다 다시 생성되지 않도록 App 컴포넌트 외부에 선언하기
const mockData = [
  {
    id: 0,
    isDone: false,
    content: `react 공부하기`,
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: `라면 사기`,
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: `운동하기`,
    date: new Date().getTime(),
  },
];

// 매개변수는 상태값과 액션 객체
function reducer(state, action) {
  switch (action.type) {
    case `CREATE`:
      return [action.data, ...state];
    case `UPDATE`:
      return state.map((item) =>
        // id값과 일치하는 요소를 찾아서 해당 요소의 체크박스 업데이트
        item.id === action.targetId ? { ...item, isDone: !item.isDone } : item
      );
    case `DELETE`:
      // id값과 일치하지 않는 요소만 찾아서 필터링(삭제하려는 id값을 찾아서 해당 요소 삭제)
      return state.filter((item) => item.id !== action.targetId);
    default:
      return state;
  }
}

function App() {
  // 상태값 생성
  // 임시 데이터 mockData로 초기화
  const [todos, dispatch] = useReducer(reducer, mockData);

  // id값을 기록하기 위한 레퍼런스 객체 생성
  // 겹치지 않게 그냥 3으로 초기화해줌
  const idRef = useRef(3);

  const onCreate = (content) => {
    // const newTodo = {
    //   // id: 0,
    //   // newTodo 객체가 생성될 때마다 idRef의 값이 증가
    //   id: idRef.current++,
    //   isDone: false,
    //   content: content,
    //   date: new Date().getTime(),
    // };

    // setTodos([newTodo, ...todos]);
    // useState 대신에 dispatch 함수 호출하고 액션 객체 전달

    // useState 대신 useReducer 사용
    dispatch({
      type: `CREATE`,
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  };

  const onUpdate = (targetId) => {
    // // todos 상태값들 중에 targetId 일치하는 id를 갖는 todo의 isDone을 변경
    // // 인수: todos 배열에서 targetId 일치하는 id를 갖는 요소의 데이터만 딱 바꾼 새로운 배열
    // setTodos(
    //   todos.map(
    //     (todo) =>
    //       todo.id === targetId
    //         ? { ...todo, isDone: !todo.isDone } // targetId를 찾았다면 isDone만 값을 바꿈
    //         : todo // 없으면 그냥 반환함
    //   )
    // );

    // useState 대신 useReducer 사용
    dispatch({
      type: `UPDATE`,
      targetId: targetId,
    });
  };

  const onDelete = (targetId) => {
    // // 인수: todos 배열에서 targetId와 일치하는 id를 갖는 요소만 삭제한 새로운 배열
    // setTodos(todos.filter((todo) => todo.id !== targetId));

    // useState 대신 useReducer 사용
    dispatch({
      type: `DELETE`,
      targetId: targetId,
    });
  };

  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      <List
        // props로 전달
        todos={todos}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    </div>
  );
}

export default App;
