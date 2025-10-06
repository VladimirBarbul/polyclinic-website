import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getData, deleteItem } from '../../utils/dataManager';
import VacancyForm from './VacancyForm';

const VacanciesAdmin = () => {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVacancies();
  }, []);

  const loadVacancies = () => {
    const vacanciesData = getData('vacancies') || [];
    setVacancies(vacanciesData);
    setLoading(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Ви впевнені, що хочете видалити цю вакансію?')) {
      deleteItem('vacancies', id);
      loadVacancies();
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Завантаження...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Вакансії</h1>
            <p className="mt-1 text-sm text-gray-600">
              Керуйте інформацією про вакансії
            </p>
          </div>
          <Link
            to="/admin/vacancies/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Додати вакансію
          </Link>
        </div>
      </div>

      {vacancies.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Немає вакансій</h3>
          <p className="mt-1 text-sm text-gray-500">Почніть з додавання нової вакансії.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vacancies.map((vacancy) => (
            <div key={vacancy.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {vacancy.department}
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {vacancy.title}
                      </dd>
                      <dd className="text-sm text-gray-500">
                        {vacancy.type}
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4 flex space-x-3">
                  <Link
                    to={`/admin/vacancies/${vacancy.id}`}
                    className="flex-1 bg-white inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Редагувати
                  </Link>
                  <button
                    onClick={() => handleDelete(vacancy.id)}
                    className="flex-1 bg-white inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Видалити
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VacanciesAdmin;

