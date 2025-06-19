import icons from './icons';

export const formatNumber = (number) =>
  Number(number.toFixed(1)).toLocaleString();

export const startRating = (rating, maxRating = 5) => {
  const star = [];
  for (let i = 1; i <= maxRating; i++) {
    star.push(
      <span key={i} style={{ color: i <= rating ? 'gold' : 'gray' }}>
        {i <= rating ? '★' : '☆'}
      </span>
    );
  }
  return star;
};
