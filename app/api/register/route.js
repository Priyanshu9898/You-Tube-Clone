import bcrypt from "bcrypt";
import prisma from "../../lib/PrismaDB.js";

import {NextResponse} from "next/server";


export async function POST(request){
    const body = await request.json();

    const {name, email, password} = body;

    if(!name || !email || !password){
        return NextResponse("Missing Fields", {status: 404});
    }


    const userExist = await prisma.user.findUnique({
        where:{
            email
        }
    });


    if(userExist){
        return NextResponse.json({error: "User already exists"}, {status:400});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            hashedPassword
        }
    });

    // console.log(user);

    return NextResponse.json({user: user}, {status:200});

}