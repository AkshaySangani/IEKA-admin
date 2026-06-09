import { useTypingEffect } from "../../../hooks/useTypingEffect";

const LeftPanel = () => {
  const text = useTypingEffect();

  return (
    <div className="login-left">
      <div className="dots">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="bannercontent">
        <div className="titleupper">Welcome to Mysuit</div>

        <div className="welcometitle">
          <span className="titleword">Built for</span>

          <span className="typing-wrapper">
            <span className="typing-text">{text}</span>
            <span className="cursor">|</span>
          </span>
        </div>

        <div className="desc">
          Streamline your workforce, expense, communications and company assets
          with the power of modern technology at all in one place.
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;