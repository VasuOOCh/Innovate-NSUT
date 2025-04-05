"use client";

import { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import CloudinaryUploadWidget from "@/lib/UploadWidget";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Query = () => {
    const {currentUser} = useSelector((self : any) => self.user)

    if(!currentUser) {
        return <Navigate to="/signin" replace />;
    }
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    location: ""
  });

  const cloudName = "dzgqb4bb6";
  const uploadPreset = "ctrlwin";

  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const uwConfig = {
    cloudName,
    uploadPreset,
    multiple: true,
    theme: "purple",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setError(null);
      
      const res = await axios.post("/laf/upload", {
        ...formData,
        images,
      });

      setSuccess("Query submitted successfully!");
      setFormData({ name: "", desc: "", location: "" });
      setImages([]);
    } catch (err) {
      console.error(err);
      setError("Failed to submit query. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Upload Your Query
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Name</label>
                <Input 
                  placeholder="Your name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  placeholder="Detailed description of your query"
                  className="min-h-[120px]"
                  name="desc"
                  value={formData.desc}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <Input 
                  placeholder="Where is this located?" 
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Images</label>
                <CloudinaryUploadWidget
                  uwConfig={uwConfig}
                  setPublicId={setImages}
                />
                {images.length > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {images.length} image(s) selected
                  </p>
                )}
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert variant="success">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Query"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Query;