import React, { useState } from "react";

function PlantCard({ name, image, price }) {
  const [inStock, setIsStock] = useState(true);

  function handleClick() {
    setIsStock((prevState) => !prevState);
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>

      <button className="primary" onClick={handleClick}>
        {inStock ? "In Stock" : "Out of Stock"}
      </button>
    </li>
  );
}

export default PlantCard;
