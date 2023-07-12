import { useState } from 'react';
import Layout from '../components/layout';
import { useRouter } from 'next/router';
import { registerUser } from './/api';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(true); 
  const router = useRouter();


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userData = { email, password };
      const response = await registerUser(userData);
      console.log(response); // Обработка успешной 
      setIsRegister(true)
      router.push('/login');
    } catch (error) {
      setIsRegister(false);
      console.error(error); // Обработка ошибок регистрации
    }
  };

  return (
    <Layout>
    <div className="flex justify-center items-center h-screen">

      <form onSubmit={handleRegister} className="w-1/3 bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4" style={{ marginTop: '-400px' }}>
        <h2 className="text-2xl font-bold mb-6">Регистрация</h2>
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
            Зарегистрироваться
          </button>
        </div>
        {!isRegister && (
        <h1>Неверно! Введите данные занова!</h1>
      )}
      </form>
    </div>
    </Layout>
  );
};

export default RegisterPage;