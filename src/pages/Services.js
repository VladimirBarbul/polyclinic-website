import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useServices } from '../hooks/useServices';
import ServiceBookingModal from '../components/ServiceBookingModal';

const Services = () => {
  const services = useServices();
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const handleConsultationClick = () => {
    setSelectedService({ title: 'Консультація з послугами' });
    setShowModal(true);
  };

  // Проверяем загрузку услуг
  if (!services || !Array.isArray(services) || services.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-medical-text mb-6">
              Наші послуги
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Повний спектр медичних послуг для дорослих та дітей
            </p>
          </div>
        </section>

        {/* Error Message */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold text-red-800 mb-2">
                Помилка завантаження послуг
              </h2>
              <p className="text-red-600 mb-4">
                Не вдалося завантажити список послуг. Будь ласка, спробуйте пізніше або зверніться до адміністратора.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Перезавантажити сторінку
                </button>
                <Link
                  to="/contact"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Зв'язатися з нами
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-medical-text mb-6">
            Наші послуги
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Повний спектр медичних послуг для дорослих та дітей
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="card flex flex-col h-full">
                {service.image || service.photo ? (
                  <img
                    src={service.image || service.photo}
                    alt={service.title || service.name || 'Послуга'}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div 
                  className={`w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center ${service.image || service.photo ? 'hidden' : 'flex'}`}
                >
                  <div className="text-center text-gray-500">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm">Немає фото</p>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-medical-text mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <div className="space-y-2 mb-6 flex-grow">
                  <h4 className="font-semibold text-medical-text">Що включає:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {service.features.map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-medical-blue font-semibold text-xl">
                      {service.price}
                    </span>
                    <Link
                      to={`/service/${service.id}`}
                      className="btn-secondary text-sm py-2 px-4"
                    >
                      Докладніше
                    </Link>
                  </div>
                  <button
                    onClick={() => handleServiceClick(service)}
                    className="btn-primary text-sm py-2 w-full"
                  >
                    Записатись на послугу
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-medical-text mb-6">
            Потрібна консультація з послугами?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Наші спеціалісти допоможуть вам обрати найкращі послуги
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleConsultationClick}
              className="btn-primary"
            >
              Записатися на консультацію
            </button>
            <Link
              to="/contact"
              className="btn-secondary"
            >
              Зв'язатися з нами
            </Link>
          </div>
        </div>
      </section>

      <ServiceBookingModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        serviceName={selectedService?.title}
      />
    </div>
  );
};

export default Services;
