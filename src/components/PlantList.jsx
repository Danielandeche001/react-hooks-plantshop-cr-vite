import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, outOfStock, onToggleStock }) {
  return (
    <ul className="cards">
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          plant={plant}
          isOutOfStock={outOfStock.has(plant.id)}
          onToggleStock={onToggleStock}
        />
      ))}
    </ul>
  );
}

export default PlantList;
