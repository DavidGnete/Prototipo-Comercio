import { NextResponse } from "next/server";
import * as yup from "yup";


const userSchema = yup.object().shape({
    username: yup.string().required().min(3),
    email: yup.string().required().email(),
    password: yup.string().required().min(6)
});


export async function POST (request: Request) {
    try {
        const body = await request.json();
        const validation = await userSchema.validate(body);


    return NextResponse.json(
        {message: "usurio valido", data: validation},
        {status: 200}
    );
    }catch (error:any) {
        return NextResponse.json({ error: error.message }, {status:400})
    }
}