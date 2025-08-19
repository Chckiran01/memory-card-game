function Card({ image, title, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img src={image} alt={title} />
      <p>{title}</p>
    </div>
  );
}
export default Card;
