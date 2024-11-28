import React from 'react';
import { Check } from 'lucide-react';

export function AdminPlan({
  name,
  price,
  period = 'month',
  features,
  popular = false,
  ctaText = 'Get Started',
  onSelect = () => {},
}) {
  return (
    <div className={`relative rounded-3xl p-px ${popular ? 'bg-gradient-to-b from-blue-500 to-purple-500' : 'bg-gray-200'}`}>
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium rounded-full">
          Most Popular
        </span>
      )}
      
      <div className={`h-full rounded-3xl bg-white p-6 sm:p-8 ${popular ? 'shadow-xl' : ''}`}>
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
          <div className="mt-4 flex items-baseline">
            <span className="text-4xl font-bold tracking-tight text-gray-900">${price}</span>
            <span className="ml-1 text-sm font-semibold text-gray-500">/{period}</span>
          </div>
        </div>

        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <Check 
                className={`h-5 w-5 flex-shrink-0 ${
                  feature.included 
                    ? 'text-blue-500' 
                    : 'text-gray-300'
                }`}
              />
              <span className={`text-sm ${
                feature.included 
                  ? 'text-gray-700' 
                  : 'text-gray-400 line-through'
              }`}>
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <button
          onClick={onSelect}
          className={`w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all
            ${popular 
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
        >
          {ctaText}
        </button>
      </div>
    </div>
  );
}