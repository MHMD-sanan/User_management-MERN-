const mongoose=require('mongoose');
mongoose.set('strictQuery', true)
mongoose.connect('mongodb://localhost:27017/week-15');
mongoose.connection.on("connected",(err)=>{  
    if(err){
        console.log(err); 
    }
    else{
        console.log("mongodb connected successfuly");
    }
})