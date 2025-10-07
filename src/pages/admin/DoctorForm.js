import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getData, setData, getItemById } from '../../utils/dataManager';
import ImageUpload from '../../components/admin/ImageUpload';

const DoctorForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    experience: '',
    education: '',
    bio: '',
    schedule: '',
    photo: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isEdit) {
      const doctor = getItemById('doctors', parseInt(id));
      if (doctor) {
        setFormData(doctor);
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
      const doctors = getData('doctors') || [];
      
      if (isEdit) {
        const updatedDoctors = doctors.map(doctor => 
          doctor.id === parseInt(id) ? { ...doctor, ...formData } : doctor
        );
        setData('doctors', updatedDoctors);
      } else {
        const newDoctor = {
          ...formData,
          id: Date.now()
        };
        setData('doctors', [...doctors, newDoctor]);
      }

      setMessage(isEdit ? 'Лікаря успішно оновлено!' : 'Лікаря успішно додано!');
      setTimeout(() => {
        navigate('/admin/doctors');
      }, 1500);
    } catch (error) {
      console.error('Помилка збереження:', error);
      setMessage('Помилка збереження лікаря');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? 'Редагувати лікаря' : 'Додати нового лікаря'}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {isEdit ? 'Оновіть інформацію про лікаря' : 'Заповніть інформацію про нового лікаря'}
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
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Основна інформація
          </h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                ПІБ лікаря <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Наприклад: Ківенко Лариса Миколаївна"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 bg-blue-50"
                required
              />
              <p className="mt-1 text-xs text-gray-500">Введіть повне ім'я лікаря</p>
            </div>

            <div>
              <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-2">
                Спеціалізація <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="specialization"
                id="specialization"
                value={formData.specialization}
                onChange={handleChange}
                placeholder="Наприклад: Терапевт, Кардіолог, Педіатр"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 bg-blue-50"
                required
              />
              <p className="mt-1 text-xs text-gray-500">Основна спеціалізація лікаря</p>
            </div>

            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                Досвід роботи
              </label>
              <input
                type="text"
                name="experience"
                id="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Наприклад: 10 років, 15+ років"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 bg-blue-50"
              />
              <p className="mt-1 text-xs text-gray-500">Скільки років працює лікар</p>
            </div>

            <div>
              <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-2">
                Освіта
              </label>
              <input
                type="text"
                name="education"
                id="education"
                value={formData.education}
                onChange={handleChange}
                placeholder="Наприклад: Одеський медичний університет"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 bg-blue-50"
              />
              <p className="mt-1 text-xs text-gray-500">Вища медична освіта</p>
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
              Про лікаря
            </label>
            <textarea
              name="bio"
              id="bio"
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 bg-blue-50"
              placeholder="Детальна інформація про лікаря, його кваліфікацію, досягнення..."
            />
            <p className="mt-1 text-xs text-gray-500">Опишіть професійний досвід та досягнення лікаря</p>
          </div>

          <div className="mt-6">
            <label htmlFor="schedule" className="block text-sm font-medium text-gray-700 mb-2">
              Графік роботи
            </label>
            <input
              type="text"
              name="schedule"
              id="schedule"
              value={formData.schedule}
              onChange={handleChange}
              placeholder="Наприклад: Пн-Пт: 9:00-18:00, Сб: 9:00-14:00"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 bg-blue-50"
            />
            <p className="mt-1 text-xs text-gray-500">Коли лікар приймає пацієнтів</p>
          </div>

          <div className="mt-6">
            <ImageUpload
              onImageSelect={handleImageSelect}
              currentImage={formData.photo}
              label="Фото лікаря"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/admin/doctors')}
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

export default DoctorForm;


