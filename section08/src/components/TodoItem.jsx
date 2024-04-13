/**
 * components/TodoItem.jsx
 */
import './TodoItem.css';

const TodoItem = (props) => {
  // 구조분해할당으로 받음
  const { id, isDone, content, date, onUpdate, onDelete } = props;

  // 업데이트 해주는 이벤트 핸들러
  const onChangeCheckbox = () => {
    onUpdate(id);
  };

  // 삭제하는 이벤트 핸들러
  const onClickDeleteButton = () => {
    onDelete(id);
  };

  return (
    <div className="TodoItem">
      <input
        // onChange로 이벤트 핸들러 등록
        onChange={onChangeCheckbox}
        checked={isDone}
        type="checkbox"
      />
      <div className="content">{content}</div>
      <div className="date">{new Date(date).toLocaleDateString()}</div>
      <button onClick={onClickDeleteButton}>delete</button>
    </div>
  );
};

export default TodoItem;
