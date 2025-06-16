import React from 'react';
import Image from 'next/image';

interface ReviewCardProps {
  onClose: () => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ onClose }) => {
  const [name, setName] = React.useState('');
  const [jobRole, setJobRole] = React.useState('');
  const [review, setReview] = React.useState('');
  const [experience, setExperience] = React.useState('');
  const [rating, setRating] = React.useState(0);

  const jobRoles = [
    'Frontend Developer',
    'Backend Developer',
    'Fullstack Developer',
    'UI/UX Designer',
    'Mobile App Developer',
    'Student',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !jobRole || !rating || !experience) {
      alert('Please fill in all fields');
      return;
    }

    try {
      // Create a hidden iframe for form submission
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      // Create a form element
      const form = document.createElement('form');
      form.action = 'https://docs.google.com/forms/d/e/1FAIpQLSeYghnGbECPjFAhPx09BLWQTFOz2VAAUugTDkT92p94TADxfQ/formResponse';
      form.target = 'hiddenFrame';
      form.method = 'POST';

      // Add form fields
      const fields = [
        { name: 'entry.1572172334', value: name },
        { name: 'entry.249154496', value: jobRole },
        { name: 'entry.2023838225', value: rating.toString() },
        { name: 'entry.1640725785', value: experience }
      ];

      fields.forEach(field => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = field.name;
        input.value = field.value;
        form.appendChild(input);
      });

      // Submit the form
      document.body.appendChild(form);
      form.submit();

      // Clean up
      setTimeout(() => {
        form.remove();
        iframe.remove();
        setName('');
        setJobRole('');
        setRating(0);
        setExperience('');
        onClose();
        alert('Thank you for your review!');
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit review. Please try again.');
    }
  };

  return (
    <div className="rounded-lg shadow-lg p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Write Review</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A175FF]"
            required
            placeholder='Your Name'
          />
        </div>

        {/* Job Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Job Role</label>
          <select
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A175FF]"
            required
          >
            <option value="">Select your role</option>
            {jobRoles.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Write your review</label>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`p-1 ${rating >= star ? 'text-[#FFC700]' : 'text-gray-400'}`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Share your experience</label>
          <textarea
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A175FF]"
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-b from-[#5C2ED1CC] to-[#A175FF] text-white rounded-md hover:opacity-90 transition-all border border-[#A175FF]"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewCard;
