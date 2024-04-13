/**
 * src/components/Button.jsx
 */
import './Button.css';

const Button = ({ text, type, onClick }) => {
  return (
    <button
      onClick={onClick}
      // type props 값에 따라서 Button 태그가 달라짐
      className={`Button Button_${type}`}
    >
      {text}
    </button>
  );
};

export default Button;
