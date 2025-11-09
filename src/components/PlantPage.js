import React, { useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [plants, setPlants] = useState([]);

  const handleAddPlant = (newPlant) => {
    setPlants((prevPlants) => [...prevPlants, newPlant]);
  };

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PlantList
        searchTerm={searchTerm}
        plants={plants}
        setPlants={setPlants}
      />
    </main>
  );
}

export default PlantPage;
