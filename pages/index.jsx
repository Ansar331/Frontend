import Layout from '../components/layout';

function Home() {
  const handlePageChange = () => {
    window.location.href = './improve';
  };
    return (
        <Layout>
            <div class="bg-indigo-100 py-6 md:py-12">
    <div class="container px-4 mx-auto">

      <div class="text-center max-w-2xl mx-auto">
        <h1 class="text-3xl md:text-4xl font-medium mb-2">Here you can get the best resume!</h1>
        <button class="bg-indigo-600 text-white py-2 px-6 rounded-full text-xl mt-6" onClick={handlePageChange}>Get Started</button>
        <div class="mt-4">
        </div>
      </div>

      <div class="md:flex md:flex-wrap md:-mx-4 mt-6 md:mt-12">

        <div class="md:w-1/4 md:px-4 xl:px-6 mt-8 md:mt-0 text-center">
          <span class="w-20 border-t-2 border-solid border-indigo-200 inline-block mb-3"></span>
          <h5 class="text-xl font-medium uppercase mb-4">Improve Resume</h5>
          <p class="text-gray-600">"Improve Resume" берет ваше резюме и желаемую должность, а затем, основываясь на этих данных, возвращает вам улучшенное резюме, соответствующее вашей должности и требованиям компании.</p>
        </div>

        <div class="md:w-1/4 md:px-4 xl:px-6 mt-8 md:mt-0 text-center">
          <span class="w-20 border-t-2 border-solid border-indigo-200 inline-block mb-3"></span>
          <h5 class="text-xl font-medium uppercase mb-4">Analysis Resume</h5>
          <p class="text-gray-600">"Analysis Resume" получает ваше резюме и проводит его анализ, сообщая вам, насколько качественное оно, и предоставляет вам рекомендации и советы.
</p>
        </div>

        <div class="md:w-1/4 md:px-4 xl:px-6 mt-8 md:mt-0 text-center">
          <span class="w-20 border-t-2 border-solid border-indigo-200 inline-block mb-3"></span>
          <h5 class="text-xl font-medium uppercase mb-4">Profession Resume</h5>
          <p class="text-gray-600">"Profession Resume" - на этой странице вы можете получить список профессий, которые подходят вам на основе вашего резюме.</p>
        </div>

        <div class="md:w-1/4 md:px-4 xl:px-6 mt-8 md:mt-0 text-center">
          <span class="w-20 border-t-2 border-solid border-indigo-200 inline-block mb-3"></span>
          <h5 class="text-xl font-medium uppercase mb-4">Request History</h5>
          <p class="text-gray-600">"Request History" - на этой странице вы можете увидеть все ваши предыдущие запросы, которые были сделаны с вашего аккаунта.</p>
        </div>

      </div>

    </div>
  </div>
        </Layout>
    );
};

export default Home;