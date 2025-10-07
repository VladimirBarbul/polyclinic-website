import React from 'react';
import { Link } from 'react-router-dom';
import { useDoctors } from '../hooks/useDoctors';
import { useServices } from '../hooks/useServices';
import { useContacts } from '../hooks/useContacts';
import AppointmentOptions from '../components/AppointmentOptions';

const Home = () => {
  const contacts = useContacts();
  const doctors = useDoctors();
  const services = useServices();

  // Проверяем загрузку контактов
  if (!contacts) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-medical-text mb-6">
                {contacts.name}
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {contacts.description}
              </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-shrink-0 w-full sm:w-auto">
                      <AppointmentOptions className="text-center w-full sm:w-auto" />
                    </div>
                    <Link
                      to="/contact"
                      className="btn-secondary text-center flex-shrink-0 w-full sm:w-auto"
                    >
                      Наші контакти
                    </Link>
                  </div>
            </div>
            <div className="relative">
              <img
                src="/images/doctors/Kivenko.jpg"
                alt="Ківенко Лариса Миколаївна - Головний лікар"
                className="rounded-xl shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-medical-blue rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-medical-text">25+ років</p>
                    <p className="text-sm text-gray-600">досвіду</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Наші лікарі</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {doctors.slice(0, 4).map((doctor) => (
              <div key={doctor.id} className="card text-center">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
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
                  className="btn-secondary text-sm"
                >
                  Докладніше
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/doctors"
              className="btn-primary"
            >
              Всі лікарі
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-medical-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Наші послуги</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 6).map((service) => (
              <div key={service.id} className="card">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-medical-text mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-medical-blue font-semibold">
                    {service.price}
                  </span>
                  <Link
                    to={`/service/${service.id}`}
                    className="btn-secondary text-sm"
                  >
                    Докладніше
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/services"
              className="btn-primary"
            >
              Всі послуги
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Контакти</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-medical-blue rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-medical-text mb-2">Адреса</h3>
                    <p className="text-gray-600">{contacts.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-medical-blue rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-medical-text mb-2">Телефон</h3>
                    <p className="text-gray-600">{contacts.phone}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-medical-blue rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-medical-text mb-2">Email</h3>
                    <p className="text-gray-600">{contacts.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-medical-blue rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-medical-text mb-2">Графік роботи</h3>
                    <p className="text-gray-600">{contacts.workingHours}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-medical-text mb-4">Як нас знайти</h3>
              <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={contacts.mapImage || "/images/clinic/map.jpg"}
                  alt="Карта клініки"
                  className="w-full h-full object-cover"
                />
                <a
                  href={contacts.googleMapsLink || "https://www.google.com/maps/place/вул.+Олексія+Вадатурського,+18,+Одеса,+65022"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg font-bold opacity-0 hover:opacity-100 transition-opacity duration-300"
                >
                  Відкрити на карті
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
