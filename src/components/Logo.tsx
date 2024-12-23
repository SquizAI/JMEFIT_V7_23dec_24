import React from 'react';

const Logo = ({ className = "w-32 h-auto" }) => (
  <img 
    src="/images/logo.svg"
    alt="JME FIT"
    className={className}
    loading="eager"
    fetchpriority="high"
  />
);

export default Logo;