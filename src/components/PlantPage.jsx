import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");
  const [outOfStock, setOutOfStock] = useState(new Set());

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((plants) => setPlants(plants));
  }, []);

  const handleAddPlant = (newPlant) => {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((response) => response.json())
      .then((plant) => setPlants([...plants, plant]));
  };

  const handleToggleStock = (plantId) => {
    const newOutOfStock = new Set(outOfStock);
    if (newOutOfStock.has(plantId)) {
      newOutOfStock.delete(plantId);
    } else {
      newOutOfStock.add(plantId);
    }
    setOutOfStock(newOutOfStock);
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search search={search} onSearchChange={setSearch} />
      <PlantList
        plants={filteredPlants}
        outOfStock={outOfStock}
        onToggleStock={handleToggleStock}
      />
    </main>
  );
}

export default PlantPage;
