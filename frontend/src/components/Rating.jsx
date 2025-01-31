import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ value, text }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    let starComponent;

    if (value >= i) {
      starComponent = <FaStar />;
    } else if (value >= i - 0.5) {
      starComponent = <FaStarHalfAlt />;
    } else {
      starComponent = <FaRegStar />;
    }

    stars.push(<span key={i}>{starComponent}</span>);
  }

  return (
    <div className="rating">
      {stars}
      <span className="rating-text">{text && text}</span>
    </div>
  );
};



export default Rating;
