// pages/index.js
import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import PantryForm from "../components/PantryForm";
import SearchBar from "../components/SearchBar";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Home = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "pantry"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });
      setItems(items);
      setFilteredItems(items);
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = (query) => {
    setFilteredItems(
      items.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "pantry", id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div>
      <h1>Pantry Management</h1>
      <PantryForm
        currentId={currentId}
        setCurrentId={setCurrentId}
        items={items}
      />
      <SearchBar onSearch={handleSearch} />
      <List>
        {filteredItems.map((item) => (
          <ListItem key={item.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2">
                  Quantity: {item.quantity}
                </Typography>
                <IconButton
                  onClick={() => handleDelete(item.id)}
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
                <Button onClick={() => setCurrentId(item.id)}>Edit</Button>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Home;
