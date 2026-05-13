import { FaCoffee, FaFacebookF, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0f172a] text-slate-400 font-sans">

      {/* top wave divider */}
      <div className="w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-12 fill-gray-50">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center text-white shrink-0">
              <FaCoffee size={16} />
            </div>
            <span className="text-white font-extrabold text-xl tracking-tight">The Daily Feast</span>
          </div>
          <p className="text-sm leading-relaxed">
            Connecting food lovers with the best local cafes. Browse menus, discover flavors, and find your next favorite spot.
          </p>
          <div className="flex gap-3 pt-1">
            {[
              { icon: <FaFacebookF size={13} />, href: "#" },
              { icon: <FaTwitter size={13} />,   href: "#" },
              { icon: <FaInstagram size={13} />, href: "#" },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-orange-500 flex items-center justify-center text-white transition-colors duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="text-white font-bold uppercase tracking-widest text-xs">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[
              { label: "Home",            to: "/" },
              { label: "Browse Cafes",    to: "/" },
              { label: "Login",           to: "/login" },
              { label: "Request Account", to: "/contact-admin" },
            ].map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  className="hover:text-orange-400 transition-colors flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h4 className="text-white font-bold uppercase tracking-widest text-xs">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-orange-400 mt-0.5 shrink-0" />
              <span>Bole Road, Addis Ababa, Ethiopia</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhone className="text-orange-400 shrink-0" />
              <span>+251 911 234 567</span>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-orange-400 shrink-0" />
              <span>hello@thedailyfeast.et</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="space-y-4">
          <h4 className="text-white font-bold uppercase tracking-widest text-xs">Own a Cafe?</h4>
          <p className="text-sm leading-relaxed">
            List your cafe on our platform and reach hundreds of food lovers every day.
          </p>
          <button
            onClick={() => navigate("/contact-admin")}
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-5 py-2.5 rounded-full transition-all hover:-translate-y-0.5 shadow-lg shadow-orange-500/20"
          >
            Get Started →
          </button>
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-white/10 py-5 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>© {year} The Daily Feast. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
