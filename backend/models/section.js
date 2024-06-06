const mongo=require('mongoose')

const section=new mongo.Schema({
    sectionName:{
        type:String,
        required:true
    },
    subsection:[
        {
            type:mongo.Schema.Types.ObjectId,
            ref:'subsection'
        }
    ]
})

module.exports=mongo.model('section',section)