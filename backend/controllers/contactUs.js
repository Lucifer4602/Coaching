const {sender}=require('../utils/mailSender')

exports.contactUs=async(req,res)=>{
    const {email,firstName,lastName,message,phoneNumber,countryCode}=req.body

    try{
        const emailRes=await sender(email,"You are done now","email is recieved")

        return res.status(202).json(
            {
                success:true,
                message:"Email send successfully"
            }
        )
    }
    catch(error)
    {
        return res.status(503).json({
            success:false,
            message:"Something isnt right huh"
        })
    }
}



// not sure about this