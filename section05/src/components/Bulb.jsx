import { useState } from 'react';

const Bulb = () => {
  const [light, setLight] = useState(`off`);

  return (
    <div>
      {light === `on` ? (
        <h1 style={{ backgroundColor: 'orange' }}>on</h1>
      ) : (
        <h1 style={{ backgroundColor: 'gray' }}>off</h1>
      )}
      <button
        onClick={() => {
          setLight(light === `on` ? `off` : `on`);
        }}
      >
        {light === `on` ? `off` : `on`}
      </button>
    </div>
  );
};

export default Bulb;
