import { useState } from 'react';
import { professionResume } from '/pages/api';
import { useSession } from 'next-auth/react';

const Profession = () => {
  const [data, setData] = useState(null); // Change initial state to null
  const [output, setOutput] = useState('');
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const user_id = session?.user?.email || '';

  const handleFileChange = (e) => {
    // Access the selected file from the input element
    const selectedFile = e.target.files[0];
    setData(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      // Create a FormData object to send the file along with other data
      const formData = new FormData();
      formData.append('file', data);
      formData.append('user_id', user_id);

      const response = await professionResume(formData);

      setOutput(response.message);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white shadow-md rounded px-8 py-6">
        <h2 className="text-2xl font-bold mb-6">Получить профессию под ваше резюме!</h2>

        <div className="mb-4">
          <label htmlFor="data" className="block text-gray-700 text-sm font-bold mb-2">
            Загрузите ваше резюме:
          </label>
          <input
            type="file" // Change the input type to "file"
            id="data"
            accept=".pdf"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleFileChange}
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
        <div className="mt-8 w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-2">Список подходящих вам профессий</h2>
          <div>
            <div
              dangerouslySetInnerHTML={{ __html: output }}
              className="text-blue-500 underline hover:text-blue-700"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profession;
