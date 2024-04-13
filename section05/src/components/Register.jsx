import { useState, useRef } from 'react';

const Register = () => {
  const [input, setInput] = useState({
    name: ``,
    birth: ``,
    country: ``,
    bio: ``,
  });

  // ref 객체 생성
  const countRef = useRef(0);
  const inputRef = useRef();

  const onChange = (e) => {
    countRef.current++;
    console.log(countRef.current); // 값이 변경되어도 리렌더링을 유발시키지는 않음

    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    // input 상태값의 name 프로퍼티의 값이 빈 문자열이면
    if (input.name === '') {
      // 이름을 입력하는 input 태그 DOM 요소를 포커스됨
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        onChange={onChange}
        name="name"
        placeholder={'이름'}
      />
      <p>{input.name}</p>
      <input onChange={onChange} name="birth" type="date" />
      <p>{input.birth}</p>
      <div>
        <select onChange={onChange} name="country">
          <option value="kr">한국</option>
          <option value="us">미국</option>
          <option value="uk">영국</option>
        </select>
        <p>{input.country}</p>
      </div>
      <div>
        <textarea onChange={onChange} name="bio" />
        <p>{input.bio}</p>
      </div>

      <button onClick={onSubmit}>제출</button>
    </div>
  );
};

export default Register;
