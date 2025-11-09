import React, { useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <main>
      <NewPlantForm />
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PlantList searchTerm={searchTerm} />
    </main>
  );
}

export default PlantPage;
