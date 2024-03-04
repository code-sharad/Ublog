import { Hono } from "hono";
import { Prisma, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";
import {UpdateBlogInput,createBlogInput} from "@sharad31/common"

export const blogRouter = new Hono<{
    Bindings:{
        JWT_SECRET:string
    },
    Variables:{
        userId:string
    }
}>()

 function connectDB(c:any){
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
return prisma;
}


blogRouter.use("*",async(c,next) => {
    const authHeader = c.req.header("authorization") || ""
    try{
        const user =await verify(authHeader,c.env.JWT_SECRET)
    console.log(user)
    if(user){
        c.set("userId",user.id);
       await next();
    }else{
        c.status(403);
        return c.json({
            msg:'You are not logged in'
        })
    }
    }catch(err){
        c.status(403);
        return c.json({msg:'You are not Logged in '})
    }

})

blogRouter.put("/",async(c) => {
    const body =await c.req.json();
    const prisma = connectDB(c);

   try{
    const blog= await prisma.blog.update({
        where:{
            id:body.id
        },
        data:{  
            title:body.title,
            content:body.content,
        }
    })
    return c.json({
        msg:"blog updated",
        id:blog.id
    })
   }catch(err){
    c.status(403);
    return c.json({msg:"invalid user"})
   }
})

blogRouter.post("/", async (c) => {
    const body = await c.req.json();
    const prisma = connectDB(c);
    const userId = c.get("userId");

    try{
    const blog= await prisma.blog.create({
        data:{  
            title:body.title,
            content:body.content,
            published:true,
            authorId:userId
        }
    })
    return c.json({
        msg:"blog created",
        id:blog.id
    })
   }
   catch(err){
    c.status(403);
    return c.json({msg:"invalid user"})
   }
})

blogRouter.get("/bluk",async(c) => {

    const prism= connectDB(c);
    const blog = await prism.blog.findMany({
        select:{
            title:true,
            content:true,
            id:true,
            User:{
                select:{
                    username:true
                }
            }
        }
    });

    return c.json({
        blog
    })
})

blogRouter.get("/:id",async(c)=> {
    const id = c.req.param("id");

    const prism = connectDB(c);
    const blog = await prism.blog.findFirst({
        where:{
            id:id
        }
    })

    return c.json(blog)
})
