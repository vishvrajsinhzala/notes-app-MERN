import { useEffect, useState } from "react";
import style from './allnotes.module.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AllNotes() {
    const [note, setnote] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:3000/ShowNotes")
            .then((res) => {
                setnote(res.data.Notes)
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }, [])
    function Deletenote(id) {
        axios.delete(`http://localhost:3000/deletenote/${id}`)
            .then((res) => {
                console.log(res.data)
                setnote(note.filter(n => n._id !== id))
            })
    }

    function Editnote(n) {
        navigate('/create-note', { state: n });
    }

    
    

    return (
        <>
            <div className={style.main}>
                <div className={style.container}>
                    <h1 className={style.heading}>All Notes</h1>
                    <div className={style.notesContainer}>
                        {note.length === 0 ? <p className={style.noNotes}>No notes available.</p>
                            : note.map((n, index) => (
                                <div key={n._id} className={style.note}>
                                    <h2 className={style.noteTitle}>{n.title}</h2>
                                    <p className={style.noteDescription}>{n.description}</p>
                                    <button className={style.deleteButton} onClick={() => Deletenote(n._id)}>Delete</button>
                                    <button className={style.editButton}  onClick={() => Editnote(n) }>Edit</button>

                                </div>
                            ))}
                    </div>
                    <button className={style.createButton} onClick={() => navigate('/create-note')}>Create Note</button>
                </div>
            </div>
        </>
    )
}
export default AllNotes;