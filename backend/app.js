const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

// ROUTES logic

// create a todo

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const createTodo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description]
    );
    res.json(createTodo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getATodo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(getATodo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});
// update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateATodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json("Todo was updated successfully...");
  } catch (error) {
    console.log(error.message);
  }
});

// delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteATodo = await pool.query(
      "DELETE FROM todo WHERE todo_id = $1",
      [id]
    );
    res.json("Todo was deleted successfully...");
  } catch (error) {
    console.log(error.message);
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
