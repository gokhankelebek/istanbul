import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaMapMarkerAlt, FaClock, FaHeart, FaUsers } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

export default function Careers() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // EmailJS configuration
      const serviceId = 'service_goau3zi';
      const templateId = 'template_o26uzjo';
      const publicKey = 'b7bFs-5rAi-9caqhn';

      const formData = new FormData(e.target);
      const templateParams = {
        from_name: `${formData.get('firstName')} ${formData.get('lastName')}`,
        from_email: formData.get('email'),
        phone: formData.get('phone'),
        position: formData.get('position'),
        message: formData.get('message'),
        to_email: 'istanbulinvegas@gmail.com'
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setSubmitted(true);
      e.target.reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setError('Failed to submit application. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Careers at Istanbul Mediterranean | Join Our Team in Las Vegas</title>
        <meta name="description" content="Join the Istanbul Mediterranean team! We're hiring servers, cooks, and more. Competitive pay, flexible hours, and a family-friendly work environment in Las Vegas." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center bg-charcoal mb-12 overflow-hidden">
        <img 
          src="/careers/kitchen-team.jpg" 
          alt="Istanbul Mediterranean Team" 
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          onError={(e) => e.target.style.display = 'none'}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-charcoal/50 to-transparent" />
        <div className="relative z-10 text-center text-white space-y-4 px-4">
          <h1 className="font-poppins font-extrabold text-4xl md:text-6xl drop-shadow-lg">Join Our Family</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">Build your career with Las Vegas's premier Turkish Mediterranean restaurant</p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">🌟 Why Work With Us?</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-offwhite p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-istanbulRed">🕌 Cultural Pride</h3>
                <p className="text-gray-700">Be part of a restaurant that celebrates authentic Turkish & Mediterranean flavors with 100% halal ingredients.</p>
              </div>
              <div className="bg-offwhite p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-herb">🌯 Delicious Mission</h3>
                <p className="text-gray-700">We serve healthy, fresh, and flavorful meals — fast.</p>
              </div>
              <div className="bg-offwhite p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-primary">🎰 Vegas Energy</h3>
                <p className="text-gray-700">Work in one of the most exciting cities in the world with high foot traffic and a dynamic team.</p>
              </div>
              <div className="bg-offwhite p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-saffron">🤝 Team-First Culture</h3>
                <p className="text-gray-700">We believe in supporting our people, offering flexibility, respect, and growth.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-offwhite">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">Apply Today</h2>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="relative">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="peer border-b-2 border-gray-300 bg-transparent w-full px-1 py-3 focus:outline-none focus:border-istanbulRed transition-colors"
                  required
                />
                <label
                  htmlFor="firstName"
                  className="absolute left-1 top-0 text-gray-400 text-sm transition-all peer-focus:-top-5 peer-focus:text-xs peer-focus:text-istanbulRed peer-valid:-top-5 peer-valid:text-xs pointer-events-none"
                >
                  First Name
                </label>
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="peer border-b-2 border-gray-300 bg-transparent w-full px-1 py-3 focus:outline-none focus:border-istanbulRed transition-colors"
                  required
                />
                <label
                  htmlFor="lastName"
                  className="absolute left-1 top-0 text-gray-400 text-sm transition-all peer-focus:-top-5 peer-focus:text-xs peer-focus:text-istanbulRed peer-valid:-top-5 peer-valid:text-xs pointer-events-none"
                >
                  Last Name
                </label>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="peer border-b-2 border-gray-300 bg-transparent w-full px-1 py-3 focus:outline-none focus:border-istanbulRed transition-colors"
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute left-1 top-0 text-gray-400 text-sm transition-all peer-focus:-top-5 peer-focus:text-xs peer-focus:text-istanbulRed peer-valid:-top-5 peer-valid:text-xs pointer-events-none"
                >
                  Email Address
                </label>
              </div>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  className="peer border-b-2 border-gray-300 bg-transparent w-full px-1 py-3 focus:outline-none focus:border-istanbulRed transition-colors"
                  required
                />
                <label
                  htmlFor="phone"
                  className="absolute left-1 top-0 text-gray-400 text-sm transition-all peer-focus:-top-5 peer-focus:text-xs peer-focus:text-istanbulRed peer-valid:-top-5 peer-valid:text-xs pointer-events-none"
                >
                  Phone Number
                </label>
              </div>
            </div>

            <div className="relative mb-6">
              <input
                type="text"
                name="position"
                id="position"
                className="peer border-b-2 border-gray-300 bg-transparent w-full px-1 py-3 focus:outline-none focus:border-istanbulRed transition-colors"
                required
              />
              <label
                htmlFor="position"
                className="absolute left-1 top-0 text-gray-400 text-sm transition-all peer-focus:-top-5 peer-focus:text-xs peer-focus:text-istanbulRed peer-valid:-top-5 peer-valid:text-xs pointer-events-none"
              >
                Position Interested In
              </label>
            </div>

            <div className="relative mb-6">
              <textarea
                name="message"
                id="message"
                rows="4"
                className="peer border-b-2 border-gray-300 bg-transparent w-full px-1 py-3 focus:outline-none focus:border-istanbulRed transition-colors resize-none"
                required
              ></textarea>
              <label
                htmlFor="message"
                className="absolute left-1 top-0 text-gray-400 text-sm transition-all peer-focus:-top-5 peer-focus:text-xs peer-focus:text-istanbulRed peer-valid:-top-5 peer-valid:text-xs pointer-events-none"
              >
                Tell us about yourself
              </label>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn btn-primary w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>

            {error && (
              <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg text-center">
                {error}
              </div>
            )}

            {submitted && (
              <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-lg text-center">
                Thank you for your interest! We'll review your application and contact you soon.
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-saffron/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-8 text-primary">Questions About Careers?</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-2xl text-saffron" />
              <span className="text-lg">3615 S Las Vegas Blvd #101, Las Vegas, NV</span>
            </div>
            <div className="flex items-center gap-3">
              <FaClock className="text-2xl text-herb" />
              <span className="text-lg">Open Daily: 10 AM - 5 AM</span>
            </div>
          </div>
          <p className="mt-6 text-lg text-gray-700">
            Stop by in person to speak with a manager, or call us at{' '}
            <a href="tel:+17259008844" className="text-istanbulRed font-semibold hover:underline">
              (725) 900-8844
            </a>
          </p>
        </div>
      </section>
    </>
  );
}