import React, { useState, useEffect } from 'react';
import { useContacts } from '../../hooks/useContacts';

const EmailJSSettings = () => {
  const contacts = useContacts();
  const [settings, setSettings] = useState({
    serviceId: 'service_n1xwgdm',
    templateId: 'template_q4one8j',
    publicKey: 'V5KGHxYntPzX2avqm',
    recipientEmail: contacts?.email || 'barbulvladimir@gmail.com',
    clinicName: contacts?.name || 'Health Clinic'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Загружаем сохраненные настройки
    const savedSettings = localStorage.getItem('emailjsSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsed }));
      } catch (err) {
        console.error('Ошибка загрузки настроек EmailJS:', err);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Сохраняем настройки в localStorage
      localStorage.setItem('emailjsSettings', JSON.stringify(settings));
      
      // Обновляем контакты клиники
      const updatedContacts = {
        ...contacts,
        email: settings.recipientEmail,
        name: settings.clinicName
      };
      localStorage.setItem('clinicContacts', JSON.stringify(updatedContacts));
      
      // Уведомляем другие компоненты об обновлении
      window.dispatchEvent(new CustomEvent('dataUpdated_clinicContacts'));
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Ошибка сохранения настроек');
      console.error('Ошибка сохранения:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTest = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Импортируем функцию отправки динамически
      const { sendEmail } = await import('../../config/emailjs');
      
      const testParams = {
        from_name: 'Тест админки',
        from_email: 'admin@test.com',
        phone: '+380501234567',
        subject: 'Тестовое сообщение из админки',
        message: 'Это тестовое сообщение для проверки настроек EmailJS',
        to_email: settings.recipientEmail,
        clinic_name: settings.clinicName
      };

      const result = await sendEmail(testParams);
      
      if (result.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(`Ошибка отправки тестового письма: ${result.error}`);
      }
    } catch (err) {
      setError('Ошибка при тестировании EmailJS');
      console.error('Ошибка тестирования:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Настройки EmailJS</h2>
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            ✅ Настройки успешно сохранены!
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Service ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service ID
              </label>
              <input
                type="text"
                name="serviceId"
                value={settings.serviceId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="service_xxxxxxx"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                ID сервиса из EmailJS Dashboard
              </p>
            </div>

            {/* Template ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Template ID
              </label>
              <input
                type="text"
                name="templateId"
                value={settings.templateId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="template_xxxxxxx"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                ID шаблона из EmailJS Dashboard
              </p>
            </div>

            {/* Public Key */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Public Key
              </label>
              <input
                type="text"
                name="publicKey"
                value={settings.publicKey}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="xxxxxxxxxxxxx"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Публичный ключ из EmailJS Dashboard
              </p>
            </div>

            {/* Recipient Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email получателя
              </label>
              <input
                type="email"
                name="recipientEmail"
                value={settings.recipientEmail}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="example@email.com"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Email, на который будут приходить письма
              </p>
            </div>

            {/* Clinic Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Название клиники
              </label>
              <input
                type="text"
                name="clinicName"
                value={settings.clinicName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Health Clinic"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Название клиники для писем
              </p>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Сохранение...' : 'Сохранить настройки'}
            </button>
            
            <button
              type="button"
              onClick={handleTest}
              disabled={loading}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
            >
              {loading ? 'Тестирование...' : 'Отправить тестовое письмо'}
            </button>
          </div>
        </form>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <h3 className="text-sm font-medium text-yellow-800 mb-2">Инструкция по настройке:</h3>
          <ol className="text-sm text-yellow-700 space-y-1">
            <li>1. Зайдите в <a href="https://dashboard.emailjs.com/" target="_blank" rel="noopener noreferrer" className="underline">EmailJS Dashboard</a></li>
            <li>2. Создайте Email Service и получите Service ID</li>
            <li>3. Создайте Email Template и получите Template ID</li>
            <li>4. Получите Public Key из раздела Account → API Keys</li>
            <li>5. Введите полученные данные в форму выше</li>
            <li>6. Нажмите "Отправить тестовое письмо" для проверки</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default EmailJSSettings;

