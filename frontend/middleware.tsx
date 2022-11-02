import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

//Загатовка
export function middleware(req: NextRequest, res: NextResponse) {
    const authCookie = req.cookies.get('accessToken')
    const adminCookie = req.cookies.get('adminCookie')
    const url = req.url

    if(!adminCookie) {
        if(url.includes('/admin')) {
            return NextResponse.redirect('http://localhost:3000/logadmin')
        }
    }

    if(authCookie) {
        if(url.includes('/login') || url.includes('/register')) {
            return NextResponse.redirect('http://localhost:3000')
        }
    }

    if(!authCookie) {
        if(url.includes('/profile') || url.includes('/blog')) {
            return NextResponse.redirect('http://localhost:3000')
        }
    }
}