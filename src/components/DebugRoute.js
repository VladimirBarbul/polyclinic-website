import React from 'react';

const DebugRoute = ({ path, children }) => {
  console.log(`DebugRoute: rendering ${path}`);
  return children;
};

export default DebugRoute;
