// components/PantryForm.js
import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import styles from "../styles/HomePage.module.css"; // Adjust the import path if necessary

const PantryForm = ({ currentId, setCurrentId, items }) => {
  const [item, setItem] = useState({ name: "", quantity: "" });

  useEffect(() => {
    if (currentId) {
      const currentItem = items.find((item) => item.id === currentId);
      if (currentItem)
        setItem({ name: currentItem.name, quantity: currentItem.quantity });
    } else {
      setItem({ name: "", quantity: "" });
    }
  }, [currentId, items]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId) {
      await updateDoc(doc(db, "pantry", currentId), item);
    } else {
      await addDoc(collection(db, "pantry"), item);
    }
    setItem({ name: "", quantity: "" });
    setCurrentId(null);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.inputContainer}>
      <TextField
        label="Item Name"
        value={item.name}
        onChange={(e) => setItem({ ...item, name: e.target.value })}
        required
      />
      <TextField
        label="Quantity"
        type="number"
        value={item.quantity}
        onChange={(e) => setItem({ ...item, quantity: e.target.value })}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        {currentId ? "Update Item" : "Add Item"}
      </Button>
    </form>
  );
};

export default PantryForm;
