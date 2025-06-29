import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const protectedPaths = [
    '/admin/team',
    '/admin/add-team', 
    "/admin/projects/add-project",
    '/admin/projects/edit-project/[id]',
    '/admin/contact',
    '/admin/projects',
    '/admin/contact/add-contact',
    '/admin/clients/add-client',
    '/admin/clients',
    '/admin/projects',
    '/admin/queries',
    '/admin/quotes',
    '/admin/services/add-service',
    '/admin/services/edit-service/[id]',
    '/admin/services',
    '/admin'

  ];

  // Check if the current path is protected
  const isProtected = protectedPaths.includes(path); // Use includes instead of startsWith

  if (isProtected) {
    
    
    const token = await getToken({
      req,
      secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
      secureCookie: process.env.NODE_ENV === 'production',
    });

    

    // If no token and path is protected, redirect to login
    if (!token) {
      const signInUrl = new URL('/signin', req.url);
      signInUrl.searchParams.set('callbackUrl', req.url);
      
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|signin|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};