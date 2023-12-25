// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// MongoDB connection setup
mongoose.connect('mongodb://saidb:qPumSr1TVidrgKvhLuXORIj7NhSNZGI9KEZEd7Egfn7OrnrXpBfKXRYrhjHJWvQhj1AgD5BbfLVMACDbbE9uLA==@saidb.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@saidb@', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});

// Define a schema for Notepad data
const notepadSchema = new mongoose.Schema({
    content: String,
});

const Notepad = mongoose.model('Notepad', notepadSchema);

// Define a schema for Task data
const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    dueDate: Date,
    completed: { type: Boolean, default: false },
});

const Task = mongoose.model('Task', taskSchema);

// API endpoint to save  notepad data
app.post('/api/notepad', async (req, res) => {
    try {
        const { content } = req.body;
        const notepadEntry = new Notepad({ content });
        await notepadEntry.save();
        res.status(201).json({ message: 'Notepad data saved successfully!' });
    } catch (error) {
        console.error('Error saving notepad data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API endpoint to retrieve notepad data
app.get('/api/notepad', async (req, res) => {
    try {
        const notepadEntries = await Notepad.find();
        res.status(200).json(notepadEntries);
    } catch (error) {
        console.error('Error retrieving notepad data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API endpoint to save task data
app.post('/api/tasks', async (req, res) => {
    try {
        const { title, description, dueDate } = req.body;
        const taskEntry = new Task({ title, description, dueDate });
        await taskEntry.save();
        res.status(201).json({ message: 'Task saved successfully!' });
    } catch (error) {
        console.error('Error saving task data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API endpoint to retrieve all tasks
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error retrieving tasks:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API endpoint to retrieve completed tasks in the current week
app.get('/api/tasks/completedThisWeek', async (req, res) => {
    try {
        const startOfWeek = new Date();
        startOfWeek.setHours(0, 0, 0, 0);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

        const completedTasks = await Task.find({
            completed: true,
            dueDate: { $gte: startOfWeek },
        });

        res.status(200).json(completedTasks);
    } catch (error) {
        console.error('Error retrieving completed tasks this week:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.delete('/api/tasks/:taskId/complete', async (req, res) => {
    try {
        const { taskId } = req.params;
        console.log('Task ID serverrr :', taskId);
        // const updatedTask = await Task.findByIdAndUpdate(taskId, { completed: true }, { new: true });
        const deletedEntry = await Task.findByIdAndDelete(taskId);

        if (!deletedEntry) {
            return res.status(404).json({ error: 'Notepad entry not found' });
        }
        // if (!updatedTask) {
        //     return res.status(404).json({ error: 'Task not found' });
        // }

        res.status(200).json({ message: 'Task marked as complete', task: updatedTask });
    } catch (error) {
        console.error('Error completing task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/api/notepad/:entryId', async (req, res) => {
    try {
        const entryId = req.params.entryId;
        const deletedEntry = await Notepad.findByIdAndDelete(entryId);

        if (!deletedEntry) {
            return res.status(404).json({ error: 'Notepad entry not found' });
        }

        res.status(200).json({ message: 'Notepad entry deleted successfully' });
    } catch (error) {
        console.error('Error deleting notepad entry:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.delete('/api/notepad', async (req, res) => {
    try {
        await Notepad.deleteMany({}); // Delete all notepad entries
        res.status(200).json({ message: 'All notepad entries deleted successfully' });
    } catch (error) {
        console.error('Error deleting all notepad entries:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

