import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const RequestPage = () => {
  const [query, setQuery] = useState('');
  const { data: session } = useSession();
  const [queries, setQueries] = useState([]);
  const [load, setLoad] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const user_id = (session && session.user.email) ? session.user.email : "";

  const fetchQueries = async () => {
    try {
      const response = await axios.get(`https://resume-corrector.onrender.com/queries/${user_id}`);
      setQueries(response.data.queries);
      setTotalPages(Math.ceil(response.data.queries.length / 5));
    } catch (error) {
      console.error('Failed to fetch queries:', error);
    }
  };

  useEffect(() => {
    if (user_id !== "" && load) {
      fetchQueries();
      setLoad(false);
    }
  }, [user_id, load]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://resume-corrector.onrender.com/queries', { user_id, query });
      console.log('Query saved successfully');
      setQuery('');
      fetchQueries();
    } catch (error) {
      console.error('Failed to save query:', error);
    }
  };

  const handleDelete = async (queryToDelete) => {
    try {
      await axios.delete('https://resume-corrector.onrender.com/queries', { data: { user_id, query: queryToDelete } });
      console.log('Query deleted successfully');
      fetchQueries();
    } catch (error) {
      console.error('Failed to delete query:', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (session) {
    const startIndex = (currentPage - 1) * 5;
    const endIndex = startIndex + 5;
    const paginatedQueries = queries.slice(startIndex, endIndex);

    return (
      <div className="w-1/2 mx-auto mt-12">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet"></link>
        <h1 className="text-xl font-bold mb-2">История Запросов</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          {/* Your form elements here, if needed */}
        </form>
        <ul className="list-disc pl-6">
          {paginatedQueries.map((query, index) => (
            <li key={index} className="text-gray-700 py-2 border-b">
              {query} <br></br>
              <button type="button" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(query)}>
                <i className="fas fa-trash"></i> {/* Иконка корзины из Font Awesome */} Delete
              </button>
            </li>
          ))}
        </ul>
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`mx-1 p-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center h-80">
        <p className="text-2xl font-bold">Please log in.</p>
      </div>
    );
  }
};

export default RequestPage;
