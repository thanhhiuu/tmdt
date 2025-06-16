import icons from './icons';
const { MdOutlineStar, MdOutlineStarBorder } = icons;
export const formatNumber = (number) =>
  Number(number.toFixed(1)).toLocaleString();

export const startRating = (rating) => {
  const star = [];
  for (let i = 1; i <= rating; i++) {
    star.push(
      <span key={i} style={{ color: i <= rating ? 'gold' : 'gray' }}>
        {i <= rating ? '★' : '☆'}
      </span>
    );
  }
  console.log(star);
  return star;
};
