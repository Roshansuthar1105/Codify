// client/src/pages/RenderingStrategiesPage.jsx

import React from 'react';
// We will create these components in the next step
import CSR from '../components/RenderingStrategies/CSR';
import SSR from '../components/RenderingStrategies/SSR';
import SSG from '../components/RenderingStrategies/SSG';
import ISR from '../components/RenderingStrategies/ISR';

const RenderingStrategiesPage = () => {
  return (
    <div className="page-container">
      <h1>Web Rendering Strategies</h1>
      <p className="intro-text">
        Understanding how web pages are rendered is crucial for building fast, scalable, and SEO-friendly applications. Let's explore the most common strategies.
      </p>
      
      <CSR />
      <SSR />
      <SSG />
      <ISR />
      
    </div>
  );
};

export default RenderingStrategiesPage;