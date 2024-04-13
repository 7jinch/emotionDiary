/**
 * src/components/Viewer.jsx
 */
import './Viewer.css';
import { getEmotionImage } from '../util/get-emotion-image';
import { emotionList } from '../util/constants';

const Viewer = ({ emotionId, content }) => {
  // emotionList 중에서 현재 emotionId와 일치하는 요소를 찾아서 반환
  const emotionItem = emotionList.find(
    (item) => String(item.emotionId) === String(emotionId)
  );

  return (
    <div className="Viewer">
      <section className="img_section">
        <h4>오늘의 감정</h4>
        <div className={`emotion_img_wrapper emotion_img_wrapper_${emotionId}`}>
          <img src={getEmotionImage(emotionId)} />
          <div>{emotionItem.emotionName}</div>
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <div className="content_wrapper">
          <p>{content}</p>
        </div>
      </section>
    </div>
  );
};

export default Viewer;
