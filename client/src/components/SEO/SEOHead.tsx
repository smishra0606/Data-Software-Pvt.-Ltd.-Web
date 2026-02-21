import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonicalUrl?: string;
}

const SEOHead: React.FC<SEOProps> = ({
  title = "Data Software (DSPL) - Courses, Internships, and Career Opportunities",
  description = "Data Software (DSPL) is a comprehensive platform offering courses, internships, and career opportunities in software development and data science.",
  keywords = "data software, DSPL, courses, internships, careers, software development, data science",
  ogTitle,
  ogDescription,
  ogImage = "/datasoftware-dspl.jpeg",
  ogUrl,
  twitterCard = "summary_large_image",
  twitterTitle,
  twitterDescription,
  twitterImage,
  canonicalUrl,
}) => {
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://www.datasoftwareltd.com/";
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:url" content={ogUrl || currentUrl} />
      <meta property="og:site_name" content="Data Software (DSPL)" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={twitterTitle || ogTitle || title} />
      <meta name="twitter:description" content={twitterDescription || ogDescription || description} />
      <meta name="twitter:image" content={`${siteUrl}${twitterImage || ogImage}`} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Data Software (DSPL)" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
    </Helmet>
  );
};

export default SEOHead;
