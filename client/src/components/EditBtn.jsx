import React, { useState } from "react";

const EditBtn = ({ todo }) => {
   const [isOpen, setIsOpen] = useState(false);

   const [description, setDescription] = useState(todo.description);
   // console.log(todo.description);

   //edit description function
   const updateDescription = async (e) => {
      e.preventDefault();
      try {
         const body = { description };
         const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
         });
         window.location = "/";

      } catch (err) {
         console.error(err.message);
      }
   };

   //reset close button for input
   const resetInput = () => {
      setDescription(todo.description);
      setIsOpen(false);
   };

   return (
      <>
         {/* Button trigger modal */}
         <button type="button" className="rounded-lg" onClick={() => setIsOpen(true)}>
            Edit me
         </button>

         {/* Modal */}
         {isOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto text-black" >
               <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                  <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                     <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                  </div>

                  {/* This element is to trick the browser into centering the modal contents. */}
                  <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                     &#8203;
                  </span>

                  <div
                     className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                     role="dialog"
                     aria-modal="true"
                     aria-labelledby="exampleModalLabel"
                  >
                     <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                           <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                              <h3 className="text-lg leading-6 font-medium text-gray-900" id="exampleModalLabel">
                                 Change Todo
                              </h3>
                              <div className="mt-2">
                                 <input
                                    type="text"
                                    className=" px-2 w-[447px] h-8 border-2 border-gray-300 focus:outline-blue-500"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                 />
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                           type="button"
                           className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                           onClick={(e) => updateDescription(e)}
                        >
                           Edit
                        </button>
                        <button
                           type="button"
                           className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                           onClick={() => resetInput()}
                        >
                           cancel
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </>
   );
};

export default EditBtn;
