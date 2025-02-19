// this is for the backend portion
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const response = NextResponse.json(
            {
                message: "logout successful",
                success: true
            }
        )
        response.cookies.set("token", "", { httpOnly: true, expires: new Date() });
        return response
    } catch (err: any) {
        return NextResponse.json({
            error: err.message,
        }, { status: 500 })
    }
}