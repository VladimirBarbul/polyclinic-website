import React from 'react';
import EmailJSSettings from '../../components/admin/EmailJSSettings';

const EmailJSAdmin = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Налаштування EmailJS</h1>
        <p className="mt-1 text-sm text-gray-600">
          Керуйте налаштуваннями відправки електронних листів
        </p>
      </div>

      <EmailJSSettings />
    </div>
  );
};

export default EmailJSAdmin;

