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
                <div className="space-y-2 mb-6 flex-grow">
                  <h4 className="font-semibold text-medical-text">Що включає:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {service.features.map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-medical-blue font-semibold text-lg">
                    {service.price}
                  </span>
                  <button
                    onClick={() => handleServiceClick(service)}
                    className="btn-primary text-sm"
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
