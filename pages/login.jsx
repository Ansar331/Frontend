import { useState } from 'react';
import Layout from '../components/layout';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image'
import b from '../images/b.png'
import { loginUser } from './/api';

// спросить насчет почему картинка не работает
const Login = () => {
  const { data: session } = useSession();
  const [isLogined, setIsLogined] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        email: email,
        password: password,
      };
      const response = await loginUser(userData);
      console.log(response); // Do something with the response if needed
      router.push('/');
      setIsLogined(true);
    } catch (error) {
      console.error(error.message);
      // Handle the error, e.g., display an error message to the user
    }
  };

  const handleGoogleSignIn = () => {
    signIn('google');
  };

  const handleSignOut = () => {
    signOut();
  };
  if (!session || isLogined){
  return (
    <Layout>
      <div className="flex justify-center items-center h-screen">
        <form onSubmit={handleSubmit} className="w-1/3 bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4" style={{ marginTop: '-400px' }}>
          <h2 className="text-2xl font-bold mb-6">Авторизация</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Введите ваш email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Введите ваш пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Авторизоваться
            </button>
          </div>
          <div className="flex items-center justify-center mt-4">
            <button
              type="button"
              className="flex items-center justify-center bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
              onClick={handleGoogleSignIn}
            >
              <Image src={b} className="w-6 h-6 mr-2" />
              <span className="text-gray-700 font-semibold">Login with Google</span>
            </button>
          </div>
        </form>
      </div>
    </Layout>

  );
}else {
    router.push('/');
  }
};

export default Login;
export { Login };