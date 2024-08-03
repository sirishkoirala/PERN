import React, { useState } from "react";

const InputTodo = () => {
   const [description, setDescription] = useState("");
   const onSubmitForm =async(e)=>{
      e.preventDefault();
      try {
         const body = {description};
         const response = await fetch('http://localhost:5000/todos', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
            });
            const data = await response.json();
            console.log(data);
            window.location = "/";
      } catch (err) {
         console.error(err.message);
      }

   }
   return (
      <div className="w-[55.35%]">
         <h1 className="text-3xl mt-12 flex flex-1 font-bold">Input Todo</h1>
         <form className="mt-8 flex " onSubmit={onSubmitForm}>
            <input
               type="text"
               className=" border px-4 py-2"
               placeholder="Enter a todo..."
               value={description}
               onChange={(e) => setDescription(e.target.value)}
            />
            <button className="px-4 py-2 bg-green-600 text-white font-semibold ">Add</button>
         </form>
      </div>
   );
};

export default InputTodo;
