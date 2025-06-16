'use client';

import React, { useState } from 'react';
import DashboardNavbar from '../components/NavBar/DashboardNavbar';
import Image from 'next/image';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // Here you would typically make an API call to send the form data
      // For now, we'll just simulate the submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccessMessage('Thank you for your message! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setErrorMessage('An error occurred while submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7FB]">
      <DashboardNavbar />
      
      <div className="container mx-auto px-4 py-38">
        <div className="lg:w-[508px] mx-auto">
          {/* Page Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-2xl md:text-4xl font-bold text-[#1E1E2F] mb-2">Contact Us</h1>
            <p className="text-md md:text-lg text-[#6F6F87]">We’d love to hear from you! Whether you have questions, </p>
            <p className="text-md md:text-lg text-[#6F6F87]">feedback, or business inquiries, feel free to reach out.</p>
          </div>

          {errorMessage && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg">
                <p className="text-red-500 text-center mb-4">{errorMessage}</p>
                <button
                  onClick={() => setErrorMessage('')}
                  className="w-full bg-[#5C2ED1] text-white py-2 px-4 rounded-lg hover:bg-[#4a25a1]"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {successMessage && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg">
                <p className="text-green-500 text-center mb-4">{successMessage}</p>
                <button
                  onClick={() => setSuccessMessage('')}
                  className="w-full bg-[#5C2ED1] text-white py-2 px-4 rounded-lg hover:bg-[#4a25a1]"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-[24px] p-8 border border-[#D1D1D6]">
            <div className="space-y-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#252525] mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#D1D1D6] focus:ring-2 focus:ring-[#5C2ED1] focus:border-transparent"
                  required
                  placeholder="Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#252525] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#D1D1D6] focus:ring-2 focus:ring-[#5C2ED1] focus:border-transparent"
                  required
                  placeholder="Email"
                />
              </div>
            </div>

            {/* <div className="mb-6">
              <label htmlFor="subject" className="block text-sm font-medium text-[#49454F] mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-[#D1D1D6] focus:ring-2 focus:ring-[#5C2ED1] focus:border-transparent"
                required
              />
            </div> */}

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-[#252525] mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 rounded-xl border border-[#D1D1D6] focus:ring-2 focus:ring-[#5C2ED1] focus:border-transparent"
                required
                placeholder="Message"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-lg transition-colors duration-150 ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-b from-[#5C2ED1CC] to-[#A175FF] text-white'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
