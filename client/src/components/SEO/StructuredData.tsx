import React from "react";
import { Helmet } from "react-helmet-async";

interface OrganizationStructuredDataProps {
  name?: string;
  logo?: string;
  url?: string;
  description?: string;
  sameAs?: string[];
}

export const OrganizationStructuredData: React.FC<OrganizationStructuredDataProps> = ({
  name = "Data Software (DSPL)",
  logo = "/datasoftware-dspl.jpeg",
  url = "https://www.datasoftwareltd.com/",
  description = "Data Software (DSPL) is a comprehensive platform offering courses, internships, and career opportunities in software development and data science.",
  sameAs = [],
}) => {
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://www.datasoftwareltd.com/";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url: url || siteUrl,
    logo: `${siteUrl}${logo}`,
    description,
    sameAs,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
};

interface WebpageStructuredDataProps {
  title?: string;
  description?: string;
  url?: string;
  lastUpdated?: string;
}

export const WebpageStructuredData: React.FC<WebpageStructuredDataProps> = ({
  title = "Data Software (DSPL)",
  description = "Data Software (DSPL) is a comprehensive platform offering courses, internships, and career opportunities in software development and data science.",
  url,
  lastUpdated = new Date().toISOString(),
}) => {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: url || currentUrl,
    dateModified: lastUpdated,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
};

interface CourseStructuredDataProps {
  name: string;
  description: string;
  provider?: string;
  url?: string;
}

export const CourseStructuredData: React.FC<CourseStructuredDataProps> = ({
  name,
  description,
  provider = "Data Software (DSPL)",
  url,
}) => {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: provider,
    },
    url: url || currentUrl,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
};
