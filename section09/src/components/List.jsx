/**
 * components/List.jsx
 */
import { useState } from 'react';
import TodoItem from './TodoItem';
import './List.css';

// 구조분해할당으로 받음
const List = ({ todos, onUpdate, onDelete }) => {
  const [search, setSearch] = useState('');

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getFilteredData = () => {
    // 검색바에 입력된 값이 없다면
    if (search === '') return todos;

    // filter 메서드로 todos를 순회하면서
    // includes 메서드로 todo.content에 search 상태값이 포함되면 true를 반환하고
    // true인 것만 필터링함
    // return todos.filter((todo) => {
    //   todo.content.includes(search);
    // }); <- 이건 왜 안 되지???
    return todos.filter((todo) =>
      // 소문자로 변환해서 비교하면 대소문자 구분없이 검색할 수 있음
      todo.content.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filteredTodos = getFilteredData();

  return (
    <div className="List">
      <h4>Todo List 🌱</h4>
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
              // props로 넘겨줌
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default List;
