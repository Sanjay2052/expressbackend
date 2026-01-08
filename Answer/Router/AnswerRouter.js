let express=require('express')
let mongoose=require('mongoose')
let auth=require('../Middleware/auth')
let Answer=require('../Model/Answer')

let Router=express.Router()
Router.get('/:id',async(req,res)=>{
let id=req.params.id
    try{
        let answers= await Answer.findById(id)
        res.json(answers)
    }catch(error){
        console.error(error)
        
    }

})
// Express Route - Answer Service
Router.post('/:id', async (req, res) => {
    const id = req.params.id; // This is the Question ID from the URL
    // In a real microservice, 'req.user' comes from your Auth Middleware/JWT
    const userid = req.user?.userid || "1"; 
    const { content } = req.body;

    try {
        const senddata = await Answer.create({
            userId: userid,
            questionId: id,
            content: content
        });

        // Return the object so the frontend can display it immediately
        res.status(201).json(senddata); 
    } catch (error) {
        console.error("Error creating answer:", error);
        res.status(500).json({ message: "Server error while adding answer" });
    }
});


module.exports=Router
