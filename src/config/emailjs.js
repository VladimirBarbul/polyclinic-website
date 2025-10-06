import emailjs from '@emailjs/browser';

// EmailJS configuration - загружаем из localStorage или используем значения по умолчанию
const getEmailJSSettings = () => {
  try {
    const savedSettings = localStorage.getItem('emailjsSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      return {
        serviceId: settings.serviceId || 'service_n1xwgdm',
        templateId: settings.templateId || 'template_q4one8j',
        publicKey: settings.publicKey || 'V5KGHxYntPzX2avqm'
      };
    }
  } catch (error) {
    console.error('Ошибка загрузки настроек EmailJS:', error);
  }
  
  // Значения по умолчанию
  return {
    serviceId: 'service_n1xwgdm',
    templateId: 'template_q4one8j',
    publicKey: 'V5KGHxYntPzX2avqm'
  };
};

export const sendEmail = async (templateParams) => {
  try {
    // Получаем настройки EmailJS
    const settings = getEmailJSSettings();
    
    // Реальная отправка через EmailJS
    const result = await emailjs.send(
      settings.serviceId,
      settings.templateId,
      templateParams,
      settings.publicKey
    );
    
    return { success: true, result };
    
  } catch (error) {
    console.error('❌ Ошибка отправки email:', error);
    return { 
      success: false, 
      error: error.text || error.message || 'Неизвестная ошибка' 
    };
  }
};
