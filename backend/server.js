const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Vote = require("./voteModel");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/voting-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Initial Data Route
app.get("/votes", async (req, res) => {
  const existingVotes = await Vote.find();
  if(existingVotes.length === 0){
    await Vote.insertMany([
        { monument: "Eiffel Tower", votes: 0 },
        { monument: "Colosseum", votes: 0 },
        { monument: "Brandenburg Gate", votes: 0 },
    ]);
  }
  const votes = await Vote.find();
  res.json(votes);
});

// Vote Route
app.post("/vote", async (req, res) => {
  const { monument } = req.body;
  const vote = await Vote.findOne({ monument });

  if (vote) {
    vote.votes += 1;
    await vote.save();
  } else {
    await Vote.create({ monument, votes: 1 });
  }

  res.json({ message: "Vote counted!" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
