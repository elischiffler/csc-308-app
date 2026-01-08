// src/MyApp.jsx
import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";


function MyApp() {
    // state for displaying our characters in a table
    const [characters, setCharacters] = useState([]);

    // remove a character at a given index
    function removeOneCharacter(index) {
      const updated = characters.filter((character, i) => {
        return i !== index;
      });
      setCharacters(updated);
    }

    function updateList(person) {
      setCharacters([...characters, person]);
    }

    return (
      <div className="container">
        <Table
          characterData={characters}
          removeCharacter={removeOneCharacter}
        />
        <Form handleSubmit={updateList} />
      </div>
    );
}
export default MyApp;
