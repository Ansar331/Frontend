import { useState } from 'react';
import { professionResume } from '/pages/api';
import { useSession } from 'next-auth/react';

const formatOutput = (message) => {
  const urlRegex = /(https?:\/\/hh\.ru\/vacancy\/\d+)/g;
  const urls = message.match(urlRegex) || [];

  let formattedMessage = message;
  urls.forEach((url) => {
    const formattedUrl = url.replace(/"/g, "");
    formattedMessage = formattedMessage.replace(url, `<a href="${formattedUrl}" class="text-blue-500 underline hover:text-blue-700">${formattedUrl}</a>`);
  });

  return `<span class="text-gray-500">${formattedMessage}</span>`;
};

const Profession = () => {
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
      const response = await professionResume(resumeData);

      setOutput(formatOutput(response.message));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-1/3 bg-white shadow-md rounded px-8 py-6" style={{ marginTop: '-300px' }}>
        <h2 className="text-2xl font-bold mb-6">Получить профессию под ваше резюме!</h2>

        <div className="mb-4">
          <label htmlFor="data" className="block text-gray-700 text-sm font-bold mb-2">
            Вставьте сюда ваше резюме:
          </label>
          <textarea
            id="data"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Введите данные"
            value={data}
            onChange={handleDataChange}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {isLoading ? 'Печатает...' : 'Отправить'}
          </button>
        </div>
      </form>

      {output && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-2">Список подходящих вам профессий</h2>
          <div dangerouslySetInnerHTML={{ __html: output }} />
        </div>
      )}
    </div>
  );
};

export default Profession;
