'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../../providers/auth-provider';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase/client';

const SignIn = () => {
  const { signIn, signUp, user } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error: signInError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (signInError) {
        setError('An error occurred during Google sign in. Please try again.');
        return;
      }

      // Wait for the session to be updated
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get the current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        setError('An error occurred during Google sign in. Please try again.');
        return;
      }

      if (!session?.user) {
        setError('Failed to retrieve user information. Please try again.');
        return;
      }

      const authUser = session.user;
      
      // Check if user has completed onboarding
      const { data: preferences, error: preferencesError } = await supabase
        .from('onboarding_preferences')
        .select('id')
        .eq('user_id', authUser.id)
        .single();

      if (preferencesError) {
        setError('An error occurred during Google sign in. Please try again.');
        return;
      }

      // Redirect to appropriate page
      if (preferences) {
        router.push('/dashboard');
      } else {
        router.push('/onboarding');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    try {
      setIsLoading(true);
      setError(null);
      
      const { data: signInData, error: signInError } = await signIn(email, password);
      
      if (signInError) {
        if (signInError.message.includes('Invalid login credentials')) {
          setError('Invalid email or password. Please try again.');
        } else if (signInError.message.includes('Email not verified')) {
          setError('Please verify your email address before signing in.');
        } else {
          setError('An error occurred during sign in. Please try again.');
        }
        return;
      }

      // Get the user from the auth response
      const { user: authUser } = signInData;

      // Check if user has completed onboarding
      const { data: preferences, error: preferencesError } = await supabase
        .from('onboarding_preferences')
        .select('id')
        .eq('user_id', authUser.id)
        .single();

      if (preferencesError) {
        console.error('Error checking onboarding status:', preferencesError);
        setError('An error occurred. Please try signing in again.');
        return;
      }

      // Redirect to appropriate page
      if (preferences) {
        router.push('/dashboard');
      } else {
        router.push('/onboarding');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[464px] w-full bg-[#F5F5F5] p-3 rounded-[40px]">
        <div className="bg-white p-8 rounded-4xl ">
          {/* Logo and Title */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Image
                src="/images/signinicon.svg"
                alt="IconWizard Logo"
                width={48}
                height={48}
              />
            </div>
            <h2 className="text-3xl font-bold text-[#1E1E2F] mb-2">Sign in</h2>
            <p className="text-[#6F6F87] text-lg font-inter">Welcome to IconWizard</p>
          </div>

          {/* Social Sign-in */}
          {/* <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
               <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
             </div>
             <div className="mt-6 grid grid-cols-1 gap-3">
               <button
                 onClick={handleGoogleSignIn}
                 disabled={isLoading}
                 type="button"
                 className="inline-flex justify-center w-full px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5C2ED1] disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 <span className="sr-only">Sign in with Google</span>
                 <Image
                   src="/images/google.svg"
                   alt="Google"
                   width={20}
                   height={20}
                   className="mr-2"
                 />
                 Sign in with Google
               </button>
             </div>
          </div> */}

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {error && <div className="text-red-500 text-center">{error}</div>}
            <div className="space-y-4">
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Image
                      src="/images/mail-input.svg"
                      alt="Email"
                      width={20}
                      height={20}
                    />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="bg-[#F5F5F5] block w-full pl-10 pr-4 py-3  rounded-xl placeholder-[#6F6F87] focus:outline-none focus:ring-2 focus:ring-[#5C2ED1] focus:border-transparent"
                    placeholder="Email"
                  />
                </div>
              </div>
              
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Image
                      src="/images/lock-input.svg"
                      alt="Password"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                    <Image
                      src={showPassword ? '/images/eye-on.svg' : '/images/eye-off.svg'}
                      alt={showPassword ? 'Hide password' : 'Show password'}
                      width={20}
                      height={20}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    className="bg-[#F5F5F5] block w-full pl-10 pr-4 py-3  rounded-xl placeholder-[#6F6F87] focus:outline-none focus:ring-2 focus:ring-[#5C2ED1] focus:border-transparent"
                    placeholder="Password"
                  />
                </div>
              </div>
            </div>

            {/* Remember me and Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#5C2ED1] focus:ring-[#5C2ED1] border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-[#6F6F87]">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link href="/forgot-password" className="text-[#6F6F87] hover:text-[#4A25A8]">
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Sign in button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-b from-[#5C2ED1CC] to-[#A175FF] hover:bg-[#4A25A8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5C2ED1]"
              >
                Sign in
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dashed border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social login buttons */}
          <div className="grid grid-cols-3 gap-3">
            <button
             onClick={() => handleGoogleSignIn()}
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Image
                src="/images/google.svg"
                alt="Google"
                width={20}
                height={20}
              />
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Image
                src="/images/github.svg"
                alt="GitHub"
                width={20}
                height={20}
              />
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Image
                src="/images/facebook.svg"
                alt="Facebook"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>

        {/* Sign up link */}
        <div className="mt-4 text-center">
          <p className="text-lg text-[#6F6F87]">
            Don't have an account?{' '}
            <Link href="/signup" className="text-[#1E1E2F] hover:text-[#4A25A8]">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn; 