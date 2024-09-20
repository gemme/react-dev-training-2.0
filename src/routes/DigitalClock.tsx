
import React from 'react';

export const DigitalClock = () => {

  return (
    <div>
      <h1>Digital Clock</h1>
      <h2>{new Date().toLocaleTimeString()}</h2>
    </div>
  );
};
