import React from 'react';
import SocialSettings from '../../components/admin/SocialSettings';

const SocialAdmin = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Налаштування соціальних мереж</h1>
        <p className="mt-1 text-sm text-gray-600">
          Керуйте посиланнями на соціальні мережі та контактною інформацією
        </p>
      </div>
      <SocialSettings />
    </div>
  );
};

export default SocialAdmin;
