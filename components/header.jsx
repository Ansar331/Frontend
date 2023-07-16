import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

function Header() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogout = () => {
    signOut();
  };

  const handleGoogleSignin = () => {
    signIn('google');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="header-2">
      <nav className="bg-white py-2 md:py-4">
        <div className="container px-4 mx-auto md:flex md:items-center">
          <div className="flex justify-between items-center">
            <a href="/" className="font-bold text-xl text-indigo-600">
              Resume Corrector
            </a>
            <button
              className="border border-solid border-gray-600 px-3 py-1 rounded text-gray-600 opacity-50 hover:opacity-75 md:hidden"
              id="navbar-toggle"
              onClick={toggleMobileMenu}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>

          <div
            className={`${
              isMobileMenuOpen ? '' : 'hidden'
            } md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0`}
            id="navbar-collapse"
          >
            <a
              href="/"
              className="p-2 lg:px-4 md:mx-2 text-white rounded bg-indigo-600"
            >
              Home
            </a>
            <a
              href="/improve"
              className="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300"
            >
              Improve
            </a>
            <a
              href="/analysis"
              className="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300"
            >
              Analysis
            </a>
            <a
              href="/profession"
              className="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300"
            >
              Profession
            </a>
            <a
              href="/request_history"
              className="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300"
            >
              Request History
            </a>
          </div>

          {session && (
            <div className="flex items-center mr-2">
              <img
                src={session.user.image}
                alt={session.user.name}
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="p-2 lg:px-4 md:mx-2 text-gray-600 rounded transition-colors duration-300">
                {session.user.email}
              </span>
            </div>
          )}

          {session ? (
            <button
              onClick={handleLogout}
              className="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-solid border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1"
            >
              Log out
            </button>
          ) : (
            <button
              onClick={handleGoogleSignin}
              className="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-solid border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1"
            >
              Login
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;
