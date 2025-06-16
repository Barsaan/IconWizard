'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../../providers/auth-provider';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase/client';

const SignUp = () => {
  const { signUp } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    
    // Get form values
    const email = (form.querySelector<HTMLInputElement>('input[name="email"]')?.value || '') as string;
    const password = (form.querySelector<HTMLInputElement>('input[name="password"]')?.value || '') as string;
    const confirmPassword = (form.querySelector<HTMLInputElement>('input[name="confirm-password"]')?.value || '') as string;

    try {
      setIsLoading(true);
      await signUp(email, password);
      router.push('/onboarding');
    } catch (err) {
      // Don't show any error message
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) {
        setError('An error occurred during Google sign up. Please try again.');
        return;
      }
      router.push('/onboarding');
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[464px] w-full bg-[#F5F5F5] p-3 rounded-[40px]">
        <div className="bg-white p-8 rounded-4xl">
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
          <h2 className="text-3xl font-bold text-[#1E1E2F] mb-2">Create Account</h2>
          <p className="text-[#6F6F87] text-lg font-inter">Join IconWizard today</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
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
                autoComplete="new-password"
                required
                className="bg-[#F5F5F5] block w-full pl-10 pr-10 py-3 rounded-xl placeholder-[#6F6F87] focus:outline-none focus:ring-2 focus:ring-[#5C2ED1] focus:border-transparent"
                placeholder="Password"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image
                  src="/images/lock-input.svg"
                  alt="Confirm Password"
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
                id="confirm-password"
                name="confirm-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                className="bg-[#F5F5F5] block w-full pl-10 pr-10 py-3 rounded-xl placeholder-[#6F6F87] focus:outline-none focus:ring-2 focus:ring-[#5C2ED1] focus:border-transparent"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          {/* Terms and conditions */}
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-[#5C2ED1] focus:ring-[#5C2ED1] border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the{' '}
              <Link href="/terms" className="text-[#5C2ED1] hover:text-[#4A25A8]">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-[#5C2ED1] hover:text-[#4A25A8]">
                Privacy Policy
              </Link>
            </label>
          </div>

          {/* Sign up button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-[#5C2ED1] hover:bg-[#8B5CF6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5C2ED1] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing up...
                </div>
              ) : (
                'Create Account'
              )}
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

        {/* Social sign up buttons */}
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={handleGoogleSignUp}
            disabled={isLoading}
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Image
              src="/images/google.svg"
              alt="Google"
              width={20}
              height={20}
              className="mr-2"
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
       {/* Sign in link */}
      <div className="mt-4 text-center">
            <p className="text-lg text-[#6F6F87]">
            Already have an account?{' '}
            <Link href="/signin" className="text-[#5C2ED1] hover:text-[#4A25A8]">
              Sign in
            </Link>
          </p>
        </div>
    </div>
        </div>

  );
};

export default SignUp; 