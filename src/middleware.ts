import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Inisialisasi Supabase Server Client khusus Middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Mengambil data user aktif dari cookie/sesi
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const url = request.nextUrl.clone();

  // 1. Jika mencoba akses dashboard admin tapi BELUM login -> Lempar ke /admin/login
  if (url.pathname.startsWith('/admin/dashboard') && !user) {
    url.pathname = '/admin/login';
    return NextResponse.redirect(url);
  }

  // 2. Jika SUDAH login tapi buka halaman /admin/login -> Lempar ke /admin/dashboard
  if (url.pathname === '/admin/login' && user) {
    url.pathname = '/admin/dashboard';
    return NextResponse.redirect(url);
  }

  return response;
}

// Menentukan rute mana saja yang diproteksi oleh middleware
export const config = {
  matcher: ['/admin/:path*'],
}; 