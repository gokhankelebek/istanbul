import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";
import SEOHead from "../components/SEOHead";
import StructuredDataManager from "../components/StructuredDataManager";

export default function Contact() {
  // Placeholder for form feedback
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Generate LocalBusiness structured data
  const localBusinessData = {
    name: "Istanbul Mediterranean Restaurant",
    description:
      "Authentic Turkish and Mediterranean restaurant in Las Vegas, serving halal cuisine until 5 AM",
    url: "https://www.istanbullv.com",
    telephone: "+17259008844",
    email: "info@istanbullv.com",
    address: {
      streetAddress: "3615 S Las Vegas Blvd #101",
      addressLocality: "Las Vegas",
      addressRegion: "NV",
      postalCode: "89109",
      addressCountry: "US",
    },
    geo: {
      latitude: 36.12084618008743,
      longitude: -115.17192338479302,
    },
    openingHours: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "10:00",
        closes: "05:00",
      },
    ],
    sameAs: [
      "https://www.instagram.com/istanbulmediterraneanlv/",
      "https://www.facebook.com/istanbulmediterraneanlv/",
    ],
  };

  // Generate BreadcrumbList data
  const breadcrumbData = {
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.istanbullv.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact",
        item: "https://www.istanbullv.com/contact",
      },
    ],
  };

  // Aggregate all schema types for the contact page
  const aggregateSchemaData = [
    { type: "localBusiness", data: localBusinessData },
    { type: "breadcrumb", data: breadcrumbData },
  ];

  return (
    <>
      <SEOHead
        title="Contact Istanbul Mediterranean | Turkish Restaurant Las Vegas"
        description="Contact Istanbul Mediterranean restaurant in Las Vegas. Call (725) 900-8844, visit us at 3615 S Las Vegas Blvd #101, or send us a message. Open until 5 AM daily."
        keywords="contact istanbul mediterranean, turkish restaurant contact, mediterranean food las vegas contact, halal restaurant contact, restaurant phone number las vegas"
        canonicalUrl="https://www.istanbullv.com/contact"
        ogType="website"
        ogImage="https://www.istanbullv.com/contact/contact_hero.jpg"
      />
      <StructuredDataManager type="aggregate" data={aggregateSchemaData} />

      {/* Hero Banner */}
      <section
        className="relative h-[32vh] md:h-[40vh] flex items-center justify-center bg-charcoal mb-12 overflow-hidden"
        style={{ background: "#1F1F1F" }}
      >
        <img
          src="/contact/contact_hero.jpg"
          alt="Contact Istanbul Mediterranean"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
          style={{ zIndex: 0 }}
          loading="lazy"
          onError={(e) => (e.target.style.display = "none")}
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-charcoal/30 to-transparent"
          style={{ zIndex: 1 }}
        />
        <div className="relative z-10 text-center text-offwhite space-y-5 w-full flex flex-col items-center">
          <h1 className="font-poppins font-extrabold text-4xl md:text-5xl drop-shadow-lg">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl max-w-xl mx-auto">
            We love hearing from you! Reach out for reservations, catering, or
            just to say hello.
          </p>
        </div>
      </section>

      <div className="container mx-auto py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Details */}
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col justify-between border border-saffron/10">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              Istanbul Mediterranean Restaurant
            </h2>
            <div className="flex items-center gap-2 mb-2 text-herb">
              <FaMapMarkerAlt className="text-saffron text-xl" />
              <a
                href="https://maps.app.goo.gl/CyiQeyNp4X5PLDbL6"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                3615 S Las Vegas Blvd #101, Las Vegas, NV 89109
              </a>
            </div>
            <div className="flex items-center gap-2 mb-2 text-charcoal">
              <FaPhoneAlt className="text-istanbulRed text-lg" />
              <a href="tel:+17259008844" className="hover:underline">
                (725) 900-8844
              </a>
            </div>
            <div className="flex items-center gap-2 mb-2 text-charcoal">
              <FaEnvelope className="text-herb text-lg" />
              <a href="mailto:info@istanbullv.com" className="hover:underline">
                info@istanbullv.com
              </a>
            </div>
            <div className="flex items-center gap-2 mb-2 text-charcoal">
              <FaClock className="text-istanbulRed text-lg" />
              <span>Everyday, 10:00 am - 5:00 am</span>
            </div>
            <div className="flex gap-4 mt-4">
              <a
                href="https://www.instagram.com/istanbulmediterraneanlv/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-istanbulRed hover:text-istanbulRed-dark text-2xl"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.facebook.com/istanbulmediterraneanlv/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-istanbulRed hover:text-istanbulRed-dark text-2xl"
              >
                <FaFacebook />
              </a>
            </div>
          </div>
          {/* Contact Form */}
          <form
            className="bg-offwhite p-8 rounded-xl shadow-lg flex flex-col space-y-5 border border-saffron/10"
            onSubmit={async (e) => {
              e.preventDefault();
              setIsSubmitting(true);
              setError("");

              try {
                // EmailJS configuration - using same service as careers
                const serviceId = "service_goau3zi";
                const templateId = "template_contact"; // Contact form template
                const publicKey = "b7bFs-5rAi-9caqhn";

                const formData = new FormData(e.target);
                const templateParams = {
                  from_name: formData.get("name"),
                  from_email: formData.get("email"),
                  message: formData.get("message"),
                  to_email: "istanbulinvegas@gmail.com",
                };

                await emailjs.send(
                  serviceId,
                  templateId,
                  templateParams,
                  publicKey
                );

                setSubmitted(true);
                e.target.reset();
                setTimeout(() => setSubmitted(false), 5000);
              } catch (error) {
                console.error("EmailJS Error:", error);
                setError(
                  "Failed to send message. Please try again or contact us directly."
                );
              } finally {
                setIsSubmitting(false);
              }
            }}
          >
            <h2 className="text-lg font-semibold mb-2 text-istanbulRed">
              Send Us a Message
            </h2>
            <div className="relative">
              <input
                type="text"
                name="name"
                id="contact-name"
                className="peer border-b-2 border-gray-300 bg-transparent w-full px-1 py-3 focus:outline-none focus:border-istanbulRed transition-colors"
                required
              />
              <label
                htmlFor="contact-name"
                className="absolute left-1 top-0 text-gray-400 text-sm transition-all peer-focus:-top-5 peer-focus:text-xs peer-focus:text-istanbulRed peer-valid:-top-5 peer-valid:text-xs pointer-events-none"
              >
                Your Name
              </label>
            </div>
            <div className="relative">
              <input
                type="email"
                name="email"
                id="contact-email"
                className="peer border-b-2 border-gray-300 bg-transparent w-full px-1 py-3 focus:outline-none focus:border-istanbulRed transition-colors"
                required
              />
              <label
                htmlFor="contact-email"
                className="absolute left-1 top-0 text-gray-400 text-sm transition-all peer-focus:-top-5 peer-focus:text-xs peer-focus:text-istanbulRed peer-valid:-top-5 peer-valid:text-xs pointer-events-none"
              >
                Your Email
              </label>
            </div>
            <div className="relative">
              <textarea
                name="message"
                id="contact-message"
                rows="4"
                className="peer border-b-2 border-gray-300 bg-transparent w-full px-1 py-3 focus:outline-none focus:border-istanbulRed transition-colors resize-none"
                required
              ></textarea>
              <label
                htmlFor="contact-message"
                className="absolute left-1 top-0 text-gray-400 text-sm transition-all peer-focus:-top-5 peer-focus:text-xs peer-focus:text-istanbulRed peer-valid:-top-5 peer-valid:text-xs pointer-events-none"
              >
                Your Message
              </label>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>
            {error && (
              <div className="text-red-600 text-center mt-2">{error}</div>
            )}
            {submitted && (
              <div className="text-green-600 text-center mt-2">
                Thank you! Your message has been received.
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Find Us Section */}
      <section className="py-16 bg-white text-center border-t border-saffron/20 mt-12">
        <h2 className="text-3xl font-extrabold mb-6 text-primary">Find Us</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-4xl mx-auto">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 text-herb justify-center">
              <FaMapMarkerAlt className="text-saffron text-2xl" />
              <span className="font-bold text-lg">
                3615 S Las Vegas Blvd #101, Las Vegas, NV 89109
              </span>
            </div>
            <div className="flex items-center gap-2 mb-2 text-charcoal justify-center">
              <FaClock className="text-istanbulRed text-xl" />
              <span>Open: 10:00 am - 5:00 am daily</span>
            </div>
            <a
              href="tel:+17259008844"
              className="block mt-2 text-lg text-istanbulRed underline font-bold"
            >
              (725) 900-8844
            </a>
            <div className="mt-4">
              <a
                href="https://maps.app.goo.gl/CyiQeyNp4X5PLDbL6"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                View on Google Maps
              </a>
            </div>
          </div>
          <div className="flex-1 mt-8 md:mt-0">
            <iframe
              title="Istanbul Mediterranean Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3311.049263648682!2d-115.17192338479302!3d36.12084618008743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c8c439e1e1e1e1%3A0x4e2a0f1c2c7e1e1e!2s3615%20S%20Las%20Vegas%20Blvd%20%23101%2C%20Las%20Vegas%2C%20NV%2089109%2C%20USA!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
              width="100%"
              height="260"
              style={{
                border: 0,
                borderRadius: "1rem",
                boxShadow: "0 2px 16px rgba(0,0,0,0.10)",
              }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}
