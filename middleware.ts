import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Apply only to standalone B2B APIs that require authentication
  const standalonePaths = ['/api/revai/analyze', '/api/revai/forecast', '/api/revai/anomalies', '/api/revai/credit-score'];
  const pathname = request.nextUrl.pathname;

  if (standalonePaths.some(path => pathname.startsWith(path))) {
    const key = request.headers.get('x-api-key');
    
    // In production, this would be a DB check with bcrypt/JWT validation
    if (key !== 'revai-demo-key') {
      return NextResponse.json(
        { error: 'Unauthorized. Invalid or missing X-API-Key header.' },
        { status: 401 }
      );
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/api/revai/:path*',
};
