import React, { useEffect } from 'react';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  breadcrumbs?: BreadcrumbItem[];
  schema?: Record<string, any>;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonical = typeof window !== 'undefined' ? window.location.href : 'https://ardmacademy.in/',
  ogType = 'website',
  ogImage = 'https://ardmacademy.in/logo.png',
  breadcrumbs,
  schema,
}) => {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Helper to set or create meta tag
    const setMetaTag = (attributeName: string, attributeValue: string, content: string) => {
      let el = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attributeName, attributeValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Description
    setMetaTag('name', 'description', description);

    // OpenGraph
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonical);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:image', ogImage);

    // Twitter
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

    // 3. Update Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);

    // 4. Inject Dynamic BreadcrumbList Schema
    const scriptId = 'dynamic-breadcrumb-schema';
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
    
    if (breadcrumbs && breadcrumbs.length > 0) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = scriptId;
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }

      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'name': crumb.name,
          'item': crumb.path.startsWith('http') ? crumb.path : `https://ardmacademy.in${crumb.path}`,
        })),
      };

      scriptEl.textContent = JSON.stringify(breadcrumbSchema);
    } else if (scriptEl) {
      scriptEl.remove();
    }

    // 5. Inject Custom Page Schema if provided
    const pageSchemaId = 'dynamic-page-schema';
    let pageScriptEl = document.getElementById(pageSchemaId) as HTMLScriptElement | null;
    if (schema) {
      if (!pageScriptEl) {
        pageScriptEl = document.createElement('script');
        pageScriptEl.id = pageSchemaId;
        pageScriptEl.type = 'application/ld+json';
        document.head.appendChild(pageScriptEl);
      }
      pageScriptEl.textContent = JSON.stringify(schema);
    } else if (pageScriptEl) {
      pageScriptEl.remove();
    }
  }, [title, description, canonical, ogType, ogImage, breadcrumbs, schema]);

  return null;
};
