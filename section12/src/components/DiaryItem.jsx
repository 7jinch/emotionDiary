/**
 * components/DiaryItem.jsx
 */
import { getEmotionImage } from '../util/get-emotion-image'; // 이미지 불러오는 함수 임포트
import { useNavigate } from 'react-router-dom'; // 함수를 이용해서 특정 이벤트가 발생했을 때 페이지를 이동시켜주는 navigate 함수를 반환하는 hook
import Button from './Button';
import './DiaryItem.css';

const DiaryItem = ({ id, emotionId, createdDate, content }) => {
  const nav = useNavigate(); // navigate 함수르 nav에 저장

  return (
    <div className="DiaryItem">
      <div
        // diary/${id} 경로로 이동시켜주는 이벤트 핸들러 등록
        onClick={() => {
          nav(`diary/${id}`);
        }}
        className={`img_section img_section_${emotionId}`}
      >
        <img src={getEmotionImage(emotionId)} />
      </div>
      <div
        // diary/${id} 경로로 이동시켜주는 이벤트 핸들러 등록
        onClick={() => {
          nav(`diary/${id}`);
        }}
        className="info_section"
      >
        <div className="created_date">
          {new Date(createdDate).toLocaleDateString()}
        </div>
        <div className="content">{content}</div>
      </div>
      <div className="button_sectin">
        <Button
          // edit/${id} 경로로 이동시켜주는 이벤트 핸들러 등록
          onClick={() => {
            nav(`edit/${id}`);
          }}
          text={'수정하기'}
        />
      </div>
    </div>
  );
};

export default DiaryItem;
