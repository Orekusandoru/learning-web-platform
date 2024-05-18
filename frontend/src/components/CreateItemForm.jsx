// components/CreateItemForm.tsx
import axios from "axios";
import { useState } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CreateItemForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async () => {
    if (!name || !description) {
        setErrorMessage('Please fill in all required fields');
        return;
      }
  
    try {
      await axios.post(`${BACKEND_URL}/api/create/`, 
      { name,
        description
      });
      alert("Item created successfully");
      setName("");
      setDescription("");

      console.error("Sent");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <button type="submit">Create</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </>
  );
};

export default CreateItemForm;
