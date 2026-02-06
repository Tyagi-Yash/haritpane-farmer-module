function StarRating({ rating = 0 }) {
  const percentage = (rating / 5) * 100;

  return (
    <div className="star-rating-wrapper">
      <div className="star-rating-back">★★★★★</div>
      <div className="star-rating-front" style={{ width: `${percentage}%` }}>
        ★★★★★
      </div>
    </div>
  );
}

export default StarRating;
