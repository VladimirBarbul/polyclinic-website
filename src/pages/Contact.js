import React, { useState } from 'react';
import { useContacts } from '../hooks/useContacts';
import { sendEmail } from '../config/emailjs';
import { validateUkrainianPhone, formatUkrainianPhone, getPhoneErrorMessage } from '../utils/phoneValidation';

const Contact = () => {
  const contacts = useContacts();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Проверяем загрузку контактов
  if (!contacts) {
    return <div>Загрузка...</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверка на пустые поля
    if (!formData.name || !formData.email || !formData.message) {
      setError('Будь ласка, заповніть всі обов\'язкові поля: Ім\'я, Email, Повідомлення.');
      return;
    }

    // Проверка корректности номера телефона (если указан)
    if (formData.phone && !validateUkrainianPhone(formData.phone)) {
      setError(getPhoneErrorMessage());
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone ? formatUkrainianPhone(formData.phone) : 'Не вказано',
        subject: formData.subject.trim() || 'Запит з контактної форми',
        message: formData.message,
        to_email: contacts.email || 'barbulvladimir@gmail.com',
        clinic_name: contacts.name || 'Health Clinic'
      };

      const result = await sendEmail(templateParams);

      if (result.success) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      } else {
        setError(`Помилка відправки повідомлення: ${result.error}`);
      }
    } catch (err) {
      console.error('Критическая ошибка при отправке формы:', err);
      setError('Критична помилка при відправці форми.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-medical-text mb-6">
            Контакти
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Зв'яжіться з нами для отримання додаткової інформації або запису на прийом
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="card">
                <h2 className="text-2xl font-bold text-medical-text mb-6">
                  Написати нам
                </h2>
                
                {success && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Успіх!</strong>
                    <span className="block sm:inline"> Ваше повідомлення успішно відправлено.</span>
                  </div>
                )}

                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Помилка!</strong>
                    <span className="block sm:inline"> {error}</span>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ім'я *
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
                        Телефон
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Тема
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                      >
                        <option value="">Оберіть тему</option>
                        <option value="Запис на прийом">Запис на прийом</option>
                        <option value="Консультація">Консультація</option>
                        <option value="Питання про послуги">Питання про послуги</option>
                        <option value="Інше">Інше</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Повідомлення *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                      placeholder="Опишіть ваше питання або побажання..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full"
                    disabled={loading}
                  >
                    {loading ? 'Відправлення...' : 'Відправити повідомлення'}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <div className="card mb-6">
                <h3 className="text-xl font-semibold text-medical-text mb-6">
                  Контактна інформація
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-medical-blue rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-medical-text mb-2">Адреса</h4>
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
                      <h4 className="font-semibold text-medical-text mb-2">Телефон</h4>
                      <a href={`tel:${contacts.phone}`} className="text-medical-blue hover:underline">
                        {contacts.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-medical-blue rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-medical-text mb-2">Email</h4>
                      <a href={`mailto:${contacts.email}`} className="text-medical-blue hover:underline">
                        {contacts.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-medical-blue rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-medical-text mb-2">Графік роботи</h4>
                      <p className="text-gray-600">{contacts.workingHours}</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Як нас знайти</h2>
          <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
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
      </section>
    </div>
  );
};

export default Contact;
