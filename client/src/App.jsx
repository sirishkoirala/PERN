import React from "react";
import InputTodo from "./components/InputTodo";
import ListTodo from "./components/ListTodo";

const App = () => {
   return (
      <>
         <div className="mx-10">
            <InputTodo />
            <ListTodo />
         </div>
      </>
   );
};

export default App;
