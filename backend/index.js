const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Define routes
app.get('/', (req, res) => {
  res.send('Hello, world');
  console.log(req.baseUrl);
});

const tasksSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String
});

// Create the model and specify the existing collection name
const Task = mongoose.model('Task', tasksSchema, 'tasks');
// Start the server

const mongoURI = 'mongodb://127.0.0.1:27017/taskManager'; // MongoDB connection URI

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB successfully!');
    const newTask = new Task({
      title: 'Task 1',
      description: 'Adding task from Express Mongoose',
      status: 'Open'
    });
    try { 
      const taskSaved = newTask.save();
      console.log("Task added successfully: ", taskSaved);
    }
    catch(err){
      console.log("Error adding task");
    }
    const port = 3000; // Specify the desired port number
    app.listen(port, () => {
      console.log("Server is running on port" ,port);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });