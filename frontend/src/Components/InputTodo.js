import React, { Fragment, useState } from 'react'

const InputTodo = () => {
  // description = state
  // setDescription = is use to change state
  // useState("") = here it is use to show that the default value is an empty string
  const [description, setDescription] = useState("");

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
       const content = { description };
       const response = await fetch('http://localhost:5000/todos', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(content)
       });
       // refresh and show the changess
       window.location = '/';
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <Fragment>
      <h1 className="text-center mt-5"> Pern Todo List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
         <input 
           type="text" 
           className="form-control" 
           value={description}
           onChange={e => setDescription(e.target.value)}
           />
         <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  )
};

export default InputTodo;