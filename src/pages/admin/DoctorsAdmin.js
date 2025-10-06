import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getData, deleteItem } from '../../utils/dataManager';
import DoctorForm from './DoctorForm';

const DoctorsAdmin = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = () => {
    const doctorsData = getData('doctors') || [];
    setDoctors(doctorsData);
    setLoading(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Ви впевнені, що хочете видалити цього лікаря?')) {
      deleteItem('doctors', id);
      loadDoctors();
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
            <h1 className="text-2xl font-bold text-gray-900">Лікарі</h1>
            <p className="mt-1 text-sm text-gray-600">
              Керуйте інформацією про лікарів
            </p>
          </div>
          <Link
            to="/admin/doctors/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Додати лікаря
          </Link>
        </div>
      </div>

      {doctors.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Немає лікарів</h3>
          <p className="mt-1 text-sm text-gray-500">Почніть з додавання нового лікаря.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-12 w-12 rounded-full object-cover"
                      src={doctor.photo || '/api/placeholder/48/48'}
                      alt={doctor.name}
                    />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {doctor.specialization}
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {doctor.name}
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4 flex space-x-3">
                  <Link
                    to={`/admin/doctors/${doctor.id}`}
                    className="flex-1 bg-white inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Редагувати
                  </Link>
                  <button
                    onClick={() => handleDelete(doctor.id)}
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

export default DoctorsAdmin;

