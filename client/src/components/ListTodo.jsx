import React, { useEffect, useState } from "react";
import EditBtn from "./EditBtn";

const ListTodo = () => {
   const [todos, setTodos] = useState([]);

   const deleteTodo = async (id) => {
      try {
         const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
            method: "DELETE",
         });
         setTodos(todos.filter((todo) => todo.todo_id !== id));
      } catch (err) {
         console.error(err.message);
      }
   };

   const getTodos = async () => {
      try {
         const response = await fetch("http://localhost:5000/todos");
         const data = await response.json();
         setTodos(data);
      } catch (err) {
         console.error(err.message);
      }
   };
   useEffect(() => {
      getTodos();
   }, []);
   return (
      <>
         <table className="min-w-[60%] bg-card  border border-border mt-4">
            <thead className="">
               <tr>
                  <th className="px-4 py-2 border-b border-border text-left">Todo</th>
                  <th className="px-4 py-2 border-b border-border text-left">Edit</th>
                  <th className="px-4 py-2 border-b border-border text-left">Delete</th>
               </tr>
            </thead>
            <tbody>
               {todos.map((todo) => (
                  <tr key={todo.todo_id}>
                     <td className="px-4 py-2 border-b border-border">{todo.description}</td>
                     <td className="px-4 py-2 border-b border-border">
                        <span className="px-3 py-1 bg-blue-600 rounded text-white font-semibold">
                           <EditBtn todo={todo} />
                        </span>
                     </td>
                     <td className="px-4 py-2 border-b border-border">
                        <button
                           className="px-3 py-1 bg-red-600 rounded text-white font-semibold"
                           onClick={() => deleteTodo(todo.todo_id)}
                        >
                           Delete
                        </button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </>
   );
};

export default ListTodo;
