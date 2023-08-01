import { useState, useRef, useEffect } from 'react';
import { professionResume } from '/pages/api';
import { useSession } from 'next-auth/react';

const Profession = () => {
  const [data, setData] = useState(null);
  const [output, setOutput] = useState('');
  const [links, setLinks] = useState('');
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const user_id = session?.user?.email || ' ';

  const formRef = useRef(null);
  const iframeRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setData(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append('file', data);
      formData.append('user_id', user_id);

      const response = await professionResume(formData);
      
      setOutput(response.message);
      setLinks(response.links);
      // Clear the file input after successful submission
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    adjustFormHeight();
  }, [output]);

  const adjustFormHeight = () => {
    if (formRef.current) {
      formRef.current.style.height = `${formRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    // Update the iframe source when the data (uploaded file) changes
    if (data && iframeRef.current) {
      const fileReader = new FileReader();
      fileReader.onload = function () {
        iframeRef.current.src = fileReader.result;
      };
      fileReader.readAsDataURL(data);
    }
  }, [data]);

  return (
    <div className="flex flex-col justify-between items-center py-16">
      <div className="flex flex-col justify-start items-center">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white shadow-md rounded px-8 py-6"
        >
          <h2 className="text-2xl font-bold mb-6">Получить профессию под ваше резюме!</h2>

          <div className="mb-4">
            <label htmlFor="data" className="block text-gray-700 text-sm font-bold mb-2">
              Загрузите ваше резюме:
            </label>
            <input
              type="file"
              id="data"
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
            <div dangerouslySetInnerHTML={{ __html: output }} />
          </div>
        )}
        {links && (
          <div className="mt-8 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-2 text-blue-500">Ссылки на вакансии</h2>
            <div dangerouslySetInnerHTML={{ __html: `<div style="color: blue; text-decoration: underline;">${links}</div>` }} />
          </div>
        )}
        
        {(data || output) && (
          <iframe
            ref={iframeRef}
            title="Uploaded File"
            className="mt-8"
            width="100%"
            height="700px"
            frameBorder="0"
            src={output ? iframeRef.current?.src : ''}
          />
        )}
      </div>

      {/* Add your footer or other content here */}
    </div>
  );
};

export default Profession;
