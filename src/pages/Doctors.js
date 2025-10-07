import React from 'react';
import { Link } from 'react-router-dom';
import { useDoctors } from '../hooks/useDoctors';
import AppointmentOptions from '../components/AppointmentOptions';

const Doctors = () => {
  const doctors = useDoctors();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-medical-text mb-6">
            Наші лікарі
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Кваліфіковані спеціалісти з багаторічним досвідом роботи
          </p>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="card text-center flex flex-col h-full">
                <img
                  src={doctor.image || doctor.photo}
                  alt={doctor.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-200 flex items-center justify-center" style={{display: 'none'}}>
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-medical-text mb-2">
                  {doctor.name}
                </h3>
                <p className="text-medical-blue font-medium mb-2">
                  {doctor.specialty}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Досвід: {doctor.experience}
                </p>
                <Link
                  to={`/doctor/${doctor.id}`}
                  className="btn-primary w-full mt-auto"
                >
                  Докладніше
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-medical-text mb-6">
            Потрібна консультація?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Запишіться на прийом до нашого спеціаліста
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AppointmentOptions />
            <Link
              to="/contact"
              className="btn-secondary"
            >
              Зв'язатися з нами
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Doctors;
