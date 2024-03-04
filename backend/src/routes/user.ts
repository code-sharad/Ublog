import { Hono } from "hono";
import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signUpInput, signinInput } from "@sharad31/common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

function connectDB(c: any) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  return prisma;
}

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();

  const prisma = connectDB(c);
  try {
    const { success } = signUpInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({
        msg: "your valid input",
      });
    }
    const user = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
      },
    });

    const jwt = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );

    return c.json({
      msg: "successfull Signup🌟",
      jwt: `${jwt}`,
    });
  } catch (err) {
    c.status(411);
    return c.text("Invalid");
  }
});

userRouter.post("signin", async (c) => {
  const body = await c.req.json();
  const { success } = signinInput.safeParse({email:body.email,password:body.password});
  if (!success) {
    c.status(411);
    return c.json({
      msg: "Input not corrent",
    });
  }
  const prisma = connectDB(c);
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: body.username,
        password: body.password,
      },
    });
    if (!user) {
      c.status(403);
      return c.json("Invalid");
    }

    const jwt = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );

    return c.json({
      msg: "successfull Signin🌟",
      jwt: `${jwt}`,
    });
    //  const jwt =await verify(body.jwt,c.env.JWT_SECRET) // return id

    //  return c.json({
    //   msg:'User verify successfully 🔥',
    //   username:`${user.username}`,
    //   jwt:`${jwt.id }`
    // });
  } catch (err) {
    c.status(403);
    return c.text("Invalid");
  }
});
