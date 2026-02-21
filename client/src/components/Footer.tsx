import { Link } from "react-router-dom";
import { Github, Instagram, LinkedinIcon, Mail, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="dark:bg-black bg-white text-secondary-foreground py-12">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* First Section - About Us */}
          <div>
            <h4 className="text-lg font-semibold mb-4">About Us</h4>
            <p className="text-sm text-muted-foreground">
              We are a leading learning platform dedicated to providing
              high-quality courses, internships, and career opportunities.
            </p>
            <div className="mt-4 flex space-x-4">
              <a
                href="https://www.linkedin.com/company/data-software-pvt-ltd-dspl/"
                className="hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/datasoftwarepvtltd?igsh=MzhjMXh0M2pxbWk3"
                className="hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/DATASOFTWAREPVTLTD"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Second Section - Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-primary transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="hover:text-primary transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Third Section - Courses & Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Courses & Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/courses"
                  className="hover:text-primary transition-colors"
                >
                  All Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/internships"
                  className="hover:text-primary transition-colors"
                >
                  Internships
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="hover:text-primary transition-colors"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Fourth Section - Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <a
                  href="mailto:datasoftwarepvtltd@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  datasoftwarepvtltd@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                {/* <Phone className="h-4 w-4 mr-2" /> */}
                <a
                  href="tel:+91 81209 98200"
                  className="hover:text-primary transition-colors"
                >
                  +91 81209 98200
                </a>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-and-conditions"
                  className="hover:text-primary transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          &copy; 2021 DSPL. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
