import { FaCrown, FaVolumeUp } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-yellow-500/20">

      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3 text-yellow-400"
        >
          <FaCrown className="text-3xl" />

          <h1
            className="text-3xl font-bold"
            style={{ fontFamily: "Cinzel" }}
          >
            Baahubali Quiz
          </h1>

        </Link>

        {/* Menu */}

        <div className="hidden md:flex gap-10 text-lg">

          <a href="#home" className="hover:text-yellow-400 transition">
            Home
          </a>

          <a href="#features" className="hover:text-yellow-400 transition">
            Features
          </a>

          <a href="#about" className="hover:text-yellow-400 transition">
            About
          </a>

        </div>

        {/* Sound */}

        <button className="text-yellow-400 hover:scale-110 transition">
          <FaVolumeUp className="text-2xl" />
        </button>

      </div>

    </nav>
  );
}

export default Navbar;