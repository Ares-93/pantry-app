// components/PantryForm.js
import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { db } from "../firebaseConfig";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

const PantryForm = ({ currentId, setCurrentId, items }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    if (currentId) {
      const item = items.find((item) => item.id === currentId);
      if (item) {
        setName(item.name);
        setQuantity(item.quantity);
      }
    }
  }, [currentId, items]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentId) {
        await updateDoc(doc(db, "pantry", currentId), { name, quantity });
        setCurrentId(null);
      } else {
        await addDoc(collection(db, "pantry"), { name, quantity });
      }
      setName("");
      setQuantity("");
    } catch (error) {
      console.error("Error adding/updating document: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        {currentId ? "Update Item" : "Add Item"}
      </Button>
    </form>
  );
};

export default PantryForm;
