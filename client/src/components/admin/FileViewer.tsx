
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText, Download, ExternalLink, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';

interface FileViewerProps {
  fileUrl: string;
  fileName?: string;
  publicId?: string;
  fileType?: 'document' | 'image' | 'pdf' | 'unknown';
}

const FileViewer = ({ fileUrl, fileName = 'File', publicId, fileType = 'unknown' }: FileViewerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Determine the correct icon and file type
  const guessFileType = () => {
    if (fileType !== 'unknown') return fileType;
    
    const url = fileUrl.toLowerCase();
    if (url.includes('.pdf')) return 'pdf';
    if (url.includes('.doc') || url.includes('.docx') || url.includes('.txt')) return 'document';
    if (url.includes('.jpg') || url.includes('.jpeg') || url.includes('.png') || url.includes('.gif')) return 'image';
    return 'unknown';
  };
  
  const actualFileType = guessFileType();

  const handleDownload = async () => {
    if (!fileUrl) {
      toast({
        title: "Error",
        description: "Download URL not available",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // If we have a publicId, use our API to get a download URL
      if (publicId) {
        const response = await axios.get(`/api/upload/download/${publicId}`, {
          params: { originalName: fileName }
        });
        
        if (response.data?.success && response.data?.data?.url) {
          // Create a temporary link and trigger download
          const link = document.createElement('a');
          link.href = response.data.data.url;
          link.setAttribute('download', response.data.data.originalName || fileName);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          // Fallback to direct URL
          window.open(fileUrl, '_blank');
        }
      } else {
        // Use the direct URL
        window.open(fileUrl, '_blank');
      }
      
      toast({
        title: "Success",
        description: "Download initiated",
      });
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Download Failed",
        description: "Could not download the file. Please try again.",
        variant: "destructive"
      });
      
      // Fallback to direct URL
      window.open(fileUrl, '_blank');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-2"
        onClick={() => setIsOpen(true)}
      >
        {actualFileType === 'image' ? (
          <img 
            src={fileUrl} 
            alt={fileName} 
            className="w-4 h-4 object-cover" 
          />
        ) : (
          <FileText className="h-4 w-4" />
        )}
        <span className="truncate max-w-[150px]">{fileName}</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{fileName}</span>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleDownload}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => window.open(fileUrl, '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          <div className="mt-4">
            {actualFileType === 'image' ? (
              <img 
                src={fileUrl} 
                alt={fileName} 
                className="max-w-full object-contain mx-auto" 
              />
            ) : actualFileType === 'pdf' ? (
              <iframe 
                src={`${fileUrl}#view=FitH`} 
                className="w-full h-[50vh]" 
                title={fileName}
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-10 border rounded-lg">
                <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-center">
                  This file cannot be previewed. Please download to view.
                </p>
                <Button 
                  className="mt-4" 
                  onClick={handleDownload}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Downloading...</>
                  ) : (
                    <><Download className="mr-2 h-4 w-4" /> Download {fileName}</>
                  )}
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FileViewer;
