import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getData, setData, getItemById } from '../../utils/dataManager';
import ImageUpload from '../../components/admin/ImageUpload';

const ServiceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    cost: '',
    duration: '',
    photo: '',
    procedure: '',
    preparation: '',
    time: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isEdit) {
      const service = getItemById('services', parseInt(id));
      if (service) {
        setFormData(service);
      }
    }
  }, [id, isEdit]);

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
      photo: imageData
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const services = getData('services') || [];
      
      if (isEdit) {
        const updatedServices = services.map(service => 
          service.id === parseInt(id) ? { ...service, ...formData } : service
        );
        setData('services', updatedServices);
      } else {
        const newService = {
          ...formData,
          id: Date.now()
        };
        setData('services', [...services, newService]);
      }

      setMessage(isEdit ? 'Послугу успішно оновлено!' : 'Послугу успішно додано!');
      setTimeout(() => {
        navigate('/admin/services');
      }, 1500);
    } catch (error) {
      console.error('Помилка збереження:', error);
      setMessage('Помилка збереження послуги');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? 'Редагувати послугу' : 'Додати нову послугу'}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {isEdit ? 'Оновіть інформацію про послугу' : 'Заповніть інформацію про нову послугу'}
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
                Назва послуги
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
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Категорія
              </label>
              <input
                type="text"
                name="category"
                id="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="cost" className="block text-sm font-medium text-gray-700">
                Вартість
              </label>
              <input
                type="text"
                name="cost"
                id="cost"
                value={formData.cost}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="наприклад: від 500 грн"
              />
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                Тривалість
              </label>
              <input
                type="text"
                name="duration"
                id="duration"
                value={formData.duration}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="наприклад: 30-60 хвилин"
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Опис послуги
            </label>
            <textarea
              name="description"
              id="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Детальний опис послуги..."
              required
            />
          </div>

          <div className="mt-6">
            <ImageUpload
              onImageSelect={handleImageSelect}
              currentImage={formData.photo}
              label="Фото послуги"
            />
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Додаткова інформація</h2>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="procedure" className="block text-sm font-medium text-gray-700">
                Як проходить процедура
              </label>
              <textarea
                name="procedure"
                id="procedure"
                rows={3}
                value={formData.procedure}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Опишіть, як проходить процедура..."
              />
            </div>

            <div>
              <label htmlFor="preparation" className="block text-sm font-medium text-gray-700">
                Підготовка до процедури
              </label>
              <textarea
                name="preparation"
                id="preparation"
                rows={3}
                value={formData.preparation}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Що потрібно зробити перед процедурою..."
              />
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                Час проведення
              </label>
              <input
                type="text"
                name="time"
                id="time"
                value={formData.time}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="наприклад: будь-який час роботи клініки"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/admin/services')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Скасувати
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Збереження...' : (isEdit ? 'Оновити' : 'Додати')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;

