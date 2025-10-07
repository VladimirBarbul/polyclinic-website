import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useServices } from '../hooks/useServices';
import { useContacts } from '../hooks/useContacts';
import ServiceBookingModal from '../components/ServiceBookingModal';

const ServicePage = () => {
  const { id } = useParams();
  const services = useServices();
  const contacts = useContacts();
  const [showModal, setShowModal] = useState(false);

  // Добавляем отладочную информацию
  console.log('ServicePage - ID:', id);
  console.log('ServicePage - Services:', services);
  
  const service = services.find(s => s.id === parseInt(id));
  console.log('ServicePage - Found service:', service);

  if (!services || services.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Завантаження послуг...</h1>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-medical-blue mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Послуга не знайдена</h1>
          <p className="text-gray-600 mb-4">ID: {id}</p>
          <Link to="/services" className="btn-primary">
            Повернутися до послуг
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
              {service.image || service.photo ? (
                <img
                  src={service.image || service.photo}
                  alt={service.title || service.name || 'Послуга'}
                  className="w-full h-64 object-cover rounded-xl shadow-lg"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div 
                className={`w-full h-64 bg-gray-200 rounded-xl shadow-lg flex items-center justify-center ${service.image || service.photo ? 'hidden' : 'flex'}`}
              >
                <div className="text-center text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                  <p className="text-lg">Немає фото</p>
                </div>
              </div>
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
                  
                  {service.features && service.features.length > 0 && service.features.some(feature => feature?.trim()) && (
                    <>
                      <h3 className="text-xl font-semibold text-medical-text mb-4">Що включає послуга</h3>
                      <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                        {service.features.filter(feature => feature?.trim()).map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  {service.benefits && service.benefits.length > 0 && service.benefits.some(benefit => benefit?.trim()) && (
                    <>
                      <h3 className="text-xl font-semibold text-medical-text mb-4">Переваги</h3>
                      <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                        {service.benefits.filter(benefit => benefit?.trim()).map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  {/* Додаткова інформація */}
                  {(service.procedure?.trim() || service.preparation?.trim() || service.time?.trim()) && (
                    <>
                      <h3 className="text-xl font-semibold text-medical-text mb-4">Додаткова інформація</h3>
                      
                      {service.procedure?.trim() && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-medical-text mb-2">Як проходить процедура</h4>
                          <p className="text-gray-600">{service.procedure}</p>
                        </div>
                      )}

                      {service.preparation?.trim() && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-medical-text mb-2">Підготовка до процедури</h4>
                          <p className="text-gray-600">{service.preparation}</p>
                        </div>
                      )}

                      {service.time?.trim() && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-medical-text mb-2">Час проведення</h4>
                          <p className="text-gray-600">{service.time}</p>
                        </div>
                      )}
                    </>
                  )}
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
                  <button
                    onClick={() => setShowModal(true)}
                    className="btn-primary w-full text-center"
                  >
                    Записатися зараз
                  </button>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-medical-text mb-4">Контакти</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-medical-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href={`tel:${contacts.phone}`} className="text-medical-blue hover:underline">
                      {contacts.phone}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-medical-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href={`mailto:${contacts.email}`} className="text-medical-blue hover:underline">
                      {contacts.email}
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
              <div key={otherService.id} className="card flex flex-col h-full">
                <img
                  src={otherService.image || otherService.photo || '/api/placeholder/400/300'}
                  alt={otherService.title || otherService.name || 'Послуга'}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-medical-text mb-2">
                    {otherService.title || otherService.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {otherService.description}
                  </p>
                </div>
                <div className="mt-auto">
                  <div className="mb-4">
                    <span className="text-medical-blue font-semibold text-lg">
                      {otherService.price || otherService.cost}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link
                      to={`/service/${otherService.id}`}
                      className="btn-secondary text-sm text-center py-2"
                    >
                      Докладніше
                    </Link>
                  </div>
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
