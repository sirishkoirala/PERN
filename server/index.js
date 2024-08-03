const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");


//middleware
app.use(cors());
app.use(express.json());

//Routes

//create a todo
app.post("/todos", async (req, res) => {
   try {
      const { description } = req.body;
      const newTodo = await pool.query(
         "INSERT INTO todo (description) VALUES($1) RETURNING * ",
         [description]
      );
      // console.log(req.body)
      res.json(newTodo);

   }
   catch (err) {
      console.error(err.message);
   }

})

// get all todo 
app.get("/todos", async (req, res) => {
   try {
      const allTodos = await pool.query("SELECT * FROM todo");
      res.json(allTodos.rows);
   } catch (error) {
      console.error(error.message);
   }
})

//get a todo
app.get("/todos/:id", async (req, res) => {
   try {
      const { id } = req.params;
      const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);

      res.json(todo.rows[0])
   } catch (error) {
      console.error(error.message);
   }
})


//update todo

app.put("/todos/:id", async (req, res) => {
   try {
      const { id } = req.params;
      const { description } = req.body;
      const updateTodo = await pool.query(
         "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING * ",
         [description, id]
      );
      res.json(updateTodo.rows[0]);
   } catch (error) {
      console.error(error.message);
   }
})

//delete todo
app.delete("/todos/:id", async (req, res) => {
   try {
      const { id } = req.params;
      const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1",
         [id]
      );
      if (deleteTodo.rowCount === 0) {
         return res.status(404).json({ message: "Todo not found" });
      }
      res.json({ message: 'Todo was deleted!' });
   } catch (err) {
      console.error(err.message);
   }
});


app.listen(5000, () => {
   console.log("Server is running on port 5000");
})