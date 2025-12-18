import React from 'react';
import './Loader.css';

const Loader = () => (
<div className="loader-container">
  <div className="loader">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path fill="#253290" d="M12 2a10 10 0 100 20 10 10 0 000-20zM11 14h2v2h-2v-2zm0-8h2v6h-2V6z"/>
    </svg>
  </div>
</div>

);

export default Loader;
