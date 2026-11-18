import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const API_URL = "http://localhost:3001/toys";

function App() {
  const [showForm, setShowForm] = useState(false);
  // All toys from the backend live here so every component stays in sync
  const [toys, setToys] = useState([]);

  // GET: fetch all toys once, when the app first loads
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((toysData) => setToys(toysData))
      .catch((err) => console.error("Failed to fetch toys:", err));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // POST result: add the newly created toy to the end of the list
  function handleAddToy(newToy) {
    setToys((toys) => [...toys, newToy]);
  }

  // DELETE result: remove the donated toy from state
  function handleDeleteToy(deletedId) {
    setToys((toys) => toys.filter((toy) => toy.id !== deletedId));
  }

  // PATCH result: swap the updated toy in, keeping the original order
  function handleUpdateToy(updatedToy) {
    setToys((toys) =>
      toys.map((toy) => (toy.id === updatedToy.id ? updatedToy : toy))
    );
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        onDeleteToy={handleDeleteToy}
        onUpdateToy={handleUpdateToy}
      />
    </>
  );
}

export default App;