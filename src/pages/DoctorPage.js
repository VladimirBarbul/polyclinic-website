import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDoctors } from '../hooks/useDoctors';
import AppointmentOptions from '../components/AppointmentOptions';

const DoctorPage = () => {
  const { id } = useParams();
  const doctors = useDoctors();
  const doctor = doctors.find(d => d.id === parseInt(id));

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Лікар не знайдений</h1>
          <Link to="/" className="btn-primary">
            Повернутися на головну
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1">
              <img
                src={doctor.image || doctor.photo}
                alt={doctor.name}
                className="w-48 h-48 rounded-full mx-auto md:mx-0 object-cover shadow-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className="w-48 h-48 rounded-full mx-auto md:mx-0 bg-gray-200 flex items-center justify-center shadow-lg" style={{display: 'none'}}>
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <div className="md:col-span-2 text-center md:text-left">
              <h1 className="text-3xl font-bold text-medical-text mb-2">
                {doctor.name}
              </h1>
              <p className="text-xl text-medical-blue font-semibold mb-4">
                {doctor.specialty}
              </p>
              <p className="text-gray-600 mb-6">
                Досвід роботи: {doctor.experience}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <div className="flex-shrink-0 w-full sm:w-auto">
                  <AppointmentOptions doctorName={doctor.name} className="w-full sm:w-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Details */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="card">
                <h2 className="text-2xl font-bold text-medical-text mb-6">Про лікаря</h2>
                <div className="prose max-w-none">
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <p className="text-gray-600 leading-relaxed">
                      {doctor.bio}
                    </p>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-medical-text mb-4">Спеціалізація</h3>
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <p className="text-gray-600">
                      {doctor.specialization || doctor.specialty || 'Спеціалізація не вказана'}
                    </p>
                  </div>

                  {doctor.education && (
                    <>
                      <h3 className="text-xl font-semibold text-medical-text mb-4">Освіта та кваліфікація</h3>
                      <div className="bg-blue-50 p-4 rounded-lg mb-6">
                        <p className="text-gray-600">
                          {doctor.education}
                        </p>
                      </div>
                    </>
                  )}

                  {doctor.experience && (
                    <>
                      <h3 className="text-xl font-semibold text-medical-text mb-4">Досвід роботи</h3>
                      <div className="bg-blue-50 p-4 rounded-lg mb-6">
                        <p className="text-gray-600">
                          {doctor.experience}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">

              <div className="card">
                <h3 className="text-lg font-semibold text-medical-text mb-4">Графік роботи</h3>
                <div className="bg-medical-light-blue p-4 rounded-lg">
                  <p className="text-gray-600">{doctor.schedule}</p>
                </div>
                <div className="mt-4">
                  <AppointmentOptions doctorName={doctor.name} className="w-full text-center" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Doctors */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Інші лікарі</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.filter(d => d.id !== doctor.id).slice(0, 3).map((otherDoctor) => (
              <div key={otherDoctor.id} className="card text-center">
                <img
                  src={otherDoctor.image}
                  alt={otherDoctor.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-medical-text mb-2">
                  {otherDoctor.name}
                </h3>
                <p className="text-medical-blue font-medium mb-2">
                  {otherDoctor.specialty}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Досвід: {otherDoctor.experience}
                </p>
                <Link
                  to={`/doctor/${otherDoctor.id}`}
                  className="btn-secondary text-sm"
                >
                  Докладніше
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoctorPage;
