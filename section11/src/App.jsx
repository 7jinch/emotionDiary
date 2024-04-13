/**
 * App.jsx
 */
import {
  useState,
  useRef,
  useReducer,
  useCallback,
  createContext, // context 생성 메서드 불러오기
  useMemo, // 객체를 다시는 생성하지 않도록 할 거임
} from 'react';
import Header from './components/Header';
import Editor from './components/Editor';
import List from './components/List';
import './App.css';

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

// context 객체 생성
// 보통 컴포넌트 외부에서 생성해줌
// export const TodoContext = createContext();

// context를 2개로 분리해줌
export const TodoStateContext = createContext(); // 변화할 값을 담을 context
export const TodoDisptchContext = createContext(); // 변화하지 않는 값을 담을 context

function App() {
  const [todos, dispatch] = useReducer(reducer, mockData);

  const idRef = useRef(3);

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

  // onCreate, onUpdate, onDelete는 App 컴포넌트의 마운트 이후에는 재생성되지 않음
  // 이렇게 하지 않으면 리렌더링이 될 때마다 함수(객체)가 계속 재생성됨
  const memoizedDisptch = useMemo(() => {
    return {
      onCreate,
      onUpdate,
      onDelete,
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <TodoStateContext.Provider value={todos}>
        <TodoDisptchContext.Provider
          // memoizaion된 함수를 value로 전달함
          value={memoizedDisptch}
        >
          <Editor />
          <List />
        </TodoDisptchContext.Provider>
      </TodoStateContext.Provider>
      {/* <TodoContext.Provider
        // 데이터를 전달받을 컴포넌트들을 context 객체의 Provider 컴포넌트로 감싸줌
        // value 속성값으로 데이터를 객체로 전달함
        value={{ todos, onCreate, onUpdate, onDelete }}
      >
        <Editor />
        <List />
      </TodoContext.Provider> */}
    </div>
  );
}

export default App;
