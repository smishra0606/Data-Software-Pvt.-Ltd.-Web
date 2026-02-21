import { MapPin, Mail, Phone, Clock, Send, LinkedinIcon, Twitter, Instagram, Facebook, Github } from "lucide-react";

import AnimatedText from "@/components/ui/AnimatedText";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import SEOHead from "@/seo/SEOHead";

const ContactPage = () => {
  return (
    <>
      <SEOHead
        title="Contact Data Software Pvt Ltd (DSPL)"
        description="Get in touch with Data Software Pvt Ltd (DSPL) for queries about our courses, internships, or partnerships. Based in Bengaluru and led by Udit J."
        url="https://www.datasoftwareltd.com/contact"
      />

      <div className="flex flex-col min-h-screen pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-sm font-medium text-primary/80 uppercase tracking-wider mb-4 block">
                Contact Us
              </span>
              <AnimatedText
                text="Let's start a conversation"
                className="text-3xl md:text-4xl lg:text-5xl font-medium mb-6 text-balance"
                tag="h1"
              />
              <p className="text-muted-foreground mb-8 text-lg">
                We're here to answer your questions and discuss how we can help you achieve your digital goals.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <ScrollReveal>
                <div className="glass-card p-8 rounded-xl">
                  <h2 className="text-2xl font-medium mb-6">Get in touch</h2>
                  <ContactForm />
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-medium mb-6">Contact information</h2>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Bhopal</p>
                          <p className="text-muted-foreground">Prabhat</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Mail className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Email Us</p>
                          <a
                            href="mailto:datasoftwarepvtltd@gmail.com"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            datasoftwarepvtltd@gmail.com
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Phone className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Call Us</p>
                          <a
                            href="tel:+91 81209 98200"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            +91 81209 98200
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Clock className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Business Hours</p>
                          <p className="text-muted-foreground">Monday - Friday: 9am - 6pm</p>
                          <p className="text-muted-foreground">Saturday - Sunday: Closed</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-medium mb-4">Connect with us</h2>
                    <div className="flex space-x-4">
                      <a
                        href="https://www.instagram.com/datasoftwarepvtltd?igsh=MzhjMXh0M2pxbWk3"
                        className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                        aria-label="Instagram"
                      >
                        <Instagram size={20} />
                      </a>
                      <a
                        href="https://www.linkedin.com/company/data-software-pvt-ltd-dspl/"
                        className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <LinkedinIcon size={20} />
                      </a>
                      <a
                        href="https://github.com/DATASOFTWAREPVTLTD"
                        className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                        aria-label="GitHub"
                      >
                        <Github size={20} />
                      </a>
                    </div>
                  </div>

                  <div className="glass-card p-6 rounded-xl">
                    <h2 className="text-xl font-medium mb-4">Start a project</h2>
                    <p className="text-muted-foreground mb-4">
                      Interested in working with us? Let's discuss your project in detail.
                    </p>
                    <Button asChild>
                      <a href="/contact">
                        Schedule a consultation
                        <Send className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Map Section */}
        {/* <section className="section-padding bg-secondary/30">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <AnimatedText
              text="Visit our office"
              className="text-3xl md:text-4xl font-medium mb-6 text-balance"
              tag="h2"
            />
            <p className="text-muted-foreground">
              We're located in the heart of Tech City, easily accessible by
              public transportation.
            </p>
          </div>

          <div className="rounded-xl overflow-hidden h-96 shadow-sm">
            {/* This would typically be a Google Maps iframe or similar */}
        {/* <div className="bg-muted w-full h-full flex items-center justify-center">
              <p className="text-muted-foreground">
                Interactive map would be embedded here
              </p>
            </div>
          </div>
        </div>
      </section> */}

        {/* FAQ Section */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-sm font-medium text-primary/80 uppercase tracking-wider mb-4 block">FAQs</span>
              <AnimatedText
                text="Frequently asked questions"
                className="text-3xl md:text-4xl font-medium mb-6 text-balance"
                tag="h2"
              />
              <p className="text-muted-foreground">Find quick answers to common questions about working with us.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  question: "How quickly can you start on my project?",
                  answer:
                    "Our typical onboarding process takes 1-2 weeks from initial contact to project kickoff, depending on project complexity and our current workload.",
                },
                {
                  question: "Do you work with clients remotely?",
                  answer:
                    "Yes, we work with clients worldwide. Our collaborative process and communication tools enable effective remote partnerships.",
                },
                {
                  question: "What information do you need to provide a quote?",
                  answer:
                    "To provide an accurate quote, we typically need your project goals, timeline, target audience, and any specific features or requirements you have in mind.",
                },
                {
                  question: "How involved will I need to be in the project?",
                  answer:
                    "We value client collaboration but structure our process to minimize demands on your time. Regular check-ins and feedback at key milestones are typically sufficient.",
                },
              ].map((faq, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="glass-card p-6 rounded-xl">
                    <h3 className="text-lg font-medium mb-3">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto">
              <AnimatedText
                text="Ready to transform your digital presence?"
                className="text-3xl md:text-4xl font-medium mb-6 text-balance"
                tag="h2"
              />
              <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Whether you have a specific project in mind or need guidance on where to start, we're here to help you
                navigate the digital landscape.
              </p>
              <Button asChild variant="secondary" size="lg">
                <a href="mailto:datasoftwarepvtltd@gmail.com">
                  Email us directly
                  <Mail className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;
