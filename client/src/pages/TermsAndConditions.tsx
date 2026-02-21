import { termsAndConditionsContent } from "@/constant/legal";
import AnimatedText from "@/components/ui/AnimatedText";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SEOHead from "@/seo/SEOHead";

const TermsAndConditions = () => {
  return (
    <>
      <SEOHead
        title="Terms and Conditions | Data Software Pvt Ltd (DSPL)"
        description="Read the terms and conditions governing the use of Data Software Pvt Ltd (DSPL)'s services, courses, and website."
        url="https://www.datasoftwareltd.com/terms-and-conditions"
      />

      <div className="flex flex-col min-h-screen pt-16 md:pt-20">
        <section className="section-padding">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <AnimatedText
                text={termsAndConditionsContent.title}
                className="text-3xl md:text-4xl lg:text-5xl font-medium mb-6 text-balance"
                tag="h1"
              />
              <p className="text-muted-foreground">Last updated: {termsAndConditionsContent.lastUpdated}</p>
            </div>

            <div className="max-w-3xl mx-auto">
              {termsAndConditionsContent.sections.map((section, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="mb-8">
                    <h2 className="text-xl md:text-2xl font-medium mb-3">{section.title}</h2>
                    <p className="text-muted-foreground">{section.content}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TermsAndConditions;
