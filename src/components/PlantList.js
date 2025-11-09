import React, { useEffect, useState } from "react";
import PlantCard from "./PlantCard";

function PlantList({ searchTerm, plants, setPlants }) {
  // State to track loading status
  const [isLoading, setIsLoading] = useState(true);
  // State to handle any potential errors
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        // Set loading to true while fetching
        setIsLoading(true);
        // Reset any previous errors
        setError(null);

        const response = await fetch("http://localhost:6001/plants");
        const data = await response.json();
        setPlants(data);
      } catch (err) {
        setError(err);
      } finally {
        // set loading to false after the request completes
        setIsLoading(false);
      }
    };

    fetchPlants();
  }, []); // This array ensures this effect runs only once, on mount.

  // Handle plant deletion
  const handleDeletePlant = (id) => {
    setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== id));
  };

  // Filter plants based on search term
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Conditional rendering based on fetch status
  if (isLoading) {
    return <div>Loading plants...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ul className="cards">
      {/* render PlantCards components in here */}
      {filteredPlants.map((plant) => (
        <PlantCard key={plant.id} {...plant} onDelete={handleDeletePlant} />
      ))}
    </ul>
  );
}

export default PlantList;
