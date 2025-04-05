import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-100 py-10 border-t border-gray-300">
      <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row justify-around items-center gap-8">
        
        {/* Logo & Copyright */}
        <div className="text-center lg:text-left">
          <img src="/Logo.webp" alt="CTRL+WIN Logo" className="w-28 h-auto mx-auto lg:mx-0 mb-3" />
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} CTRL+WIN – Empowering Students, One Click at a Time.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center lg:text-start">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-600 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-base text-gray-700 hover:text-blue-600 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/" className="text-base text-gray-700 hover:text-blue-600 transition">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/" className="text-base text-gray-700 hover:text-blue-600 transition">
                Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <Link to="/" className="text-base text-gray-700 hover:text-blue-600 transition">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
