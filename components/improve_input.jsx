import { useState, useRef } from 'react';
import { improveResume } from '/pages/api';
import { useSession } from 'next-auth/react';

const MyForm = () => {
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const user_id = (session && session.user.email) ? session.user.email : ' ';

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('user_id', user_id);

      const response = await improveResume(formData);

      setOutput(response.message);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    const outputText = outputRef.current.textContent;

    const htmlContent = `
      <html>
        <head>
          <title>Resume Output</title>
        </head>
        <body>
          <pre>${outputText}</pre>
        </body>
      </html>
    `;

    const options = {
      margin: 10,
      filename: 'resume_output.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    import('html2pdf.js').then(({ default: html2pdf }) => {
      html2pdf().from(htmlContent).set(options).save();
    });
  };

  const outputRef = useRef(null);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-4/5 md:w-1/3 bg-white shadow-md rounded px-8 py-6"
      >
        <h2 className="text-2xl font-bold mb-6">Улучшить резюме!</h2>

        <div className="mb-4">
          <label htmlFor="file" className="block text-gray-700 text-sm font-bold mb-2">
            Выберите PDF файл:
          </label>
          <input
            type="file"
            id="file"
            accept=".pdf"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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

      {output && (
        <div className="mt-8 w-4/5 md:w-1/3">
          <h2 className="text-2xl font-bold mb-2">Вывод данных</h2>
          <p ref={outputRef}>{output}</p>
          <button
            id="download-pdf-button"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-4"
            onClick={handleDownloadPDF}
          >
            Скачать PDF
          </button>
        </div>
      )}

      <div className="flex-grow"></div>
      <style jsx>{`
        .min-h-screen {
          min-height: 50vh;
        }
      `}</style>
    </div>
  );
};

export default MyForm;
