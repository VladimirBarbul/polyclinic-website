import React, { useState, useEffect } from 'react';
import { setData, getData } from '../../utils/dataManager';
import ImageUpload from '../../components/admin/ImageUpload';

const ContactsAdmin = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    workingHours: '',
    mapLink: '',
    mapImage: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const contacts = getData('clinicContacts');
    if (contacts) {
      setFormData(contacts);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageSelect = (imageData) => {
    setFormData(prev => ({
      ...prev,
      mapImage: imageData
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const success = setData('clinicContacts', formData);
      if (success) {
        setMessage('Контакти успішно збережені!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Помилка збереження контактів');
      }
    } catch (error) {
      console.error('Помилка збереження:', error);
      setMessage('Помилка збереження контактів');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Керування контактами</h1>
        <p className="mt-1 text-sm text-gray-600">
          Редагуйте контактну інформацію клініки
        </p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-md ${
          message.includes('успішно') 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Основна інформація</h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Назва клініки
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Телефон
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="workingHours" className="block text-sm font-medium text-gray-700">
                Графік роботи
              </label>
              <input
                type="text"
                name="workingHours"
                id="workingHours"
                value={formData.workingHours}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Пн-Пт: 9:00-18:00, Сб: за записом, Нд: вихідний"
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Адреса
            </label>
            <input
              type="text"
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          <div className="mt-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Опис клініки
            </label>
            <textarea
              name="description"
              id="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Короткий опис клініки..."
            />
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Google Maps</h2>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="mapLink" className="block text-sm font-medium text-gray-700">
                Посилання на Google Maps
              </label>
              <input
                type="text"
                name="mapLink"
                id="mapLink"
                value={formData.mapLink}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="https://maps.google.com/..."
              />
            </div>

            <ImageUpload
              onImageSelect={handleImageSelect}
              currentImage={formData.mapImage}
              label="Зображення карти"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Збереження...' : 'Зберегти зміни'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactsAdmin;

