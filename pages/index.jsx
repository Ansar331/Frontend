import Layout from '../components/layout';
import { Analytics } from '@vercel/analytics/react';

function Home() {
  const handlePageChange = () => {
    window.location.href = './improve';
  };

  return (
    <Layout>
      <Analytics />
      <div className="bg-indigo-100 py-6 md:py-12">
        <div className="container px-4 mx-auto">

          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-medium mb-2">Здесь вы можете получить лучшее резюме!</h1>
            <button className="bg-indigo-600 text-white py-2 px-6 rounded-full text-xl mt-6" onClick={handlePageChange}>Get Started</button>
          </div>

          <div className="md:flex md:flex-wrap md:-mx-4 mt-6 md:mt-12">
            <div className="md:w-1/2 lg:w-1/4 md:px-4 xl:px-6 mt-8 md:mt-0 text-center">
              <span className="w-20 border-t-2 border-solid border-indigo-200 inline-block mb-3"></span>
              <h5 className="text-xl font-medium uppercase mb-4">Improve Resume</h5>
              <p className="text-gray-600">"Improve Resume" принимает ваше резюме и желаемую должность и на основании этого возвращает улучшенное резюме, соответствующее вашей должности и требованиям компании.</p>
            </div>

            <div className="md:w-1/2 lg:w-1/4 md:px-4 xl:px-6 mt-8 md:mt-0 text-center">
              <span className="w-20 border-t-2 border-solid border-indigo-200 inline-block mb-3"></span>
              <h5 className="text-xl font-medium uppercase mb-4">Analysis Resume</h5>
              <p className="text-gray-600">"Analysis Resume" принимает ваше резюме и проводит анализ, информируя вас о его качестве и предоставляя рекомендации и советы.</p>
            </div>

            <div className="md:w-1/2 lg:w-1/4 md:px-4 xl:px-6 mt-8 md:mt-0 text-center">
              <span className="w-20 border-t-2 border-solid border-indigo-200 inline-block mb-3"></span>
              <h5 className="text-xl font-medium uppercase mb-4">Profession Resume</h5>
              <p className="text-gray-600">"Profession Resume" - на этой странице вы можете получить список подходящих вам профессий на основе вашего резюме.</p>
            </div>

            <div className="md:w-1/2 lg:w-1/4 md:px-4 xl:px-6 mt-8 md:mt-0 text-center">
              <span className="w-20 border-t-2 border-solid border-indigo-200 inline-block mb-3"></span>
              <h5 className="text-xl font-medium uppercase mb-4">Request History</h5>
              <p className="text-gray-600">"Request History" - на этой странице вы можете увидеть все ваши предыдущие запросы, сделанные из вашей учетной записи.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
