import React, { useState } from 'react';
import { vacancies } from '../data/mockData';

const Vacancies = () => {
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Тут можна додати логіку відправки форми
    alert('Ваше резюме відправлено! Ми зв\'яжемося з вами найближчим часом.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      position: '',
      experience: '',
      message: ''
    });
    setSelectedVacancy(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-medical-text mb-6">
            Вакансії
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Приєднуйтесь до нашої команди професіоналів та допомагайте нам надавати якісну медичну допомогу
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hr@polyclinic.ua"
              className="btn-primary"
            >
              Надіслати резюме
            </a>
            <a
              href="tel:+380441234567"
              className="btn-secondary"
            >
              Зателефонувати
            </a>
          </div>
        </div>
      </section>

      {/* Vacancies List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Відкриті вакансії</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vacancies.map((vacancy) => (
              <div key={vacancy.id} className="card flex flex-col h-full">
                <h3 className="text-xl font-semibold text-medical-text mb-2">
                  {vacancy.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {vacancy.description}
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Зарплата:</span>
                    <span className="font-semibold text-medical-blue">{vacancy.salary}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Тип роботи:</span>
                    <span className="font-semibold">{vacancy.type}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedVacancy(vacancy)}
                  className="btn-primary w-full mt-auto"
                >
                  Подати заявку
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Чому варто працювати з нами</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-medical-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-medical-text mb-2">Сучасне обладнання</h3>
              <p className="text-gray-600">Робота з найновішими медичними технологіями</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-medical-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-medical-text mb-2">Професійна команда</h3>
              <p className="text-gray-600">Робота з досвідченими та кваліфікованими колегами</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-medical-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-medical-text mb-2">Розвиток кар'єри</h3>
              <p className="text-gray-600">Можливості для професійного зростання та навчання</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-medical-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-medical-text mb-2">Стабільність</h3>
              <p className="text-gray-600">Стабільна робота та конкурентна заробітна плата</p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {selectedVacancy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-medical-text">
                  Подача заявки на посаду "{selectedVacancy.title}"
                </h3>
                <button
                  onClick={() => setSelectedVacancy(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Повне ім'я *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Досвід роботи
                    </label>
                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Додаткова інформація
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                    placeholder="Розкажіть про себе, ваші навички та досвід..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="submit"
                    className="btn-primary flex-1"
                  >
                    Відправити заявку
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedVacancy(null)}
                    className="btn-secondary flex-1"
                  >
                    Скасувати
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vacancies;
