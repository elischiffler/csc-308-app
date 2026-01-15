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
      postUser(person)
        .then((createdUser) => {
          setCharacters((prev) => [...prev, createdUser]);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function fetchUsers() {
      const promise = fetch("http://localhost:8000/users");
      return promise;
    }

    function postUser(person) {
      return fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      }).then((response) => {
        if (response.status !== 201) {
          return response.text().then((text) => {
            throw new Error(text || `Failed to add user`);
          });
        }
        return response.json();
      });
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
