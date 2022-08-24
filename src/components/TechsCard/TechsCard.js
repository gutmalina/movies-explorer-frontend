function TechsCard({
  ...card
}) {
  return (
    <>
      <div className="techs__item">
        <p className="techs__grid_subtitle subtitle">
          {card.name}
        </p>
      </div>
    </>
  );
}

export default TechsCard
