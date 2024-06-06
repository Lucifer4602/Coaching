const mongo=require('mongoose')

const subsection=new mongo.Schema({
    title:{
        type:String,
        required:true
    },
    duration:{
        type:String,
    },
    videoUrl:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    }
})

module.exports=mongo.model('subsection',subsection)