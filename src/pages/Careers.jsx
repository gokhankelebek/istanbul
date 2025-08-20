import React from 'react';
import { Helmet } from 'react-helmet';

export default function Careers() {
  return (
    <>
      <Helmet>
        <title>Careers - Istanbul Mediterranean Halal</title>
        <meta name="description" content="Join our team at Istanbul Mediterranean! We're looking for passionate individuals to help us serve authentic halal Mediterranean cuisine in Las Vegas." />
        <link rel="canonical" href="https://www.istanbullv.com/careers" />
      </Helmet>
      
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Join Our Team</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              Istanbul Mediterranean is always looking for passionate, hardworking individuals to join our family. 
              We offer competitive wages, flexible schedules, and a positive work environment.
            </p>

            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8">
              <h2 className="text-2xl font-bold text-amber-800 mb-4">Why Work With Us?</h2>
              <ul className="list-disc list-inside text-amber-700 space-y-2">
                <li>Competitive wages and tips</li>
                <li>Flexible scheduling to fit your lifestyle</li>
                <li>Training provided - no experience necessary</li>
                <li>Family-friendly work environment</li>
                <li>Opportunities for advancement</li>
                <li>Employee meal discounts</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Current Openings</h2>
            
            <div className="grid gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Kitchen Staff</h3>
                <p className="text-gray-600 mb-4">
                  Join our kitchen team preparing authentic Mediterranean cuisine. Experience with Mediterranean 
                  or Middle Eastern cooking is a plus, but we'll train the right candidate.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Part-time and full-time positions available</li>
                  <li>Food safety certification preferred</li>
                  <li>Ability to work in a fast-paced environment</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Front of House Staff</h3>
                <p className="text-gray-600 mb-4">
                  We're looking for friendly, customer-service oriented individuals to join our front of house team. 
                  Great for students or anyone looking for flexible hours.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Cashier and customer service experience preferred</li>
                  <li>Bilingual (English/Spanish or Arabic) a plus</li>
                  <li>Must be available weekends</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Delivery Drivers</h3>
                <p className="text-gray-600 mb-4">
                  Join our delivery team and earn great tips while representing Istanbul Mediterranean 
                  throughout the Las Vegas area.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Valid driver's license and insurance required</li>
                  <li>Own reliable vehicle</li>
                  <li>Smartphone for delivery app navigation</li>
                  <li>Evening and weekend availability</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">How to Apply</h2>
              <p className="text-blue-700 mb-4">
                Ready to join the Istanbul Mediterranean family? We'd love to hear from you!
              </p>
              <div className="space-y-2 text-blue-700">
                <p><strong>Apply in Person:</strong> Visit us during business hours</p>
                <p><strong>Call:</strong> [Your Phone Number]</p>
                <p><strong>Email:</strong> careers@istanbullv.com</p>
              </div>
              <p className="text-blue-600 mt-4 text-sm">
                Istanbul Mediterranean is an equal opportunity employer committed to diversity and inclusion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}