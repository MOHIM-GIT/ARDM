import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbItem } from '../seo/SEOHead';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (path: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 bg-slate-100/70 border-b border-slate-200 text-xs">
      <div className="max-w-7xl mx-auto flex items-center gap-1.5 text-slate-500 overflow-x-auto whitespace-nowrap">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('/');
          }}
          className="inline-flex items-center gap-1 text-slate-600 hover:text-indigo-600 font-medium transition-colors"
        >
          <Home className="w-3.5 h-3.5 text-slate-400" />
          <span>Home</span>
        </a>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={item.path}>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {isLast ? (
                <span className="font-semibold text-slate-900 truncate" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <a
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.path);
                  }}
                  className="text-slate-600 hover:text-indigo-600 font-medium transition-colors truncate"
                >
                  {item.name}
                </a>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};
