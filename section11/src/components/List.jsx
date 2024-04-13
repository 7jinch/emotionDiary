/**
 * components/List.jsx
 */
import {
  useState,
  useMemo,
  useContext, // context에서 데이터를 꺼낼 때는 useContext
} from 'react';
// import { todo } from '../App'; // createContext로 생성해준 context를 불러오기
import { TodoStateContext } from '../App'; // createContext로 생성해준 context를 불러오기

import TodoItem from './TodoItem';
import './List.css';

// const List = ({ todos, onUpdate, onDelete }) => {
const List = () => {
  // const { todos } = useContext(TodoContext);
  const todos = useContext(TodoStateContext);

  const [search, setSearch] = useState('');

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getFilteredData = () => {
    if (search === '') return todos;

    return todos.filter((todo) =>
      todo.content.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filteredTodos = getFilteredData();

  // 첫번째 인수는 콜백함수, 두번째 인수는 의존성 배열(useEffect의 deps 맞음)
  // useEffect처럼 의존성 배열에 따라서 콜백함수를 실행함
  // 추가로 콜백함수가 반환하는 값을 useMemo가 그대로 반환해줌
  // 구조분해할당으로 반환값을 받아줌
  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    // memoization할 연산을 넣어주면 됨
    // 여기서는 위 getAnalyzedData 함수가 수행하는 코드를 넣어줌
    const totalCount = todos.length;
    const doneCount = todos.filter((todo) => todo.isDone).length;
    const notDoneCount = totalCount - doneCount;

    return { totalCount, doneCount, notDoneCount };
  }, [todos]); // todos가 변경될 때마다 useMemo 실행
  // getAnalyzedData 함수처럼 { totalCount, doneCount, notDoneCount }를 그대로 반환함

  return (
    <div className="List">
      <h4>Todo List 🌱</h4>
      <div>total:{totalCount}</div>
      <div>done:{doneCount}</div>
      <div>notDone:{notDoneCount}</div>

      <input
        value={search}
        onChange={onChangeSearch}
        placeholder="검색어를 입력하세요"
      />
      <div className="todos_wrapper">
        {filteredTodos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              {...todo}
              // onUpdate={onUpdate}
              // onDelete={onDelete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default List;
