/**
 * components/Editor.jsx
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import EmotionItem from './EmotionItem';
import './Editor.css';
import { emotionList } from '../util/constants';
import { getStringedDate } from '../util/get-stringed-date'; // 날짜를 "yyyy-mm-dd"의 문자열 형태로 변환하는 함수

// 모듈로 분리
// // 날짜를 "yyyy-mm-dd"의 문자열 형태로 변환하는 함수
// const getStringedDate = (targetDate) => {
//   let year = targetDate.getFullYear();
//   let month = targetDate.getMonth() + 1;
//   let date = targetDate.getDate();

//   if (month < 10) month = `0${month}`;
//   if (date < 10) date = `0${date}`;

//   return `${year}-${month}-${date}`;
// };

// onSubmit 함수
// Editor 컴포넌트는 "새로운 일기 생성", "기존 일기 수정" 페이지에서 사용되고 있기 때문에
// Editor 컴포넌트가 사용되고 있는 페이지별로 작성완료 버튼의 이벤트의 동작을 다르게 동작시켜야 함
// 따라서 Editor 컴포넌트는 App.jsx로부터 바로 onCreate 함수를 공급받으면 안 되고
// 페이지(상위 컴포넌트)가 context로 onCreate 함수를 받아서 해당 페이지로부터 작성완료 버튼의 이벤트의 동작을 담당할 함수를 따로 받아야 함

// initData 객체
// Edit 페이지(상위 컴포넌트)로부터 받은 일기의 초기값
const Editor = ({ onSubmit, initData }) => {
  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 3,
    content: '',
  });

  const nav = useNavigate();

  useEffect(() => {
    // initData에 데이터가 존재한다면
    if (initData)
      setInput({
        ...initData,
        // App.jsx에서 createdDate는 타임스탬프 형태로 저장하고 있지만
        // Editor 컴포넌트에서 createdDate는 사용자로부터 날짜를 직접 입력받기 위해서 date 객체 형태로 저장받고 있음
        // 그래서 여기서도 date 객체로 변환해서 상태값을 생성해야 함
        createdDate: new Date(Number(initData.createdDate)),
      });
  }, [initData]);

  const onChangeInput = (e) => {
    // console.log(e.target.name); // 어떤 요소에 입력이 들어온건지
    // console.log(e.target.value); // 입력된 값이 무엇인지

    let name = e.target.name; // 현재 이벤트가 발생한 요소의 name 저장
    let value = e.target.value; // 현재 이벤트가 발생한 요소의 value 저장

    if (name === 'createdDate') value = new Date(value); // 문자열로 들어온 값을 Date 값으로 변환

    setInput({
      ...input,
      [name]: value,
    });
  };

  // 작성완료 버튼을 클릭하면
  const onClickSubmitButton = () => {
    // 부모 컴포넌트로부터 props로 받은 onSubmit 함수 실행
    onSubmit(input);
  };

  return (
    <div className="Editor">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        <input
          name="createdDate"
          // input 태그의 초기값을 설정
          value={getStringedDate(input.createdDate)}
          onChange={onChangeInput}
          type="date"
        />
      </section>
      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map((item) => {
            return (
              <EmotionItem
                // 컴포넌트를 클릭하면 이벤트가 발생하도록 직접 이벤트를 등록
                onClick={() =>
                  onChangeInput({
                    // 컴포넌트이기 때문에 이벤트 객체가 자동으로 전달되지 않아서 직접 전달해줘야 함
                    target: {
                      name: 'emotionId',
                      value: item.emotionId,
                    },
                  })
                }
                key={item.emotionId}
                {...item}
                isSelected={item.emotionId === input.emotionId}
              />
            );
          })}
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea
          name="content"
          value={input.content}
          onChange={onChangeInput}
          placeholder="오늘 어땠나요?"
        />
      </section>
      <section className="button_section">
        <Button
          onClick={() => {
            nav(-1); // 뒤로가기
          }}
          text={'취소하기'}
        />
        <Button
          onClick={onClickSubmitButton}
          text={'작성완료'}
          type={'POSITIVE'}
        />
      </section>
    </div>
  );
};

export default Editor;
