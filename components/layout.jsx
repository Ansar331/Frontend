import Header from './header';
import Footer from './footer';

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            <main className="mt-16 px-4">{children}</main>
            {/* Add footer or other layout elements */}
            <Footer />
        </div>
    );
};

export default Layout;
