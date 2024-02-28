const jwt=require('jsonwebtoken')

const userMiddleware=async(req,res,next)=>{
    try {
        const token=req.headers.token
        if(!token){
            res.status(400).json({msg:'you are not authorized'})
        }else{
             verifytoken=await jwt.verify(token,process.env.JWT_TOKEN , (err,verifytoken)=>{
               if(err){
               res.status(400).json({msg:'you are not authorized'})

               }else{
                req.body.userId=verifytoken.id
                    next()
               }
             })
            // if(!verifytoken){
            //     res.status(400).json({msg:'you are not authorized'})
            // }else{
            //     req.body.userId=verifytoken.id
            //     next()
            // }
        }
    
    } catch (error) {
        res.status(500).json({msg:'somthing wrong'})

    }
   
}

module.exports=userMiddleware