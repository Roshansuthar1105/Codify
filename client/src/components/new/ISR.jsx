import React from 'react';

const ISR = () => {
  return (
    <div className="p-6 my-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">4. Incremental Static Regeneration (ISR)</h2>
      <p className="mb-4 font-normal text-gray-700">
        ISR is a powerful hybrid approach. Pages are generated statically at build time (like SSG), but they can be automatically re-generated in the background after a certain time interval. This allows content to be updated without needing a full site rebuild.
      </p>
      <p className="mb-4 font-normal text-gray-700">
        <strong>Analogy:</strong> It's like that pre-built chair from the warehouse, but it magically rebuilds itself with a fresh coat of paint every hour, so it never looks old for the next customer.
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <h4 className="font-semibold text-gray-800">Key Frameworks:</h4>
          <p className="text-gray-600">Next.js (pioneered this technique).</p>
        </div>
        <div>
          <h4 className="font-semibold text-green-700">Pros:</h4>
          <ul className="pl-5 text-green-600 list-disc">
            <li>Combines the speed of static sites with fresh content.</li>
            <li>Reduces build times significantly.</li>
            <li>Page revalidation is atomic and doesn't affect users.</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-red-700">Cons:</h4>
          <ul className="pl-5 text-red-600 list-disc">
            <li>Content can still be temporarily stale for some users.</li>
            <li>More complex to set up and reason about than plain SSG.</li>
            <li>Not supported by all hosting platforms.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ISR;
