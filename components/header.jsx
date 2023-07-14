import { useSession, signIn, signOut } from 'next-auth/react';

function Header() {
  const { data: session } = useSession();
  const handleLogout = () => {
    signOut();
  };
  const handleGoogleSignIn = () => {
    signIn('google');
  };
  return (
    <div className="header-2">
      <nav className="bg-white py-2 md:py-4">
        <div className="container px-4 mx-auto lg:flex lg:items-center">

          <div className="flex justify-between items-center lg:w-auto">
            <a href="/" className="font-bold text-xl text-indigo-600">Resume Corrector</a>
            <button className="border border-solid border-gray-600 px-3 py-1 rounded text-gray-600 opacity-50 hover:opacity-75 lg:hidden" id="navbar-toggle">
              <i className="fas fa-bars"></i>
            </button>
          </div>

          <div className="hidden lg:flex lg:flex-col lg:ml-auto mt-3 lg:mt-0" id="navbar-collapse">
            <a href="/" className="p-2 px-2 lg:px-4 text-white rounded bg-indigo-600">Home</a>
            <a href="/improve" className="p-2 px-2 lg:px-4 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">Improve</a>
            <a href="/analysis" className="p-2 px-2 lg:px-4 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">Analysis</a>
            <a href="/profession" className="p-2 px-2 lg:px-4 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">Profession</a>
            <a href="/request_history" className="p-2 px-2 lg:px-4 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">Request History</a>
          </div>

          {session && (
            <div className="flex items-center lg:mr-2">
              <img
                src={session.user.image}
                alt={session.user.name}
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="p-2 px-2 lg:px-4 text-gray-600 rounded transition-colors duration-300">{session.user.email}</span>
            </div>
          )}

          {session ? (
            <button
              onClick={handleLogout}
              className="p-2 px-2 lg:px-4 text-indigo-600 text-center border border-solid border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition-colors duration-300 mt-1 lg:mt-0 lg:ml-1"
            >
              Log out
            </button>
          ) : (
            <button
              onClick={handleGoogleSignIn}
              className="p-2 px-2 lg:px-4 text-indigo-600 text-center border border-solid border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition-colors duration-300 mt-1 lg:mt-0 lg:ml-1"
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
