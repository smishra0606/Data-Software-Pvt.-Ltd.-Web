import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Data Software Pvt Ltd (DSPL) – Courses, Internships & Careers",
  description = "Data Software Pvt Ltd (DSPL), founded by Udit J. in Bengaluru, offers data analytics courses, internships, and career growth opportunities.",
  keywords = "DSPL, Data Software, internships, courses, data analytics, Udit J, Yash Tiwari, Bengaluru, tech careers",
  image = "https://www.datasoftwareltd.com/datasoftware-dspl.jpeg",
  url = typeof window !== "undefined"
    ? window.location.href
    : "https://www.datasoftwareltd.com",
  type = "website",
}) => {
  const siteName = "DSPL";
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return (
    <Helmet>
      {/* Basic Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Udit J." />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical */}
      <link rel="canonical" href={url} />

      {/* Mobile Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Data Software Pvt Ltd (DSPL)",
          url: "https://www.datasoftwareltd.com",
          logo: image,
          founder: {
            "@type": "Person",
            name: "Udit J.",
            jobTitle: "Founder & CEO",
          },
          employee: {
            "@type": "Person",
            name: "Yash Tiwari",
            jobTitle: "Developer",
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Bengaluru",
            addressCountry: "India",
          },
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: "info@datasoftware.dspl",
            url: "https://www.datasoftwareltd.com/contact",
          },
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;
