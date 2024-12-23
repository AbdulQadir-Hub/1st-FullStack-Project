import React, { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
const App = () => {
  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState(0);
  const [foodList, setFoodList] = useState([]);
  const [newFoodName, setnewFoodName] = useState("");
  useEffect(() => {
    Axios.get("http://localhost:8001/read").then((response) => {
      setFoodList(response.data);
    });
  }, []);
  const addToList = () => {
    Axios.post("http://localhost:8001/insert", {
      foodName: foodName,
      days: days,
    });
  };
  const updateFood = (id) => {
    Axios.put("http://localhost:8001/update", {
      id: id,
      newFoodName: newFoodName,
    });
  };
  const deleteFood = (id) => {
    Axios.delete(`http://localhost:8001/delete/${id}`);
  };
  return (
    <>
      <div className="App">
        <h1> BASIC MERN-CRUD PROJECT </h1>
        <h1> FOOD </h1>
        <input
          className="input-field"
          type="text"
          placeholder="Enter Food Name"
          onChange={(event) => {
            setFoodName(event.target.value);
          }}
          required
        ></input>
        <br></br>
        <br></br>
        <input
          className="input-field"
          type="text"
          placeholder="Number of days You can store it"
          onChange={(event) => {
            setDays(event.target.value);
          }}
          required
        ></input>
        <br></br>
        <br></br>
        <button className="submit-button" onClick={addToList}>
          Submit
        </button>
        {foodList.map((val, key) => {
          return (
            <div className="food">
              <h1>FoodName: {val.foodName}</h1>
              <h1>Days: {val.days}</h1>
              <input
                className="input-field"
                type="text"
                placeholder="Edit here"
                required
                onChange={(event) => {
                  setnewFoodName(event.target.value);
                }}
              />
              <br />
              <br />
              <br></br>
              <button
                className="edit-button"
                onClick={() => updateFood(val._id)}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => deleteFood(val._id)}
              >
                Delete
              </button>
              <br></br>
              <br />
              <br />
              <hr />
            </div>
          );
        })}
      </div>
    </>
  );
};
export default App;
