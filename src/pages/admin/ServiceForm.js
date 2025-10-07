import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getData, setData, getItemById } from '../../utils/dataManager';
import ImageUpload from '../../components/admin/ImageUpload';

const ServiceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    duration: '',
    image: '',
    procedure: '',
    preparation: '',
    time: '',
    features: [
      'Первинний огляд лікаря',
      'Діагностика захворювань',
      'Лікування та терапія',
      'Профілактичні рекомендації'
    ],
    benefits: [
      'Сучасне медичне обладнання',
      'Досвідчені лікарі',
      'Індивідуальний підхід',
      'Швидка діагностика',
      'Комфортні умови',
      'Доступні ціни'
    ]
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isEdit) {
      const service = getItemById('services', parseInt(id));
      if (service) {
        // Маппим поля для совместимости
        setFormData({
          title: service.title || service.name || '',
          description: service.description || '',
          category: service.category || '',
          price: service.price || service.cost || '',
          duration: service.duration || '',
          image: service.image || service.photo || '',
          procedure: service.procedure || '',
          preparation: service.preparation || '',
          time: service.time || '',
          features: service.features || [
            'Первинний огляд лікаря',
            'Діагностика захворювань',
            'Лікування та терапія',
            'Профілактичні рекомендації'
          ],
          benefits: service.benefits || [
            'Сучасне медичне обладнання',
            'Досвідчені лікарі',
            'Індивідуальний підхід',
            'Швидка діагностика',
            'Комфортні умови',
            'Доступні ціни'
          ]
        });
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
      image: imageData
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

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Основна інформація */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Основна інформація
          </h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Назва послуги <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Наприклад: Консультація терапевта"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2"
                required
              />
              <p className="mt-1 text-xs text-gray-500">Коротка назва послуги</p>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Категорія <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                id="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2"
                required
              >
                <option value="">Оберіть категорію</option>
                <option value="Консультації">Консультації</option>
                <option value="Діагностика">Діагностика</option>
                <option value="Лікування">Лікування</option>
                <option value="Реабілітація">Реабілітація</option>
                <option value="Профілактика">Профілактика</option>
                <option value="Лабораторні дослідження">Лабораторні дослідження</option>
              </select>
              <p className="mt-1 text-xs text-gray-500">До якої категорії належить послуга</p>
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Вартість
              </label>
              <input
                type="text"
                name="price"
                id="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Наприклад: від 500 грн, 1000-1500 грн"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2"
              />
              <p className="mt-1 text-xs text-gray-500">Вартість послуги (можна вказати діапазон)</p>
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                Тривалість
              </label>
              <input
                type="text"
                name="duration"
                id="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="Наприклад: 30-60 хвилин, 1 година"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2"
              />
              <p className="mt-1 text-xs text-gray-500">Скільки часу займає послуга</p>
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Опис послуги <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              id="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2"
              placeholder="Детальний опис послуги, що входить у неї, для кого призначена..."
              required
            />
            <p className="mt-1 text-xs text-gray-500">Опишіть, що включає послуга та для кого вона призначена</p>
          </div>

          <div className="mt-6">
            <label htmlFor="features" className="block text-sm font-medium text-gray-700 mb-2">
              Що включає послуга
            </label>
            <textarea
              name="features"
              id="features"
              rows={4}
              value={formData.features.join('\n')}
              onChange={(e) => {
                const features = e.target.value.split('\n').filter(item => item.trim() !== '');
                setFormData(prev => ({ ...prev, features }));
              }}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2"
              placeholder="Кожен пункт з нового рядка:&#10;• Первинний огляд терапевта&#10;• Діагностика захворювань&#10;• Лікування хронічних хвороб&#10;• Профілактичні огляди"
            />
            <p className="mt-1 text-xs text-gray-500">Кожен пункт з нового рядка. Буде відображено як список</p>
          </div>

          <div className="mt-6">
            <ImageUpload
              onImageSelect={handleImageSelect}
              currentImage={formData.image || formData.photo}
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

            <div>
              <label htmlFor="benefits" className="block text-sm font-medium text-gray-700">
                Переваги послуги
              </label>
              <textarea
                name="benefits"
                id="benefits"
                rows={4}
                value={formData.benefits.join('\n')}
                onChange={(e) => {
                  const benefits = e.target.value.split('\n').filter(item => item.trim() !== '');
                  setFormData(prev => ({ ...prev, benefits }));
                }}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2"
                placeholder="Кожен пункт з нового рядка:&#10;• Сучасне обладнання&#10;• Досвідчені лікарі&#10;• Швидка діагностика&#10;• Індивідуальний підхід"
              />
              <p className="mt-1 text-xs text-gray-500">Кожен пункт з нового рядка. Буде відображено як список переваг</p>
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


