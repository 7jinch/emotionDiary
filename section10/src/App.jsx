/**
 * App.jsx
 */
import { useState, useRef, useReducer, useCallback } from 'react';
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

  // const onDelete = (targetId) => {
  //   // useState 대신 useReducer 사용
  //   dispatch({
  //     type: `DELETE`,
  //     targetId: targetId,
  //   });
  // };

  // 첫번째 인수는 최적화할 함수(불필요하게 재생성되지 않을 함수)
  // 두번쨰 인수는 의존성 배열
  // 빈 배열 -> 마운트될 때만 함수를 실행됨
  // const func = useCallback(() => {}, []);

  const onCreate = useCallback((content) => {
    dispatch({
      type: `CREATE`,
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  }, []);

  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: `UPDATE`,
      targetId: targetId,
    });
  }, []);

  const onDelete = useCallback((targetId) => {
    dispatch({
      type: `DELETE`,
      targetId: targetId,
    });
  }, []);
  // 이제 onCreate, onUpdate, onDelete 함수는 마운트가 됐을 때만 실행됨

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
