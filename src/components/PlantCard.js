import React, { useState } from "react";

function PlantCard({ id, name, image, price, onDelete }) {
  const [newPrice, setNewPrice] = useState(price);
  const [isInStock, setIsInStock] = useState(true);

  const handlePriceUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:6001/plants/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price: parseFloat(newPrice) }),
      });

      if (!response.ok) {
        throw new Error("Failed to update price");
      }

      alert("Price updated successfully!");
    } catch (error) {
      console.error("Error updating price:", error);
      alert("Failed to update price");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:6001/plants/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete plant");
      }

      // Call the parent's onDelete to update the UI
      onDelete(id);
    } catch (error) {
      console.error("Error deleting plant:", error);
      alert("Failed to delete plant");
    }
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {newPrice}</p>
      <div>
        <input
          type="number"
          step="0.01"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          placeholder="New price"
        />
        <button onClick={handlePriceUpdate}>Update Price</button>
      </div>
      {isInStock ? (
        <button className="primary" onClick={() => setIsInStock(false)}>
          In Stock
        </button>
      ) : (
        <button>Out of Stock</button>
      )}
      <button
        onClick={handleDelete}
        style={{ marginTop: "10px", backgroundColor: "#ff4444" }}
      >
        Delete Plant
      </button>
    </li>
  );
}

export default PlantCard;
