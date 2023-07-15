import Layout from '../components/layout';

function Home() {
  const handlePageChange = () => {
    window.location.href = './improve';
  };

  return (
    <Layout>
      <div className="bg-indigo-100 py-6 md:py-12">
        <div className="container px-4 mx-auto">

          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-medium mb-2">Here you can get the best resume!</h1>
            <button className="bg-indigo-600 text-white py-2 px-6 rounded-full text-xl mt-6" onClick={handlePageChange}>Get Started</button>
          </div>

          <div className="md:flex md:flex-wrap md:-mx-4 mt-6 md:mt-12">
            <div className="md:w-1/2 lg:w-1/4 md:px-4 xl:px-6 mt-8 md:mt-0 text-center">
              <span className="w-20 border-t-2 border-solid border-indigo-200 inline-block mb-3"></span>
              <h5 className="text-xl font-medium uppercase mb-4">Improve Resume</h5>
              <p className="text-gray-600">"Improve Resume" takes your resume and desired position, and based on that, returns an improved resume that matches your position and company requirements.</p>
            </div>

            <div className="md:w-1/2 lg:w-1/4 md:px-4 xl:px-6 mt-8 md:mt-0 text-center">
              <span className="w-20 border-t-2 border-solid border-indigo-200 inline-block mb-3"></span>
              <h5 className="text-xl font-medium uppercase mb-4">Analysis Resume</h5>
              <p className="text-gray-600">"Analysis Resume" takes your resume and performs an analysis, informing you of its quality and providing recommendations and advice.</p>
            </div>

            <div className="md:w-1/2 lg:w-1/4 md:px-4 xl:px-6 mt-8 md:mt-0 text-center">
              <span className="w-20 border-t-2 border-solid border-indigo-200 inline-block mb-3"></span>
              <h5 className="text-xl font-medium uppercase mb-4">Profession Resume</h5>
              <p className="text-gray-600">"Profession Resume" - on this page, you can get a list of professions that are suitable for you based on your resume.</p>
            </div>

            <div className="md:w-1/2 lg:w-1/4 md:px-4 xl:px-6 mt-8 md:mt-0 text-center">
              <span className="w-20 border-t-2 border-solid border-indigo-200 inline-block mb-3"></span>
              <h5 className="text-xl font-medium uppercase mb-4">Request History</h5>
              <p className="text-gray-600">"Request History" - on this page, you can see all your previous requests made from your account.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
