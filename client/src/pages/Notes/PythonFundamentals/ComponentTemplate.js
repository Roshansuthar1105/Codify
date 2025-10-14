// Template component for remaining Python topics
import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

export const createTemplateComponent = (name, title, description, example = '') => {
    const Component = () => {
        return (
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                    Python <span className='text-primary-600 dark:text-primary-400'>{title}</span>
                </h1>
                
                <div className="prose max-w-none">
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                        {description}
                    </p>

                    {example && (
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Example</h2>
                            <CodeBlock code={example} />
                        </section>
                    )}
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-200 dark:border-blue-700">
                        <p className="text-blue-700 dark:text-blue-300">
                            <strong className="font-semibold">📝 Note:</strong> This section is being developed. 
                            More comprehensive content will be added soon!
                        </p>
                    </div>
                </div>
            </div>
        );
    };
    
    Component.displayName = name;
    return Component;
};