/**
 * components/TodoItem.jsx
 */
import { memo } from 'react';
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

// 이렇게 한 번에 바로 내보낼 수도 있음
// 두번째 인수로 콜백함수를 전달해서 커스텀할 수도 있음
// 콜백함수의 인자로 과거의 props, 현재의 props를 넣어서 그 둘을 비교함
// export default memo(TodoItem, (prevProps, nextProps) => {
//   // 반환값(true, false)에 따라서 props가 바뀌었는지 안 바뀌었는지 판단함
//   // true -> 안 바뀜 -> 리렌더링 x
//   // false -> 바뀜 -> 리렌더링 o
//   if (prevProps.id !== nextProps.id) return false;
//   if (prevProps.isDone !== nextProps.isDone) return false;
//   if (prevProps.content !== nextProps.content) return false;
//   if (prevProps.date !== nextProps.date) return false;

//   // memo 메서드는 얕은 비교로 판단하기 때문에 onUpdate, onDelete와 같은 함수(객체)는 정확한 비교를 못 함
//   // 그래서 이렇게 해 줘야 함

//   return true;
// });

// App 컴포넌트에서 useCallback로 최적화를 했기 때문에 이제 memo만 적용해도 됨
export default memo(TodoItem);
