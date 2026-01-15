// src/MyApp.jsx
import React, { useState, useEffect } from "react";
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

    useEffect(() => {
      fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json["users_list"]))
        .catch((error) => {
          console.log(error);
        });
    }, []);

    function updateList(person) {
      setCharacters([...characters, person]);
    }

    function fetchUsers() {
      const promise = fetch("http://localhost:8000/users");
      return promise;
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
