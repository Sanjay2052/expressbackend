let express=require('express')
let mongoose=require('mongoose')
let answerrouter=require('./Router/AnswerRouter')
let cors=require("cors")

let app=express()
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb://localhost:27017/stackquestion")
  .then(() => console.log('MongoDB connected👍'))
  .catch(err => console.error(err));

app.use('/api/answer',answerrouter)

app.listen(8004,()=>{
    console.log("the question server is running on PORT 8004");

})