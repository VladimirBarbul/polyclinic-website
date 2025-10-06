import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { services } from '../data/mockData';
import ServiceBookingModal from '../components/ServiceBookingModal';

const ServicePage = () => {
  const { id } = useParams();
  const service = services.find(s => s.id === parseInt(id));
  const [showModal, setShowModal] = useState(false);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Послуга не знайдена</h1>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl font-bold text-medical-text mb-4">
                {service.title}
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                {service.description}
              </p>
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-2xl font-bold text-medical-blue">
                  {service.price}
                </span>
                <span className="text-gray-600">за послугу</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowModal(true)}
                  className="btn-primary"
                >
                  Записатися на послугу
                </button>
              </div>
            </div>
            <div>
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-64 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="card">
                <h2 className="text-2xl font-bold text-medical-text mb-6">Опис послуги</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  
                  <h3 className="text-xl font-semibold text-medical-text mb-4">Що включає послуга</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>

                  <h3 className="text-xl font-semibold text-medical-text mb-4">Переваги</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-medical-light-blue p-4 rounded-lg">
                      <h4 className="font-semibold text-medical-text mb-2">Сучасне обладнання</h4>
                      <p className="text-sm text-gray-600">Використання найновіших медичних технологій</p>
                    </div>
                    <div className="bg-medical-light-blue p-4 rounded-lg">
                      <h4 className="font-semibold text-medical-text mb-2">Досвідчені лікарі</h4>
                      <p className="text-sm text-gray-600">Кваліфіковані спеціалісти з багаторічним досвідом</p>
                    </div>
                    <div className="bg-medical-light-blue p-4 rounded-lg">
                      <h4 className="font-semibold text-medical-text mb-2">Індивідуальний підхід</h4>
                      <p className="text-sm text-gray-600">Персоналізований план лікування для кожного пацієнта</p>
                    </div>
                    <div className="bg-medical-light-blue p-4 rounded-lg">
                      <h4 className="font-semibold text-medical-text mb-2">Швидкі результати</h4>
                      <p className="text-sm text-gray-600">Отримання результатів в найкоротші терміни</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="card mb-6">
                <h3 className="text-lg font-semibold text-medical-text mb-4">Вартість</h3>
                <div className="text-center">
                  <span className="text-3xl font-bold text-medical-blue">
                    {service.price}
                  </span>
                  <p className="text-gray-600 mt-2">за послугу</p>
                </div>
                <div className="mt-6">
                  <a
                    href="tel:+380441234567"
                    className="btn-primary w-full text-center"
                  >
                    Записатися зараз
                  </a>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-medical-text mb-4">Контакти</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-medical-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href="tel:+380441234567" className="text-medical-blue hover:underline">
                      +380 44 123 45 67
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-medical-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:info@polyclinic.ua" className="text-medical-blue hover:underline">
                      info@polyclinic.ua
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Інші послуги</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.filter(s => s.id !== service.id).slice(0, 3).map((otherService) => (
              <div key={otherService.id} className="card">
                <img
                  src={otherService.image}
                  alt={otherService.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-medical-text mb-2">
                  {otherService.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {otherService.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-medical-blue font-semibold">
                    {otherService.price}
                  </span>
                  <Link
                    to={`/service/${otherService.id}`}
                    className="btn-secondary text-sm"
                  >
                    Докладніше
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceBookingModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        serviceName={service.title}
      />
    </div>
  );
};

export default ServicePage;
