import React, { useState, useEffect } from 'react';

const SocialSettings = () => {
  const [settings, setSettings] = useState({
    telegram: '',
    whatsapp: '',
    viber: '',
    facebook: '',
    instagram: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Load settings from localStorage
    try {
      const savedSettings = localStorage.getItem('socialSettings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      } else {
        // Set default values
        setSettings({
          telegram: 'https://t.me/polyclinic',
          whatsapp: 'https://wa.me/380636718588',
          viber: 'viber://chat?number=380636718588',
          facebook: 'https://m.me/polyclinic',
          instagram: 'https://www.instagram.com/healthclinic.od/',
          phone: '+380636718588'
        });
      }
    } catch (e) {
      console.error("Failed to load social settings from localStorage", e);
      setError("Помилка завантаження налаштувань.");
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const saveSettings = () => {
    try {
      localStorage.setItem('socialSettings', JSON.stringify(settings));
      // Dispatch a custom event to notify other components
      window.dispatchEvent(new Event('dataUpdated_socialSettings'));
      setSuccess('Налаштування успішно збережено!');
      setError('');
      setTimeout(() => setSuccess(''), 3000);
    } catch (e) {
      console.error("Failed to save social settings to localStorage", e);
      setError("Помилка збереження налаштувань.");
    }
  };

  const resetToDefaults = () => {
    setSettings({
      telegram: 'https://t.me/polyclinic',
      whatsapp: 'https://wa.me/380636718588',
      viber: 'viber://chat?number=380636718588',
      facebook: 'https://m.me/polyclinic',
      instagram: 'https://www.instagram.com/healthclinic.od/',
      phone: '+380636718588'
    });
  };

  return (
    <div className="card p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Налаштування соціальних мереж</h3>

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Успіх!</strong>
          <span className="block sm:inline"> {success}</span>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Помилка!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="telegram" className="block text-sm font-medium text-gray-700">Telegram</label>
          <input
            type="url"
            name="telegram"
            id="telegram"
            value={settings.telegram}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-medical-blue focus:border-medical-blue sm:text-sm"
            placeholder="https://t.me/your_username"
          />
        </div>

        <div>
          <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">WhatsApp</label>
          <input
            type="url"
            name="whatsapp"
            id="whatsapp"
            value={settings.whatsapp}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-medical-blue focus:border-medical-blue sm:text-sm"
            placeholder="https://wa.me/380XXXXXXXXX"
          />
        </div>

        <div>
          <label htmlFor="viber" className="block text-sm font-medium text-gray-700">Viber</label>
          <input
            type="text"
            name="viber"
            id="viber"
            value={settings.viber}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-medical-blue focus:border-medical-blue sm:text-sm"
            placeholder="viber://chat?number=380XXXXXXXXX"
          />
        </div>

        <div>
          <label htmlFor="facebook" className="block text-sm font-medium text-gray-700">Facebook Messenger</label>
          <input
            type="url"
            name="facebook"
            id="facebook"
            value={settings.facebook}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-medical-blue focus:border-medical-blue sm:text-sm"
            placeholder="https://m.me/your_page"
          />
        </div>

        <div>
          <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">Instagram</label>
          <input
            type="url"
            name="instagram"
            id="instagram"
            value={settings.instagram}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-medical-blue focus:border-medical-blue sm:text-sm"
            placeholder="https://www.instagram.com/your_username/"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Номер телефону</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={settings.phone}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-medical-blue focus:border-medical-blue sm:text-sm"
            placeholder="+380XXXXXXXXX"
          />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={saveSettings}
            className="btn-primary flex-1"
            disabled={loading}
          >
            Зберегти налаштування
          </button>
          <button
            onClick={resetToDefaults}
            className="btn-secondary flex-1"
            disabled={loading}
          >
            Скинути до стандартних
          </button>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-md text-sm text-gray-600">
        <h4 className="font-semibold mb-2">Інструкція з налаштування:</h4>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Telegram:</strong> Вставте посилання на ваш Telegram канал або бот</li>
          <li><strong>WhatsApp:</strong> Використовуйте формат https://wa.me/380XXXXXXXXX</li>
          <li><strong>Viber:</strong> Використовуйте формат viber://chat?number=380XXXXXXXXX</li>
          <li><strong>Facebook Messenger:</strong> Вставте посилання на вашу сторінку</li>
          <li><strong>Instagram:</strong> Вставте посилання на ваш Instagram профіль</li>
          <li><strong>Номер телефону:</strong> Введіть номер у форматі +380XXXXXXXXX</li>
        </ul>
      </div>
    </div>
  );
};

export default SocialSettings;
