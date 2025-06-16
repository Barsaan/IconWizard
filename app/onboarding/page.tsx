'use client'

import React, { useEffect } from 'react';
import Onboarding from '../components/onboarding/Onboarding';
import { useRouter } from 'next/navigation';
import { useAuth } from '../providers/auth-provider';

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useAuth();

  // Redirect to dashboard if user is already authenticated
  useEffect(() => {
    if (user) {
      router.push('/onboarding');
    }
  }, [user, router]);

  return <Onboarding />;
}
