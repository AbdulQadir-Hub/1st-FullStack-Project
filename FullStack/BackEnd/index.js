const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const FoodModel = require("./models/Food");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/fooddata", {
  useNewUrlParser: true,
});

app.post("/insert", async (req, res) => {
  const foodName = req.body.foodName;
  const days = req.body.days;

  const food = new FoodModel({
    foodName: foodName,
    days: days,
  });

  try {
    await food.save();
    res.send("Data inserted");
  } catch (err) {
    console.log(err);
  }
});

app.get("/read", async (req, res) => {
  FoodModel.find().then((data) => {
    res.send(data);
  });
});

app.get("/", (req, res) => {
  res.send("Welcome to the Food API");
});
app.put("/update", async (req, res) => {
  const newFoodName = req.body.newFoodName;
  const id = req.body.id;

  try {
    const updatedFood = await FoodModel.findById(id);

    if (!updatedFood) {
      return res.status(404).send("Food not found");
    }

    updatedFood.foodName = newFoodName;
    await updatedFood.save();
    res.send("update");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(8001, () => {
  console.log("server is running on 8001");
});
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedFood = await FoodModel.findOneAndDelete({ _id: id }).exec();

    if (!deletedFood) {
      return res.status(404).send("Food not found");
    }

    res.send("deleted");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});
