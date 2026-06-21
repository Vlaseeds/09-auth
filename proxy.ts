import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkSession } from './lib/api/serverApi';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const { pathname } = request.nextUrl;

  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  let isAuthenticated = !!accessToken;
  let responseHeaders = new Headers();

  if (!accessToken && refreshToken) {
    try {
      const sessionResponse = await checkSession();
      if (sessionResponse.status === 200) {
        isAuthenticated = true;
        
        const setCookie = sessionResponse.headers['set-cookie'];
        if (setCookie) {
          if (Array.isArray(setCookie)) {
            setCookie.forEach(cookie => responseHeaders.append('set-cookie', cookie));
          } else {
            responseHeaders.set('set-cookie', setCookie);
          }
        }
      }
    } catch (error) {
      isAuthenticated = false;
    }
  }

  if (isPrivateRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isPublicRoute && isAuthenticated) {
    const res = NextResponse.redirect(new URL('/', request.url));
    responseHeaders.forEach((value, key) => res.headers.append(key, value));
    return res;
  }

  const res = NextResponse.next();
  responseHeaders.forEach((value, key) => res.headers.append(key, value));
  return res;
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};