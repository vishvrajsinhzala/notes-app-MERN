const express =require('express');
const Notes=require('./models/notes.module');
const cors=require('cors');


const app= express();
app.use(cors());
app.use(express.json());

app.post('/AddNotes',async(req,res)=>{
    console.log(req.body);
    await Notes.create({
        title:req.body.title,
        description:req.body.description  
    })
    res.status(201).json({
        msg:"Notes created successfully"
    })

})

app.get('/ShowNotes',async (req,res)=>{
    const notes= await Notes.find();
    res.status(200).json({
        msg:"Notes fetched successfully",
        Notes:notes
    })

})

app.patch('/editnote/:id',async (req,res)=>{
    const id= req.params.id
    const title=req.body.title
    const description=req.body.description
    await Notes.findOneAndUpdate({_id: id},{
        title:title,
        description:description
    })
     res.status(200).json({
        msg:"Notes updated successfully"
     })     
})

app.delete('/deletenote/:id', async(req,res)=>{
    const id=req.params.id
     const note=  await Notes.findOneAndDelete({
        _id:id
    })
    res.status(200).json({
        msg:"Notes deleted successfully",
        Notes:note
    })
})


module.exports=app;