'use client'
import { NextResponse } from 'next/server';
export async function middleware(req:any) {
  const { pathname } = req.nextUrl;
  const sessionToken = req.cookies.get('token');
  console.log('sessionToken1111',sessionToken);
   if (!sessionToken && pathname === '/') {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  if (sessionToken && (pathname === '/login' || pathname === '/')) {
 return NextResponse.redirect(new URL('/template', req.url));
  }
  if (!sessionToken && (pathname.startsWith('/template'))) {
 return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
export { default } from "next-auth/middleware";
export const config = { matcher: ["/","/login","/template"] };