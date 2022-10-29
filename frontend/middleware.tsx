import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

//Загатовка
export function middleware(req: NextRequest) {
    const authCookie = req.cookies.get('accessToken')
    const url = req.url

    if(!authCookie) {
        if(url.includes('/profile') || url.includes('/blog')) {
            return NextResponse.redirect('http://localhost:3000')
        }
    }
}