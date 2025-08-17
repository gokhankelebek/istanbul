import React, { useState, useRef, useEffect } from 'react';
import { FaTimes, FaComments, FaPaperPlane } from 'react-icons/fa';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Merhaba! Welcome to Istanbul Mediterranean! How can I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Restaurant knowledge base - All information verified from codebase
  const restaurantInfo = {
    hours: {
      keywords: ['hours', 'open', 'close', 'time', 'when'],
      response: 'We are open every day from 10:00 AM to 5:00 AM! Yes, that\'s 19 hours of delicious Turkish & Mediterranean food! 🕐'
    },
    location: {
      keywords: ['location', 'where', 'address', 'find', 'located', 'directions'],
      response: 'We\'re located at 3615 S Las Vegas Blvd #101, Las Vegas, NV 89109. Right on the Las Vegas Strip! 📍'
    },
    phone: {
      keywords: ['phone', 'call', 'number', 'contact'],
      response: 'You can call us at (725) 900-8844. We\'d love to hear from you! 📞'
    },
    menu: {
      keywords: ['menu', 'food', 'eat', 'dishes', 'serve', 'cuisine'],
      response: 'We serve authentic Turkish & Mediterranean cuisine! Our menu includes:\n🥙 Döner (Shawarma) - Beef&Lamb ($15.95-$20.95), Chicken ($15.95-$20.95), or Mixed ($16.95-$21.95)\n🧆 Falafel options ($15.95-$20.95)\n🥗 Rice Bowls, Salad Bowls, Fries Bowls\n🥖 Wraps, Pitas, and Turkish Pitas\n\nCheck our full menu at orderdoner.com!'
    },
    whatishalal: {
      keywords: ['what is halal', 'halal mean', 'explain halal', 'halal definition'],
      response: 'Halal means "permissible" in Arabic. In food, it refers to ingredients and preparation methods that follow Islamic dietary laws: no pork, no alcohol, and meat must be processed according to specific guidelines. Istanbul Mediterranean is committed to serving 100% halal-certified cuisine. ☪️'
    },
    halal: {
      keywords: ['halal', 'pork', 'alcohol', 'muslim', 'certified'],
      response: 'Yes! We are 100% halal certified. We don\'t serve any pork or alcohol. All our meat is halal and prepared according to Islamic dietary laws. ☪️'
    },
    hiring: {
      keywords: ['hiring', 'job', 'career', 'work', 'employment', 'apply'],
      response: 'Yes, we\'re hiring! 🎯 Visit our careers page on the website to apply, or stop by in person to speak with a manager. Call (725) 900-8844 for more info about current openings.'
    },
    delivery: {
      keywords: ['delivery', 'deliver', 'order', 'online', 'uber', 'doordash', 'grubhub'],
      response: 'Yes! You can order online at orderdoner.com for pickup or delivery. We\'re also available on major delivery platforms. Delivery hours: 10 AM - 4:30 AM. Pickup available until 5 AM! 🚗'
    },
    catering: {
      keywords: ['catering', 'party', 'event', 'large order', 'wedding', 'corporate'],
      response: 'We offer catering for events of all sizes! 🎉 Perfect for parties, corporate events, weddings, and more. We work around your event needs with flexible scheduling. Call (725) 900-8844 to request a custom quote!'
    },
    vegan: {
      keywords: ['vegan', 'vegetarian', 'plant', 'no meat'],
      response: 'We have vegetarian and vegan options! 🌱 Try our Falafel dishes ($15.95-$20.95), Veggie Bowl ($9.95), Hummus ($5.95), and Stuffed Grape Leaves (4 pieces for $5.95). Check our menu for more plant-based options!'
    },
    glutenfree: {
      keywords: ['gluten', 'celiac', 'wheat', 'allergy'],
      response: 'We have gluten-free options! 🌾 Our rice bowls and salad bowls can be made gluten-free. Many of our sides like hummus are naturally gluten-free. Please inform our staff about any allergies when ordering.'
    },
    parking: {
      keywords: ['parking', 'park', 'car', 'valet'],
      response: 'We\'re located on the Las Vegas Strip at 3615 S Las Vegas Blvd #101. There are various parking options nearby including street parking and parking garages. 🚗'
    },
    popular: {
      keywords: ['popular', 'best', 'recommend', 'favorite', 'must try', 'suggestion'],
      response: 'Our popular items include the Mixed Döner options (Beef&Lamb and Chicken), available as wraps, pitas, bowls, and more! Don\'t forget to try our famous Baklava for dessert! 🌟'
    },
    spicy: {
      keywords: ['spicy', 'hot', 'mild', 'heat level'],
      response: 'We can adjust spice levels to your preference! 🌶️ Most dishes come mild by default. Just let your server know if you\'d like it spicier!'
    },
    dessert: {
      keywords: ['dessert', 'sweet', 'baklava', 'kunefe'],
      response: 'We serve authentic Turkish desserts including our famous Baklava! 🍰 Made with hand-stretched phyllo dough, premium Turkish pistachios or walnuts, clarified butter, and fragrant syrup. Check our menu for all dessert options!'
    },
    drinks: {
      keywords: ['drink', 'beverage', 'tea', 'coffee', 'ayran'],
      response: 'We serve a variety of beverages! 🥤 Soft drinks, juices, and traditional options available. No alcohol served - we\'re 100% halal!'
    },
    special: {
      keywords: ['special', 'deal', 'discount', 'promotion', 'happy hour'],
      response: 'Check our website and social media @istanbulmediterraneanlv for current specials and promotions! 🎯 We often have combo deals and special offers.'
    },
    authentic: {
      keywords: ['authentic', 'real', 'traditional', 'genuine'],
      response: 'We serve authentic Turkish & Mediterranean cuisine! 🇹🇷 Family-owned restaurant bringing traditional recipes and Turkish hospitality to Las Vegas. Every dish is made with care using quality ingredients.'
    },
    kids: {
      keywords: ['kids', 'children', 'family', 'kid menu'],
      response: 'We\'re family-friendly! 👨‍👩‍👧‍👦 We have options that kids enjoy like French Fries ($5.95) and can adjust portions for children. Our warm, welcoming atmosphere is perfect for families!'
    },
    healthy: {
      keywords: ['healthy', 'nutrition', 'calories', 'diet', 'fresh'],
      response: 'Mediterranean cuisine is naturally healthy! 🥗 We offer fresh salads, grilled meats, rice bowls, and vegetarian options. Our Veggie Bowl is only $9.95. All food is made fresh with quality ingredients!'
    },
    wait: {
      keywords: ['wait', 'busy', 'crowded', 'line', 'how long'],
      response: 'Wait times vary by time of day. ⏰ Order online at orderdoner.com for pickup to save time! Online orders are typically ready in about 20 minutes.'
    },
    reservation: {
      keywords: ['reservation', 'reserve', 'book', 'table', 'group'],
      response: 'We accept both walk-ins and reservations! 📅 For groups of 6 or more, we recommend calling ahead at (725) 900-8844. We also offer catering for larger events!'
    },
    takeout: {
      keywords: ['takeout', 'take out', 'to go', 'pickup'],
      response: 'Yes, we offer takeout! 📦 Call ahead at (725) 900-8844 or order online at orderdoner.com. Pickup orders are typically ready in about 20 minutes!'
    },
    history: {
      keywords: ['history', 'story', 'about', 'owner', 'background'],
      response: 'Istanbul Mediterranean was born from a passion for sharing the flavors and traditions of Turkey. Our family recipes are rooted in the bustling streets of Istanbul, passed down through generations and lovingly recreated in Las Vegas! 🇹🇷'
    },
    tourist: {
      keywords: ['tourist', 'visitor', 'hotel', 'nearby', 'vegas'],
      response: 'Perfect for Vegas visitors! 🎰 We\'re right on the Strip at 3615 S Las Vegas Blvd #101. Open late until 5 AM - great for after shows or late-night cravings! Authentic Mediterranean food away from typical tourist fare.'
    },
    portion: {
      keywords: ['portion', 'size', 'hungry', 'filling', 'enough'],
      response: 'Our portions are generous and filling. Great value for the quality and taste you get!'
    },
    fresh: {
      keywords: ['fresh', 'frozen', 'quality', 'ingredients'],
      response: 'Everything is made fresh! 🌿 We prepare our food daily with quality ingredients. Authentic Turkish & Mediterranean cuisine made with care!'
    },
    late: {
      keywords: ['late', 'night', 'midnight', '24 hours', 'after hours'],
      response: 'Late night hunger? We\'re open until 5 AM every day! 🌙 Full menu available all hours. Perfect after shows or a night out in Vegas. Delivery until 4:30 AM!'
    },
    review: {
      keywords: ['review', 'rating', 'yelp', 'google', 'tripadvisor'],
      response: 'We appreciate customer feedback! ⭐ Find us on Google, Yelp, and other review platforms. Loved your meal? Please leave us a review - it really helps our family business! 🙏'
    }
  };

  const findBestResponse = (input) => {
    const lowerInput = input.toLowerCase();
    
    // Check each category for keyword matches with scoring
    let bestMatch = null;
    let bestScore = 0;
    
    for (const [category, info] of Object.entries(restaurantInfo)) {
      let score = 0;
      info.keywords.forEach(keyword => {
        if (lowerInput.includes(keyword)) {
          score += keyword.split(' ').length; // Multi-word keywords get higher score
        }
      });
      
      if (score > bestScore) {
        bestScore = score;
        bestMatch = info.response;
      }
    }
    
    if (bestMatch) return bestMatch;
    
    // Default responses for common greetings
    if (lowerInput.match(/^(hi|hello|hey|merhaba|selam|salam)/)) {
      const greetings = [
        'Merhaba! Welcome to Istanbul Mediterranean! 🌟 What would you like to know?',
        'Hello! Welcome to the best Turkish food on the Strip! How can I help you today?',
        'Selam! Ready for some delicious Mediterranean food? What can I tell you about?'
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }
    
    if (lowerInput.match(/thank|thanks|teşekkür|shukran/)) {
      return 'You\'re very welcome! 😊 Is there anything else you\'d like to know about Istanbul Mediterranean?';
    }
    
    if (lowerInput.match(/bye|goodbye|see you|güle güle/)) {
      return 'Güle güle! (Goodbye!) We hope to see you soon at Istanbul Mediterranean! Don\'t forget to try our baklava! 👋';
    }
    
    if (lowerInput.match(/love|amazing|great|excellent|delicious/)) {
      return 'Thank you so much! We\'re so happy you enjoyed your experience! Please leave us a review and tell your friends! 🌟';
    }
    
    if (lowerInput.match(/complaint|bad|terrible|awful|disgusting/)) {
      return 'We\'re sorry to hear that. Your feedback is important to us. Please call our manager at (725) 900-8844 or email us so we can make it right. 🙏';
    }
    
    // Default response with suggestions
    const suggestions = [
      'I\'m not sure about that specific question, but I can help with:\n• Restaurant hours & location\n• Menu recommendations\n• Halal certification\n• Delivery options\n• Catering services\n\nWhat would you like to know? 🤔',
      'Hmm, I don\'t have that information, but feel free to call us at (725) 900-8844! Or ask me about our menu, hours, or delivery options! 📞',
      'Great question! While I don\'t have that specific answer, our staff at (725) 900-8844 would be happy to help. Or ask me about our popular dishes! 🥙'
    ];
    return suggestions[Math.floor(Math.random() * suggestions.length)];
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      // Add user message
      setMessages(prev => [...prev, { type: 'user', text: inputValue }]);
      setInputValue('');
      setIsTyping(true);
      
      // Simulate bot typing and response
      setTimeout(() => {
        const response = findBestResponse(inputValue);
        setMessages(prev => [...prev, { type: 'bot', text: response }]);
        setIsTyping(false);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 bg-istanbulRed hover:bg-istanbulRed-dark text-white rounded-full p-3 md:p-4 shadow-lg transition-all duration-300 z-50 touch-manipulation"
        aria-label="Toggle chat"
      >
        {isOpen ? <FaTimes size={20} className="md:w-6 md:h-6" /> : <FaComments size={20} className="md:w-6 md:h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-16 right-2 left-2 md:bottom-24 md:right-6 md:left-auto w-auto md:w-96 h-[75vh] md:h-[500px] bg-white rounded-lg shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="bg-istanbulRed text-white p-3 md:p-4 rounded-t-lg flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-base md:text-lg">Istanbul Mediterranean</h3>
              <p className="text-xs md:text-sm opacity-90">Ask us anything!</p>
            </div>
            <img 
              src="/favicon.ico" 
              alt="Istanbul Mediterranean" 
              className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white p-1"
              onError={(e) => e.target.style.display = 'none'}
            />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[80%] p-2 md:p-3 rounded-lg text-sm md:text-base ${
                    message.type === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 md:p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 md:px-4 py-2 border rounded-full focus:outline-none focus:border-primary text-sm md:text-base"
              />
              <button
                onClick={handleSend}
                className="bg-primary hover:bg-primary-dark text-white p-2 rounded-full transition-colors touch-manipulation"
                aria-label="Send message"
              >
                <FaPaperPlane size={16} className="md:w-[18px] md:h-[18px]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}