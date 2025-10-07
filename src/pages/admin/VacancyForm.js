import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getData, setData, getItemById } from '../../utils/dataManager';

const VacancyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    department: '',
    type: '',
    salary: '',
    description: '',
    requirements: '',
    responsibilities: '',
    benefits: '',
    location: '',
    experience: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isEdit) {
      const vacancy = getItemById('vacancies', parseInt(id));
      if (vacancy) {
        setFormData(vacancy);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const vacancies = getData('vacancies') || [];
      
      if (isEdit) {
        const updatedVacancies = vacancies.map(vacancy => 
          vacancy.id === parseInt(id) ? { ...vacancy, ...formData } : vacancy
        );
        setData('vacancies', updatedVacancies);
      } else {
        const newVacancy = {
          ...formData,
          id: Date.now()
        };
        setData('vacancies', [...vacancies, newVacancy]);
      }

      setMessage(isEdit ? 'Вакансію успішно оновлено!' : 'Вакансію успішно додано!');
      setTimeout(() => {
        navigate('/admin/vacancies');
      }, 1500);
    } catch (error) {
      console.error('Помилка збереження:', error);
      setMessage('Помилка збереження вакансії');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? 'Редагувати вакансію' : 'Додати нову вакансію'}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {isEdit ? 'Оновіть інформацію про вакансію' : 'Заповніть інформацію про нову вакансію'}
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
            <svg className="w-5 h-5 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
            </svg>
            Основна інформація
          </h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Назва посади <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Наприклад: Лікар-терапевт, Медсестра, Адміністратор"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2"
                required
              />
              <p className="mt-1 text-xs text-gray-500">Повна назва посади</p>
            </div>

            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                Відділ <span className="text-red-500">*</span>
              </label>
              <select
                name="department"
                id="department"
                value={formData.department}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2"
                required
              >
                <option value="">Оберіть відділ</option>
                <option value="Терапевтичний відділ">Терапевтичний відділ</option>
                <option value="Хірургічний відділ">Хірургічний відділ</option>
                <option value="Педіатричний відділ">Педіатричний відділ</option>
                <option value="Лабораторія">Лабораторія</option>
                <option value="Адміністрація">Адміністрація</option>
                <option value="Реєстратура">Реєстратура</option>
                <option value="Інший">Інший</option>
              </select>
              <p className="mt-1 text-xs text-gray-500">До якого відділу належить посада</p>
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                Тип зайнятості <span className="text-red-500">*</span>
              </label>
              <select
                name="type"
                id="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2"
                required
              >
                <option value="">Оберіть тип</option>
                <option value="Повна зайнятість">Повна зайнятість</option>
                <option value="Часткова зайнятість">Часткова зайнятість</option>
                <option value="Контракт">Контракт</option>
                <option value="Стажування">Стажування</option>
              </select>
              <p className="mt-1 text-xs text-gray-500">Який тип роботи пропонується</p>
            </div>

            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-2">
                Зарплата
              </label>
              <input
                type="text"
                name="salary"
                id="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="Наприклад: від 15000 грн, 20000-25000 грн"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2"
              />
              <p className="mt-1 text-xs text-gray-500">Зарплата (можна вказати діапазон)</p>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Місце роботи
              </label>
              <input
                type="text"
                name="location"
                id="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Наприклад: м. Одеса, вул. Олексія Вадатурського, 18"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2"
              />
              <p className="mt-1 text-xs text-gray-500">Де буде працювати співробітник</p>
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
                placeholder="Наприклад: 2-3 роки, без досвіду, 5+ років"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2"
              />
              <p className="mt-1 text-xs text-gray-500">Який досвід потрібен для посади</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Детальна інформація</h2>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Опис вакансії
              </label>
              <textarea
                name="description"
                id="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Загальний опис вакансії..."
                required
              />
            </div>

            <div>
              <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
                Вимоги
              </label>
              <textarea
                name="requirements"
                id="requirements"
                rows={4}
                value={formData.requirements}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Що потрібно від кандидата..."
                required
              />
            </div>

            <div>
              <label htmlFor="responsibilities" className="block text-sm font-medium text-gray-700">
                Обов'язки
              </label>
              <textarea
                name="responsibilities"
                id="responsibilities"
                rows={4}
                value={formData.responsibilities}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Що буде робити співробітник..."
                required
              />
            </div>

            <div>
              <label htmlFor="benefits" className="block text-sm font-medium text-gray-700">
                Переваги
              </label>
              <textarea
                name="benefits"
                id="benefits"
                rows={3}
                value={formData.benefits}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Що ми пропонуємо..."
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/admin/vacancies')}
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

export default VacancyForm;


