import React from "react";

import {
  MapPin,
  Phone,
  Mail,
  Send,
} from "lucide-react";

const Footer = () => (
  <footer className="bg-[#e18181] text-white py-10">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-5">
      {/* Logo and Contact */}
      <div>
        <img src="/assets/D-code-logo.png" alt="D-CODE Logo" className="mb-4 w-40"/>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <MapPin size={16} className="mt-1" />
            <span>
              99 New Theme St, KY, USA 12345,<br />
              Beside the Sun point land.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} />
            <span>+00 123-456-789</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} />
            <span>demo@example.com</span>
          </div>
        </div>
      </div>

      {/* Get to Know Us */}
      <div>
        <div className="font-serif text-lg mb-3">Get to know Us</div>
        <ul className="space-y-1 text-sm">
          <li>About Us</li>
          <li>Term & Policy</li>
          <li>Careers</li>
          <li>News & Blog</li>
          <li>Contact Us</li>
        </ul>
      </div>

      {/* Information */}
      <div>
        <div className="font-serif text-lg mb-3">Information</div>
        <ul className="space-y-1 text-sm">
          <li>Help Center</li>
          <li>Feedback</li>
          <li>FAQs</li>
          <li>Size Guide</li>
          <li>Payments</li>
        </ul>
      </div>

      {/* Get Latest Updates (Newsletter) */}
      <div>
        <div className="font-serif text-lg mb-3">Get Latest Updates</div>
        <p className="text-xs mb-2">
          Enter your email below to be the first to know about new collections and product launches.
        </p>
        <form className="flex items-center bg-white rounded-md overflow-hidden">
          <input
            className="flex-1 p-2 text-gray-800 outline-none"
            type="email"
            placeholder="Your email address"
          />
          <button
            type="submit"
            className="px-3 py-2 text-[#e18181] hover:bg-[#f3abab] transition"
            title="Subscribe"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  </footer>
);

export default Footer;
