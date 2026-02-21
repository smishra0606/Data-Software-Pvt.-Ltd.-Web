import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, MapPin, Briefcase, Clock, Tag, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnimatedText from "@/components/ui/AnimatedText";
import { DotPattern } from "@/components/ui/dotPattern";
import { useInternships } from "@/hooks/useInternships";
import { Internship } from "@/types/internship";
import { toast } from "sonner";
import SEOHead from "@/seo/SEOHead";

const Internships = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const { getInternships } = useInternships();
  const { data: internshipsData, isLoading } = getInternships();

  const filteredInternships =
    internshipsData?.data.filter((internship) => {
      const matchesSearch =
        internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()));

      if (activeTab === "all") return matchesSearch;
      if (activeTab === "remote") return matchesSearch && internship.remote;
      if (activeTab === "active") return matchesSearch && internship.status === "Active";

      return matchesSearch;
    }) || [];

  const handleViewInternship = (id: string) => {
    navigate(`/internships/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Internship Programs | Gain Real-World Experience at DSPL"
        description="Apply for internship programs at Data Software Pvt Ltd (DSPL) and gain hands-on experience in data analytics, web development, and more."
        url="https://www.datasoftwareltd.com/internships"
      />

      <div className="relative gl-container overflow-hidden">
        <DotPattern className="absolute inset-0 opacity-20" />

        <div className="container mx-auto px-4">
          <div className="mb-10">
            <span className="text-sm font-medium text-primary/80 uppercase tracking-wider mb-4 block">
              Career Opportunities
            </span>
            <AnimatedText
              text="Explore Internship Opportunities"
              className="text-3xl md:text-4xl font-medium mb-6"
              tag="h1"
            />
            <p className="text-muted-foreground max-w-2xl">
              Find the perfect internship to gain valuable experience and advance your career in the tech industry
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, company or skill..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="remote">Remote</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {filteredInternships.length > 0 ? (
              filteredInternships.map((internship: Internship) => (
                <Card key={internship.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl">{internship.title}</CardTitle>
                      <Badge variant={internship.status === "Active" ? "default" : "secondary"}>
                        {internship.status}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-1" />
                      {internship.company}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>
                          {internship.location}
                          {internship.remote && " (Remote Available)"}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{internship.duration}</span>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {internship.skills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <Tag className="h-3 w-3 mr-1" />
                            {skill}
                          </Badge>
                        ))}
                        {internship.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{internship.skills.length - 3} more
                          </Badge>
                        )}
                      </div>

                      <Button className="w-full mt-4" onClick={() => handleViewInternship(internship.id)}>
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground mb-4">No internships found matching your criteria.</p>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setActiveTab("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Internships;
