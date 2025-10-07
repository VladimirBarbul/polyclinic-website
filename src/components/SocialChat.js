import React, { useState, useEffect } from 'react';

const SocialChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [socialSettings, setSocialSettings] = useState({
    telegram: 'https://t.me/polyclinic',
    whatsapp: 'https://wa.me/380636718588',
    viber: 'viber://chat?number=380636718588',
    facebook: 'https://m.me/polyclinic',
    instagram: 'https://www.instagram.com/healthclinic.od/',
    phone: '+380636718588'
  });

  useEffect(() => {
    // Load settings from localStorage
    const loadSettings = () => {
      try {
        const savedSettings = localStorage.getItem('socialSettings');
        if (savedSettings) {
          setSocialSettings(JSON.parse(savedSettings));
        }
      } catch (e) {
        console.error("Failed to load social settings from localStorage", e);
      }
    };

    loadSettings();

    // Listen for settings updates
    const handleSettingsUpdate = () => {
      loadSettings();
    };

    window.addEventListener('dataUpdated_socialSettings', handleSettingsUpdate);

    return () => {
      window.removeEventListener('dataUpdated_socialSettings', handleSettingsUpdate);
    };
  }, []);

  const socialOptions = [
    {
      name: 'Telegram',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ),
      color: 'bg-blue-500',
      href: socialSettings.telegram
    },
    {
      name: 'WhatsApp',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      ),
      color: 'bg-green-500',
      href: socialSettings.whatsapp
    },
    {
      name: 'Viber',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.398.016C5.747.016 1.1 4.663 1.1 10.314c0 1.9.53 3.68 1.45 5.2L.016 24l8.686-2.6c1.52.92 3.32 1.45 5.22 1.45 5.65 0 10.3-4.65 10.3-10.3 0-5.65-4.65-10.3-10.3-10.3zm5.65 13.5c-.15.15-.4.2-.6.1l-1.5-.8c-.1-.05-.2-.1-.3-.05l-1.8.9c-.1.05-.2.05-.3 0l-3.1-1.5c-.2-.1-.3-.3-.3-.5v-3.1c0-.2.1-.4.3-.5l3.1-1.5c.1-.05.2-.05.3 0l1.8.9c.1.05.2.05.3.05l1.5-.8c.2-.1.45-.05.6.1l2.5 2.5c.15.15.2.4.1.6l-2.5 4.5z"/>
        </svg>
      ),
      color: 'bg-purple-500',
      href: socialSettings.viber
    },
    {
      name: 'Facebook Messenger',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169 1.858-.896 3.461-2.189 4.667-1.293 1.206-2.896 1.933-4.754 2.102-1.858.169-3.461-.896-4.667-2.189-1.206-1.293-1.933-2.896-2.102-4.754-.169-1.858.896-3.461 2.189-4.667 1.293-1.206 2.896-1.933 4.754-2.102 1.858-.169 3.461.896 4.667 2.189 1.206 1.293 1.933 2.896 2.102 4.754z"/>
        </svg>
      ),
      color: 'bg-blue-600',
      href: socialSettings.facebook
    },
    {
      name: 'Instagram',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.405c-.49 0-.98-.49-.98-.98s.49-.98.98-.98.98.49.98.98-.49.98-.98.98z"/>
        </svg>
      ),
      color: 'bg-pink-500',
      href: socialSettings.instagram
    }
  ];

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-medical-blue text-white p-4 rounded-full shadow-lg hover:bg-medical-dark-blue transition-colors duration-200 z-40"
        aria-label="Відкрити чат"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full max-h-[80vh] overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-medical-text">Зв'яжіться з нами</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <p className="text-gray-600 mb-4 text-sm">
                Оберіть зручний для вас спосіб зв'язку:
              </p>

              <div className="space-y-2">
                {socialOptions.map((option) => (
                  <a
                    key={option.name}
                    href={option.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-medical-blue hover:bg-medical-light-blue transition-colors duration-200"
                  >
                    <div className={`p-2 rounded-lg ${option.color} text-white mr-3`}>
                      {option.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-medical-text text-sm">{option.name}</p>
                      <p className="text-xs text-gray-600">Натисніть для переходу</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-600 text-center">
                  Або зателефонуйте нам: <a href={`tel:${socialSettings.phone}`} className="text-medical-blue font-medium">{socialSettings.phone}</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SocialChat;
