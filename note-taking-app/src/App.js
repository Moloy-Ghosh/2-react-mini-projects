import {useState} from "react";
import './App.css';

function App() {
   const [note,setNote]=useState('');
   const [notes,setNotes]=useState([
      {id:1, title: "Note 1"},
      {id:2, title: "Note 2"}
   ]);

   const changeNoteHandler=(e)=>{
      setNote(e.target.value);
   }

   const submitHandler=(e)=>{
      e.preventDefault();
      if(note.trim()===""){
         return alert(`Please provide a valid note`);
      }
      const newNote={
         id:Date.now()+"",
         title:note,
      }
      setNotes([newNote,...notes]);
      setNote("");
   }

   const deleteHandler=(id)=>{
      const updatedNotes=notes.filter((note)=>note.id!==id);
      setNotes(updatedNotes);
   }

  return (
    <div className="App">
      <form onSubmit={submitHandler}>
         <input
         type="text"
         value={note}
         onChange={changeNoteHandler}
         />
         <button type="submit">Add Note</button>
      </form>
      <h2>All Notes</h2>
      <div>
         {notes.map((singleNote)=>(
            <>
            <li key={singleNote.id}>
               {singleNote.title}
               <button>Update</button>
               <button onClick={()=> deleteHandler(singleNote.id)}>Delete</button>
            </li>
            </>
            ))}
      </div>
    </div>
  );
}

export default App;
