'use client';

import { useAuth } from '../../providers/auth-provider';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import SignIn from '../../components/auth/SignIn';

export default function SignInPage() {
  const { user, initializing } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // If user is already authenticated, redirect to dashboard
  useEffect(() => {
    if (!initializing && user && pathname === '/auth/signin') {
      router.push('/dashboard');
    }
  }, [user, router, pathname, initializing]);

  // Show loading state during initialization
  if (initializing) {
    return null;
  }

  return <SignIn />;
}
