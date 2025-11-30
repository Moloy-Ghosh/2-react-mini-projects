import {useState} from "react";
import './App.css';

function App() {
   const [note,setNote]=useState('');
   const [notes,setNotes]=useState([
      {id:1, title: "Note 1"},
      {id:2, title: "Note 2"}
   ]);
   const [edit, setEdit]=useState(false);
   const [editable,setEditable]=useState(null);

   const changeNoteHandler=(e)=>{
      setNote(e.target.value);
   }

   const submitHandler=(e)=>{
      e.preventDefault();
      if(note.trim()===""){
         return alert(`Please provide a valid note`);
      }
      edit? editHandler():createHandler();
   }

   const createHandler=()=>{
      const newNote={
         id:Date.now()+"",
         title:note,
      }
      setNotes([newNote,...notes]);
      setNote("");
   }

   const editHandler=()=>{
      const updatedNotes=notes.map((snote)=>{
         if(snote.id===editable.id){
            return {...snote, title:note}
         }
         return snote;
      });
      setNotes(updatedNotes);
      setNote('');
      setEdit(false);
   }

   const deleteHandler=(id)=>{
      const updatedNotes=notes.filter((note)=>note.id!==id);
      setNotes(updatedNotes);
   }

   const updateHandler=(note)=>{
      setEdit(true);
      setEditable(note);
      setNote(note.title);
   }

  return (
    <div className="App">
      <form onSubmit={submitHandler}>
         <input
         type="text"
         value={note}
         onChange={changeNoteHandler}
         />
         <button type="submit">{edit?"Edit Note":"Add Note"}</button>
      </form>
      <h2>All Notes</h2>
      <div>
         {notes.map((singleNote)=>(
            <>
            <li key={singleNote.id}>
               {singleNote.title}
               <button onClick={()=> updateHandler(singleNote)}>Update</button>
               <button onClick={()=> deleteHandler(singleNote.id)}>Delete</button>
            </li>
            </>
            ))}
      </div>
    </div>
  );
}

export default App;
