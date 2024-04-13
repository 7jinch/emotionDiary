/**
 * components/Editor.jsx
 */
import {
  useState,
  useRef,
  useContext, // context에서 데이터를 꺼낼 때는 useContext
} from 'react';
// import { todo } from '../App'; // createContext로 생성해준 context를 불러오기
import { TodoDisptchContext } from '../App'; // createContext로 생성해준 context를 불러오기
import './Editor.css';

// props로 데이터를 꺼내오지 않아도 됨
// const Editor = ({ onCreate }) => {
const Editor = () => {
  // context로부터 구조분해할당으로 onCreate만 데이터를 공급받음
  // const { onCreate } = useContext(TodoContext);
  const { onCreate } = useContext(TodoDisptchContext);

  const [content, setContent] = useState('');
  const contentRef = useRef();

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onsubmit();
    }
  };

  const onsubmit = () => {
    if (content === '') {
      contentRef.current.focus();
      return;
    }
    onCreate(content);
    setContent('');
  };

  return (
    <div className="Editor">
      <input
        ref={contentRef}
        value={content}
        onChange={onChangeContent}
        onKeyDown={onKeyDown}
        placeholder="새로운 todo를 추가하세요!"
      />
      <button onClick={onsubmit}>추가하기</button>
    </div>
  );
};

export default Editor;
