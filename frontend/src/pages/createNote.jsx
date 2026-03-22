import { useLocation, useNavigate } from 'react-router-dom';
import style  from './createNote.module.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
function CreateNote() {
    const navigate = useNavigate();
    const location = useLocation();
    const editdata=location.state;
    const [note,setnote]=useState({
        title:"",
        description:""
    })
    
    useEffect(()=>{
        if(editdata){
            setnote({
                title:editdata.title,
                description:editdata.description
            })
        }

    },[editdata])

     async function handleSubmit (e) {
        e.preventDefault();
        const data={
            title: note.title,
            description: note.description
        }
        
        if(editdata){

            await axios.patch(`http://localhost:3000/editnote/${editdata._id}`,data)
            .then(()=>{
                console.log("Note updated successfully");
                navigate('/all-notes');
            })
            .catch((err)=>{
                console.error(err);
            })
        }
        else{
         axios.post("http://localhost:3000/AddNotes", data)
            .then((res) => {
                console.log(res.data);
                navigate('/all-notes');
               
            })
            .catch((err) => {
                console.error(err);
            });

    }
}

    return (
        <>
        <div className={style.main}>
            <div className={style.container}> 
            <h1 className={style.heading}>Create Note</h1>
            <form  className={style.form} onSubmit={handleSubmit}>
                <label className={style.labels}>Title:</label>
                <input className={style.inputs} type="text" id="title" 
                value={note.title} placeholder="Title" 
                onChange={(e)=>setnote({...note, title:e.target.value})}    />

                <label className={style.labels}>Description:</label>
                <textarea className={style.textareas} id="description" 
                value={note.description} placeholder="Content"
                onChange={(e)=>setnote({...note,description:e.target.value})}></textarea>

                <button className={style.button} type="submit">{editdata ?"Update Note":"Save Note"}</button>
                <button className={style.button} type="button" onClick={()=>navigate('/all-notes')}>SeeAllNotes</button>
            </form>
            </div>
        </div>
        </>
    )
}
export default CreateNote;