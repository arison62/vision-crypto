import { useLang } from "@/context/lang-context";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";


const Footer = () => {
  const { messages } = useLang();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      data-lang-id="footer"
      className="bg-emerald-900 text-white mt-20 py-8 "
    >
      <div className="max-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {messages.footer.about.title}
            </h3>
            <p className="text-gray-300 mb-4">
              {messages.footer.about.description}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {messages.footer.contact.title}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-gray-300 mt-0.5" />
                <span className="text-gray-300">contact@example.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-gray-300 mt-0.5" />
                <span className="text-gray-300">+237 650 018 856</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-300 mt-0.5" />
                <span className="text-gray-300">
                  Akwa
                  <br />
                  Bafoussam, Cameroun
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {messages.footer.newsletter.title}
            </h3>
            <p className="text-gray-300 mb-4">
              {messages.footer.newsletter.description}
            </p>
            <form className="space-y-2">
              <div>
                <input
                  type="email"
                  placeholder={messages.footer.newsletter.input_placeholder}
                  className="w-full px-3 py-2 text-gray-900 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-3 py-2 text-white bg-emerald-700 rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
              >
                {messages.footer.newsletter.button_text}
              </button>
            </form>
          </div>
          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {messages.footer.social_media.title}
            </h3>
            <p className="text-gray-300">{messages.footer.social_media.description}</p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-gray-300 hover:text-white transition-colors" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 text-gray-300 hover:text-white transition-colors" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-gray-300 hover:text-white transition-colors" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="aedIn"
              >
                <a className="h-5 w-5 text-gray-300 hover:text-white transition-colors" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5 text-gray-300 hover:text-white transition-colors" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-emerald-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © {currentYear} {"  "} {messages.footer.reserved_right.text}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
