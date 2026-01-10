import Comment from "../models/comment.js"
import Product from "../models/product.js"
import { isAdmin } from "./userController.js"

export async function createComment(req,res){
    
    if(req.user==null){
        res.status(403).json({
            message:"please log in"
        }) 
        return
    }
    if(isAdmin(req)){
        res.status(403).json({
            message:"Admin cannot create comment"
        })
        return
    }
        const product=await Product.findOne({productId:req.params.productId})
      
         if(product==null){
                res.status(404).json({
                    message:"product not found"
                })

                return
        }
          if(product.isAvailable==false){
                res.status(403).json({
                    message:" not  Access to post a comment"
                })

                return
        }
    


    const commentInfo = req.body

    if(commentInfo.name == null){
        commentInfo.name=req.user.firstName +" "+ req.user.lastName
    }

    const comment = new Comment({
        productId:req.params.productId,
        email:req.user.email,
        name:commentInfo.name,
        comment:commentInfo.comment,
        rating:commentInfo.rating
    })

        
try{
    const createComment = await comment.save()
    res.json({
        message:"comment created successfully",
        comment:createComment
    })

}catch(err){
    res.status(500).json({
        message:"Faild to create comment",
        error:err
    })
}
    
    
    
}

export async function showComments(req,res){

    const productId=req.params.productId
try{
    if(req.user==null){
        res.status(403).json({
            message:"please log in"
        })
        return
    }
    const product = await Product.findOne({productId:productId})//productId
    const comment = await Comment.find({productId:productId})
   

    if(product==null){
        res.status(404).json({
            message:"product id not  found"
        })
        return
    }
   
    if(isAdmin(req)){
        res.json(comment)
    }else{
       if(product.isAvailable){
        res.json(comment)
       }else{
        res.status(403).json({
            message:"you are not and admin to create this process"
        })
       }
    
    }
}catch(err){
    res.status(500).json({
        error:err
    })
}
}