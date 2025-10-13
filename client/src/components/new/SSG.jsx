
import React from 'react';

const SSG = () => {
  return (
    <div className="p-6 my-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">3. Static Site Generation (SSG)</h2>
      <p className="mb-4 font-normal text-gray-700">
        With SSG, all the HTML pages for a site are generated at build time (before anyone visits). These pre-built files are then deployed to a server or CDN. When a user requests a page, the server just sends back the already-made file.
      </p>
      <p className="mb-4 font-normal text-gray-700">
        <strong>Analogy:</strong> It's like a furniture store having thousands of chairs already built and stored in a warehouse. When you order one, they just grab it and ship it instantly.
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <h4 className="font-semibold text-gray-800">Key Frameworks:</h4>
          <p className="text-gray-600">Astro, Next.js, Gatsby, Hugo, Jekyll.</p>
        </div>
        <div>
          <h4 className="font-semibold text-green-700">Pros:</h4>
          <ul className="pl-5 text-green-600 list-disc">
            <li>Extremely fast and performant.</li>
            <li>Highly secure, as there's no live server or database.</li>
            <li>Very cheap to host, perfect for CDNs.</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-red-700">Cons:</h4>
          <ul className="pl-5 text-red-600 list-disc">
            <li>Long build times for large sites with many pages.</li>
            <li>Content can become stale; a full rebuild is needed to update.</li>
            <li>Not suitable for highly dynamic or personalized content.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SSG;

