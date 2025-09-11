import React from 'react';

const CSR = () => {
  return (
    <div className="p-6 my-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">1. Client-Side Rendering (CSR)</h2>
      <p className="mb-4 font-normal text-gray-700">
        With CSR, the server sends a minimal HTML file along with a large JavaScript bundle. The browser downloads everything, and then the JavaScript takes over to render the page, fetch data, and handle routing. This is the classic model for a Single-Page Application (SPA).
      </p>
      <p className="mb-4 font-normal text-gray-700">
        <strong>Analogy:</strong> It's like buying flat-pack furniture (like from IKEA). You get a box with all the pieces and instructions, but you have to build the final product yourself at home.
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <h4 className="font-semibold text-gray-800">Key Frameworks:</h4>
          <p className="text-gray-600">React (with Create React App), Angular, Vue.</p>
        </div>
        <div>
          <h4 className="font-semibold text-green-700">Pros:</h4>
          <ul className="pl-5 text-green-600 list-disc">
            <li>Rich, fluid user interactions after the initial load.</li>
            <li>Faster page-to-page navigation without full reloads.</li>
            <li>Lighter load on the server.</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-red-700">Cons:</h4>
          <ul className="pl-5 text-red-600 list-disc">
            <li>Slow initial load time (Time to First Contentful Paint).</li>
            <li>Can be detrimental to SEO if crawlers don't execute JS well.</li>
            <li>Requires a powerful device for a smooth user experience.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CSR;
