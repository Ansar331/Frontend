import { useState } from 'react';
import { analyzeResume } from '/pages/api';
import { useSession } from 'next-auth/react';

const Analysis = () => {
  const [data, setData] = useState('');
  const [output, setOutput] = useState('');
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const user_id = (session && session.user.email) ? session.user.email : "";

  const handleDataChange = (e) => {
    setData(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const resumeData = { data, user_id };
      const response = await analyzeResume(resumeData);

      setOutput(response.message);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-col items-center justify-start p-4 h-full">
      <form onSubmit={handleSubmit} className="w-full bg-white shadow-md rounded px-8 py-6">
        <h2 className="text-2xl font-bold mb-6">Сделать анализ резюме!</h2>

        <div className="mb-4">
          <label htmlFor="data" className="block text-gray-700 text-sm font-bold mb-2">
            Вставьте сюда ваше резюме:
          </label>
          <textarea
            id="data"
            className="shadow appearance-none border rounded w-full resize-none py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Введите данные"
            value={data}
            onChange={handleDataChange}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            {isLoading ? 'Печатает...' : 'Отправить'}
          </button>
        </div>
      </form>

      {output && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Результат</h2>
          <p>{output}</p>
        </div>
      )}
    </div>
  );
};

export default Analysis;
