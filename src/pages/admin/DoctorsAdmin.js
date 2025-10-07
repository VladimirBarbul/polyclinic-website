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
                    {doctor.photo || doctor.image ? (
                      <img
                        className="h-12 w-12 rounded-full object-cover"
                        src={doctor.photo || doctor.image}
                        alt={doctor.name}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className={`h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center ${doctor.photo || doctor.image ? 'hidden' : 'flex'}`}
                    >
                      <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {doctor.specialization || doctor.specialty}
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {doctor.name}
                      </dd>
                    </dl>
                  </div>
                </div>
                
                {/* Додаткова інформація */}
                <div className="mt-4 space-y-2">
                  {doctor.experience && (
                    <div className="flex items-center text-sm text-gray-600 bg-blue-50 p-3 rounded-md">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Досвід: {doctor.experience}</span>
                    </div>
                  )}
                  
                  {doctor.education && (
                    <div className="flex items-start text-sm text-gray-600 bg-blue-50 p-3 rounded-md">
                      <svg className="w-4 h-4 mr-2 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.083 12.083 0 01.665-6.479L12 14z" />
                      </svg>
                      <span>Освіта: {doctor.education}</span>
                    </div>
                  )}
                  
                  {doctor.schedule && (
                    <div className="flex items-center text-sm text-gray-600 bg-blue-50 p-3 rounded-md">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Графік: {doctor.schedule}</span>
                    </div>
                  )}
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

