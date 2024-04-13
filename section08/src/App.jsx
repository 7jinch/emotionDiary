/**
 * App.jsx
 */
import { useState, useRef } from 'react';
import Header from './components/Header';
import Editor from './components/Editor';
import List from './components/List';
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

function App() {
  // 상태값 생성
  // 임시 데이터 mockData로 초기화
  const [todos, setTodos] = useState(mockData);

  // id값을 기록하기 위한 레퍼런스 객체 생성
  // 겹치기 않게 그냥 3으로 초기화해줌
  const idRef = useRef(3);

  const onCreate = (content) => {
    const newTodo = {
      // id: 0,
      // newTodo 객체가 생성될 때마다 idRef의 값이 증가
      id: idRef.current++,
      isDone: false,
      content: content,
      date: new Date().getTime(),
    };

    setTodos([newTodo, ...todos]);
  };

  const onUpdate = (targetId) => {
    // todos 상태값들 중에 targetId 일치하는 id를 갖는 todo의 isDone을 변경

    // 인수: todos 배열에서 targetId 일치하는 id를 갖는 요소의 데이터만 딱 바꾼 새로운 배열
    setTodos(
      todos.map(
        (todo) =>
          todo.id === targetId
            ? { ...todo, isDone: !todo.isDone } // targetId를 찾았다면 isDone만 값을 바꿈
            : todo // 없으면 그냥 반환함
      )
    );
  };

  const onDelete = (targetId) => {
    // 인수: todos 배열에서 targetId와 일치하는 id를 갖는 요소만 삭제한 새로운 배열
    setTodos(todos.filter((todo) => todo.id !== targetId));
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
