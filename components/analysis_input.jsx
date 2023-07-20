import { useState } from 'react';
import { analyzeResume } from '/pages/api';
import { useSession } from 'next-auth/react';

const Analysis = () => {
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState('');
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const user_id = (session && session.user.email) ? session.user.email : "";

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      // Prepare the file data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('user_id', user_id);

      // Send data to API for processing
      const response = await analyzeResume(formData);

      // Set the processed output
      setOutput(response.message);
    } catch (error) {
      // Handle error
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-8 w-4/5 md:w-1/3 mx-auto bg-white shadow-md rounded px-8 py-6">
        <h2 className="text-2xl font-bold mb-6">Сделать анализ резюме!</h2>
        <div className="mb-4">
          <label htmlFor="file" className="block text-gray-700 text-sm font-bold mb-2">
            Загрузите ваше резюме:
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="flex items-center justify-center md:justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full md:w-auto"
          >
            {isLoading ? 'Печатает...' : 'Отправить'}
          </button>
        </div>
      </form>
      {/* End of form */}

      {/* Result text */}
      {output && (
        <div className="mt-8 w-4/5 md:w-1/3 mx-auto">
          <h2 className="text-2xl font-bold mb-2">Результат</h2>
          <p>{output}</p>
        </div>
      )}
      <style jsx>{`
        .min-h-screen {
          min-height: 50vh; /* Adjust the value as needed */
        }
      `}</style>
    </div>
  );
};

export default Analysis;
