import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

export async function middleware(req) {
  const authHeader = req.headers.get('authorization');
  const token = authHeader && authHeader.split(' ')[1];
  const loginPath = '/login';
  const currentPath = req.nextUrl.pathname;

  // Bypass token validation for login route
  if (currentPath === loginPath) {
    return NextResponse.next();
  }

  // If no token is found, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    // Verify the JWT token
    jwt.verify(token, SECRET_KEY);
    return NextResponse.next();  // Allow access if token is valid
  } catch (err) {
    console.error('Token verification failed:', err);
    return NextResponse.redirect(new URL('/login', req.url));  // Redirect if token is invalid
  }
}

// Apply middleware to relevant routes
export const config = {
  matcher: [
    '/((?!api|static|.*\\..*|_next|users/login).*)',  // Exclude /users/login from middleware
  ],
};
