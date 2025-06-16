'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../providers/auth-provider';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Create a client that uses the authenticated session
const supabase = createClientComponentClient();

interface Question {
  id: number;
  question: string;
  options: string[];
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Let’s get you set up. What do you plan to Use IconWizard for?",
    options: [
      "Personal",
      "Work",
      "School",
      "Other"
    ],
    correctAnswer: 0
  },
  {
    id: 2,
    question: "What kind of work do  you do?",
    options: [
      "Designer / Graphic Artist",
      "Educator",
      "Student",
      "Entrepreneur / Business Owner",
      "Software Engineer",
      "Marketer",
      "Influencer",
      "Other"
    ],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "What do you plan to create with IconWizard?",
    options: [
      "Icon Generation",
      "Logo Design",
      "AI Image Generation",
      "Inspiration",
      "Other"
    ],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "Have you ever used AI image generation before?",
    options: [
      "Yes, a Couple of times",
      "Yes, quite often",
      "No, it’s my first time.",
    ],
    correctAnswer: 0
  },
  {
    id: 5,
    question: "How did you hear about IconWizard?",
    options: [
      "Friends and Family",
      "Web search",
      "Pinterest",
      "X (Twitter)",
      "Facebook or Instagram",
      "YouTube",
      "TikTok",
      "LinkedIn",
      "Other"
    ],
    correctAnswer: 0
  }
];

const Onboarding = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<number[]>(Array(5).fill(-1));

  // Check authentication status
  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      router.push('/auth/signin');
    }
  }, [user, router]);

  // Check if user has already completed onboarding
  const checkOnboardingStatus = async () => {
    if (!user) return;

    try {
      const { data: preferences, error } = await supabase
        .from('onboarding_preferences')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error checking onboarding status:', error);
        return;
      }

      if (preferences && preferences.length > 0) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error in checkOnboardingStatus:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      checkOnboardingStatus();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }





  const handleAnswer = (questionId: number, answerIndex: number) => {
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[questionId - 1] = answerIndex;
      return newAnswers;
    });
  };

  const handleNext = async () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
      return;
    }

    try {
      // Store user preferences
      const { error: insertError } = await supabase
        .from('onboarding_preferences')
        .insert([
          {
            user_id: user?.id,
            purpose: questions[0].options[answers[0]],
            profession: questions[1].options[answers[1]],
            creation_type: questions[2].options[answers[2]],
            ai_experience: questions[3].options[answers[3]],
            referral_source: questions[4].options[answers[4]]
          }
        ]);

      if (insertError) {
        console.error('Error storing preferences:', insertError);
        return;
      }

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Error in handleNext:', error);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const currentQuestion = questions.find(q => q.id === currentStep);

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-[508px] mx-auto bg-white rounded-xl p-8">
      
      {/* Horizontal Stepper with Progress Line */}
      <div className="mb-12 relative">
        {/* Gray background line */}
        <div className="absolute top-1/2 left-5 right-5 h-1.5 bg-[#F5F5F5] transform -translate-y-1/2 z-0" />

        {/* Purple progress line */}
        <div
          className="absolute top-1/2 left-5 h-1.5 bg-[#A175FF] transform -translate-y-1/2 z-0 transition-all duration-300"
          style={{
            width: `calc((100% - 40px) * ${(currentStep - 1) / 4})`, // (5 steps - 1)
          }}
        />

        {/* Step Circles */}
        <div className="relative z-10 flex items-center justify-between px-[2px]">
          {Array.from({ length: 5 }, (_, index) => {
            const step = index + 1;
            const isActive = step === currentStep;
            const isCompleted = step < currentStep;

            return (
              <div
                key={step}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium z-10 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#A175FF] to-[#A175FF] via-[#5C2ED1] via-5% text-white'
                    : isCompleted
                    ? 'bg-[#A175FF] text-white'
                    : 'border-2 border-gray-300 bg-white text-gray-600'
                }`}
              >
                {isCompleted || isActive ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  step
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Question */}
      <h2 className="text-2xl font-semibold mb-10 font-inter text-center">
        {currentQuestion.question}
      </h2>

      {/* Options */}
      <div className="space-y-4">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(currentQuestion.id, index)}
            className={`w-full p-4 rounded-2xl text-left ${
              answers[currentQuestion.id - 1] === index
                ? 'bg-gradient-to-r from-[#A175FF] to-[#A175FF] via-[#5C2ED1] via-50% text-white'
                : 'bg-[#F9F9FC] hover:bg-[#F5F5F5] border border-[#D9D9D9]'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Back Button */}
      {currentStep > 1 && (
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 px-4 py-2 rounded-2xl text-left text-[#6F6F87] text-lg"
        >
          {"<-"} Back
        </button>
      )}

      {/* Continue Button */}
      <button
        onClick={handleNext}
        className={`w-full p-4 rounded-2xl text-center mt-8 ${
          answers[currentQuestion.id - 1] === -1
            ? 'bg-white hover:bg-[#F5F5F5] border border-[#D9D9D9]'
            : 'bg-[#1E1E2F] text-white'
        }`}
        disabled={answers[currentQuestion.id - 1] === -1}
      >
        {currentStep < 5 ? 'Continue' : 'Complete'}
      </button>
    </div>
  </div>
  );
};

export default Onboarding;
