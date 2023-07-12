import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const RequestPage = () => {
  const [query, setQuery] = useState('');
  const { data: session } = useSession();
  const [queries, setQueries] = useState([]);
  const [load, setLoad] = useState(true);

  const user_id = (session && session.user.email) ? session.user.email : "";

  const fetchQueries = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/queries/${user_id}`);
      setQueries(response.data.queries);
    } catch (error) {
      console.error('Failed to fetch queries:', error);
    }
  };
  

  useEffect(() => {
    if (user_id !== "" && load) {
      fetchQueries();
      setLoad(false);
    }
  }, [user_id, load]); // Добавлены зависимости user_id и load
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Отправляем запрос на сохранение запроса в базе данных
    try {
      await axios.post('http://localhost:8000/queries', { user_id, query });
      console.log('Query saved successfully');
      setQuery('');
      fetchQueries();
    } catch (error) {
      console.error('Failed to save query:', error);
    }
  };
  

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  if (session) {
    return (
      <div className="w-1/2 mx-auto mt-12">
      <h1 className="text-xl font-bold mb-2">Request History</h1>
      <ul className="list-disc pl-6">
        {queries.map((query, index) => (
          <li key={index} className="text-gray-700">{query}</li>
        ))}
      </ul>
    </div>
    );
  } else {
    return (<div className="flex justify-center items-center h-screen">
    <p className="text-2xl font-bold">Авторизуйтесь, пожалуйста.</p>
  </div>)
  }
};

export default RequestPage;