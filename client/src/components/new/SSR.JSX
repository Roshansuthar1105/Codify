import React from 'react';

const SSR = () => {
  return (
    <div className="p-6 my-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">2. Server-Side Rendering (SSR)</h2>
      <p className="mb-4 font-normal text-gray-700">
        With SSR, when a user requests a page, the server generates the full HTML for that page and sends it to the browser. The browser can immediately display the content. JavaScript then loads in the background to make the page interactive (a process called "hydration").
      </p>
      <p className="mb-4 font-normal text-gray-700">
        <strong>Analogy:</strong> It's like ordering a pre-assembled piece of furniture. It arrives ready to use instantly, though you might need to plug it in (hydration) to get its interactive features working.
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <h4 className="font-semibold text-gray-800">Key Frameworks:</h4>
          <p className="text-gray-600">Next.js (for React), Nuxt.js (for Vue), SvelteKit.</p>
        </div>
        <div>
          <h4 className="font-semibold text-green-700">Pros:</h4>
          <ul className="pl-5 text-green-600 list-disc">
            <li>Excellent for SEO as content is present in the initial HTML.</li>
            <li>Fast initial page load (Time to First Contentful Paint).</li>
            <li>Works well on less powerful devices.</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-red-700">Cons:</h4>
          <ul className="pl-5 text-red-600 list-disc">
            <li>Can have a slower Time to Interactive (TTI) while hydration occurs.</li>
            <li>Higher server load and cost.</li>
            <li>Full page reloads on navigation.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SSR;
