import React, { useState } from "react";

function ToyForm({ onAddToy }) {
  // Controlled inputs: the form's values live in state
  const [formData, setFormData] = useState({ name: "", image: "" });

  // Update whichever field changed (matches the input's name attribute)
  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  // POST: create the toy on the backend, then add it to state
  function handleSubmit(event) {
    event.preventDefault();

    const newToy = {
      name: formData.name,
      image: formData.image,
      likes: 0, // new toys always start with 0 likes
    };

    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newToy),
    })
      .then((res) => res.json())
      .then((createdToy) => {
        onAddToy(createdToy);
        setFormData({ name: "", image: "" }); // clear the form
      })
      .catch((err) => console.error("Failed to add toy:", err));
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={formData.image}
          onChange={handleChange}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;