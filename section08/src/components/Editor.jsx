/**
 * components/Editor.jsx
 */
import { useState, useRef } from 'react';
import './Editor.css';

const Editor = ({ onCreate }) => {
  const [content, setContent] = useState('');
  const contentRef = useRef();

  // input 태그에 입력한 상태값 저장하는 이벤트 핸들러
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  // 엔터키를 눌러도 추가되는 이벤트 핸들러
  const onKeyDown = (e) => {
    // 누른 키가 엔터키라면
    if (e.keyCod === 13) {
      onsubmit(); // submit 함수 실행
    }
  };

  // 상위 컴포넌트에서 받은 함수를 실행해주는 이벤트 핸들러
  const onsubmit = () => {
    // 아무것도 입력하지 않았다면
    if (content === '') {
      contentRef.current.focus(); // 해당 input 태그에 focus를 줌
      return; // onCreate 함수를 실행하지 않음
    }
    onCreate(content); // todos 상태값 업데이트함
    setContent(''); // 그리고 input 태그를 비우기
  };

  return (
    <div className="Editor">
      <input
        ref={contentRef}
        value={content}
        // input 태그에 입력한 상태값 저장
        onChange={onChangeContent}
        onKeyDown={onKeyDown}
        placeholder="새로운 todo를 추가하세요!"
      />
      <button
        // 상위 컴포넌트에서 받은 함수를 실행해주는 이벤트 핸들러 실행
        onClick={onsubmit}
      >
        추가하기
      </button>
    </div>
  );
};

export default Editor;
