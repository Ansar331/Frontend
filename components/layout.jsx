import Header from './header';
import Footer from './footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow mt-16 px-4 mb-32">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
