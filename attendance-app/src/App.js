import {useState} from "react";
import './App.css';

function App() {
   const [studentName,setStudentName]=useState("");
   const [students,setStudents]=useState([
      {
         id:Date.now()+"",
         name:"Moloy",
         isPresent: undefined
      },
   ]);
   const [editMode,setEditMode]=useState(false);
   const [editableStudent,setEditableStudent]=useState(null);

   const submitHandler =(e)=>{
      e.preventDefault();
      if(studentName.trim()===""){
         return alert(`Please provide a valid name.`);
      }

      editMode? updateHandler() : createHandler();
   }

   const createHandler=()=>{
      const newStudent={
         id:Date.now()+"",
         name:studentName,
         isPresent: undefined
      }
      setStudents([...students, newStudent]);
      setStudentName("");
   }
   const editHandler=(student)=>{
      setEditMode(true);
      setEditableStudent(student);
      setStudentName(student.name);
   }
   const updateHandler=()=>{
      const updatedStudentList=students.map((item)=>{
         if (item.id===editableStudent.id){
            return {...item, name:studentName}
         }
         return item;
      });
      setStudents(updatedStudentList);
      setEditMode(false);
      setEditableStudent(null);
      setStudentName("");
   }
   const removeHandler=(studentId)=>{
      const updatedStudentList=students.filter(
         (student)=>student.id!==studentId,
      );
      setStudents(updatedStudentList);
   };

   const changeNameHandler=(e)=>{
      setStudentName(e.target.value);
   }

  return (
    <div className="App">
      <form onSubmit={submitHandler}>
         <input type="text" value={studentName} onChange={changeNameHandler} />
         <button type="submit">{editMode? "Update" : "Add Student"}</button>
      </form>
      <div className="student-section">
         <div className="list all-students">
            <ul>
               <h2>All Students</h2>
               {students.map(student=>(
                  <li key={student.id}>
                     <span>{student.name}</span>
                     <button onClick={()=>editHandler(student)}>Edit</button>
                     <button onClick={()=>removeHandler(student.id)}>Delete</button>
                     <button>Make Present</button>
                     <button>Make Absent</button>
                  </li>   
               ))}
            </ul>
         </div>
         <div className="list present-students">
            <h2>Present Students</h2>
         </div>
         <div className="list absent-students">
            <h2>Absent Students</h2>
         </div>
      </div>
    </div>
  );
}

export default App;
