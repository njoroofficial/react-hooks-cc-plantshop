import React, { useEffect, useState } from "react";
import PlantCard from "./PlantCard";

function PlantList() {
  // state to store the fetched plants
  const [plants, setPlants] = useState([]);
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

        // Handle bad responses (e.g., 404, 500)
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

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

  // Conditional rendering based on fetch status
  if (isLoading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ul className="cards">
      {/* render PlantCards components in here */}
      {plants.map((plant) => (
        <PlantCard key={plant.id} {...plant} />
      ))}
    </ul>
  );
}

export default PlantList;
