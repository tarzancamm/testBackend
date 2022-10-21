// Imports express and cors
const express = require("express");
const cors = require("cors");

// Saves express to usable variable
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connects to backend functionality (controller)
const { getCompliment, getFortune, getAllMotivators, createMotivator, updateMotivator, deleteMotivator } = require('./controller')

// Endpoints
app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune)

app.get('/api/motivator', getAllMotivators)
app.post('/api/motivator', createMotivator)
app.put('/api/motivator/:id', updateMotivator)
app.delete('/api/motivator/:id', deleteMotivator)

// Endless listening loop
app.listen(4000, () => console.log("Server running on 4000"));
