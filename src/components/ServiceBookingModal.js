import React, { useState, useEffect, useRef, memo } from 'react';
import { sendEmail } from '../config/emailjs';
import { useContacts } from '../hooks/useContacts';
import { validateUkrainianPhone, formatUkrainianPhone, getPhoneErrorMessage } from '../utils/phoneValidation';

const ServiceBookingModal = memo(({ isOpen, onClose, serviceName }) => {
  const contacts = useContacts();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Запис на послугу',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const modalRef = useRef(null);

  // Сброс формы при открытии модального окна
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Запис на послугу',
        message: ''
      });
      setSuccess(false);
      setError('');
      setLoading(false);
    }
  }, [isOpen]);

  // Закрытие модального окна при клике вне его
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Проверяем загрузку контактов после всех хуков
  if (!contacts) {
    return null;
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
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError('Будь ласка, заповніть всі обов\'язкові поля');
      return;
    }

    // Проверка email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Будь ласка, введіть коректний email');
      return;
    }

    // Проверка корректности номера телефона
    if (!validateUkrainianPhone(formData.phone)) {
      setError(getPhoneErrorMessage());
      return;
    }

    setLoading(true);
    setError('');

    try {
      const messageWithService = serviceName 
        ? `Запис на послугу: ${serviceName}\n\n${formData.message}`
        : formData.message;

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formatUkrainianPhone(formData.phone) || 'Не вказано',
        subject: `Запис на послугу: ${serviceName || 'Не вказано'}`,
        message: messageWithService,
        to_email: contacts.email || 'barbulvladimir@gmail.com',
        clinic_name: contacts.name || 'Health Clinic'
      };
      
      const result = await sendEmail(templateParams);

      if (result.success) {
        setSuccess(true);
      } else {
        setError(`Помилка відправки повідомлення: ${result.error}`);
        return;
      }
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'Запис на послугу',
          message: ''
        });
      }, 3000);
    } catch (err) {
      console.error('Критическая ошибка при отправке формы:', err);
      setError('Критична помилка при відправці форми.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div ref={modalRef} className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Запис на послугу: {serviceName}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          {success ? (
            <div className="text-center py-8">
              <div className="text-green-500 text-6xl mb-4">✓</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Заявка відправлена!
              </h3>
              <p className="text-gray-600">
                Ми зв'яжемося з вами найближчим часом.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ім'я *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Телефон *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Повідомлення
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Додаткова інформація..."
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                  {error}
                </div>
              )}

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Відправка...' : 'Записатися'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
});

ServiceBookingModal.displayName = 'ServiceBookingModal';

export default ServiceBookingModal;