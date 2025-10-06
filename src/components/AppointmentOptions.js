import React, { useState, useEffect, useRef, memo } from 'react';
import ContactFormModal from './ContactFormModal';
import { useContacts } from '../hooks/useContacts';

const AppointmentOptions = memo(({ doctorName, className = "" }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef(null);
  const contacts = useContacts();

  const handlePhoneCall = () => {
    window.open(`tel:${contacts.phone}`, '_self');
    setShowOptions(false);
  };

  const handleFormClick = () => {
    setShowModal(true);
    setShowOptions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    if (showOptions) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showOptions]);

  // Проверяем, что контакты загружены
  if (!contacts) {
    return (
      <div className={`relative ${className} inline-block`}>
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="bg-medical-blue text-white px-2 py-2 sm:px-4 sm:py-3 rounded-lg font-medium hover:bg-medical-blue-dark transition-colors duration-200 shadow-md hover:shadow-lg text-xs sm:text-sm whitespace-nowrap min-w-0 flex-shrink-0 opacity-50 cursor-not-allowed inline-block"
          disabled
        >
          <span className="hidden xl:inline">Завантаження...</span>
          <span className="hidden lg:inline xl:hidden">Завантаження...</span>
          <span className="hidden sm:inline lg:hidden">Завантаження...</span>
          <span className="sm:hidden">Завантаження...</span>
        </button>
      </div>
    );
  }

  return (
    <>
      <div className={`relative ${className} inline-block`}>
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="bg-medical-blue text-white px-2 py-2 sm:px-4 sm:py-3 rounded-lg font-medium hover:bg-medical-blue-dark transition-colors duration-200 shadow-md hover:shadow-lg text-xs sm:text-sm whitespace-nowrap min-w-0 flex-shrink-0 inline-block"
        >
          <span className="hidden xl:inline">Записатися на прийом</span>
          <span className="hidden lg:inline xl:hidden">Записатися</span>
          <span className="hidden sm:inline lg:hidden">Записатися</span>
          <span className="sm:hidden">Записатися</span>
        </button>

        {showOptions && (
            <div
              ref={dropdownRef}
              className="absolute top-full left-0 mt-2 w-72 sm:w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 sm:left-0 right-0 sm:right-auto"
            >
                <button
                  onClick={handleFormClick}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3"
                >
                  <span className="text-xl flex-shrink-0">📝</span>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-gray-900 text-sm sm:text-base">Записатися через форму</div>
                    <div className="text-xs sm:text-sm text-gray-500">Заповніть форму зворотного зв'язку</div>
                  </div>
                </button>
            <button
              onClick={handlePhoneCall}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3"
            >
              <span className="text-xl flex-shrink-0">📞</span>
              <div className="min-w-0 flex-1">
                <div className="font-medium text-gray-900 text-sm sm:text-base">Зателефонувати</div>
                <div className="text-xs sm:text-sm text-gray-500">{contacts.phone}</div>
              </div>
            </button>
          </div>
        )}
      </div>

      <ContactFormModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        doctorName={doctorName}
      />
    </>
  );
});

AppointmentOptions.displayName = 'AppointmentOptions';

export default AppointmentOptions;