import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  MapPin,
  Calendar,
  Search,
  Building,
  Loader2,
  Users,
  Tag,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnimatedText from "@/components/ui/AnimatedText";
import { DotPattern } from "@/components/ui/dotPattern";
import { format, isPast } from "date-fns";
import { useCareers } from "@/hooks/useCareers";
import { toast } from "sonner";

const Careers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const { getCareers } = useCareers();
  const { data: careersData, isLoading, error } = getCareers();

  // Show error toast if there's an error loading careers
  if (error) {
    toast.error("Failed to load career positions");
  }

  // Filtering logic that safely handles undefined data
  const filteredCareers = useMemo(() => {
    if (!careersData || !Array.isArray(careersData)) {
      return [];
    }

    return careersData.filter((career) => {
    

      // First check if the career exists
      if (!career) return false;

      const matchesSearch =
        career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        career.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        career.location.toLowerCase().includes(searchTerm.toLowerCase());

      if (activeTab === "all") return matchesSearch;
      if (activeTab === "full-time")
        return matchesSearch && career.type === "Full-time";
      if (activeTab === "part-time")
        return matchesSearch && career.type === "Part-time";
      if (activeTab === "remote")
        return matchesSearch && career.type === "Remote";

      return matchesSearch;
    });
  }, [careersData, searchTerm, activeTab]);

  const handleViewCareer = (id) => {
    // Remove any quotes that might be wrapping the ID
    const cleanId = id.toString().replace(/^["'](.*)["']$/, "$1");
    navigate(`/careers/${cleanId}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="relative gl-container overflow-hidden">
      <DotPattern className="absolute inset-0 opacity-20" />

      <div className="container mx-auto px-4">
        <div className="mb-10">
          <span className="text-sm font-medium text-primary/80 uppercase tracking-wider mb-4 block">
            Career Opportunities
          </span>
          <AnimatedText
            text="Join Our Team"
            className="text-3xl md:text-4xl font-medium mb-6"
            tag="h1"
          />
          <p className="text-muted-foreground max-w-2xl">
            Discover exciting career opportunities and take the next step in
            your professional journey with us
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title, department or location..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Tabs
            defaultValue="all"
            className="w-full md:w-auto"
            onValueChange={setActiveTab}
            value={activeTab}
          >
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="full-time">Full-time</TabsTrigger>
              <TabsTrigger value="part-time">Part-time</TabsTrigger>
              <TabsTrigger value="remote">Remote</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredCareers && filteredCareers.length > 0 ? (
            filteredCareers.map((career) => (
              <Card
                key={career._id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl line-clamp-1">
                      {career.title}
                    </CardTitle>
                    <Badge
                      variant={
                        career.status === "Open" ? "default" : "secondary"
                      }
                    >
                      {career.status}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center">
                    <Building className="h-4 w-4 mr-1" />
                    {career.department}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{career.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Briefcase className="h-4 w-4 mr-1" />
                      <span>{career.type}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>
                        Deadline:{" "}
                        {format(new Date(career.deadline), "MMM d, yyyy")}
                        {isPast(new Date(career.deadline)) && (
                          <span className="text-red-500 ml-1">(Expired)</span>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-1" />
                      <span>
                        {career.positions} Position
                        {career.positions > 1 ? "s" : ""}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {career.qualifications &&
                        career.qualifications
                          .slice(0, 3)
                          .map((qualification, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              <Tag className="h-3 w-3 mr-1" />
                              {qualification}
                            </Badge>
                          ))}
                      {career.qualifications &&
                        career.qualifications.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{career.qualifications.length - 3} more
                          </Badge>
                        )}
                    </div>

                    <Button
                      className="w-full mt-4"
                      onClick={() => handleViewCareer(career._id)}
                      disabled={
                        career.status !== "Open" ||
                        isPast(new Date(career.deadline))
                      }
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground mb-4">
                No career positions found matching your criteria.
              </p>
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
  );
};

export default Careers;
