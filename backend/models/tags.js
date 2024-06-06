const mongo=require('mongoose')

const tag=new mongo.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    course:[
        {
            type:mongo.Schema.Types.ObjectId,
            ref:'course'
        }
    ]
})

module.exports=mongo.model('tag',tag)