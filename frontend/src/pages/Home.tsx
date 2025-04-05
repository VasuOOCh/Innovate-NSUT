import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";

const HomePage = () => {
  const features = [
    {
      title: "AI Mess Management",
      description:
        "Predict food demand, suggest meals, and analyze feedback using AI to reduce wastage and improve satisfaction.",
      href: "/",
    },
    {
      title: "Lost & Found",
      description:
        "Report or find lost items within your campus. A community-powered way to retrieve belongings quickly.",
      href: "/laf",
    },
    {
      title: "Scholarship Finder",
      description:
        "Discover scholarships tailored to your profile. Stay updated with latest opportunities and eligibility details.",
      href: "/scholarship",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 p-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Smart Campus Hub
      </h1>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center"
          >
            <Card className="w-full h-48 flex items-center justify-center rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <CardContent className="flex flex-col items-center justify-center">
                <LayoutGrid className="h-10 w-10 text-blue-500 mb-2" />
                <h2 className="text-xl font-semibold text-center text-gray-700">
                  {feature.title}
                </h2>
              </CardContent>
            </Card>
            <p className="mt-4 text-sm text-gray-600 text-center px-2">
              {feature.description}
            </p>
            <Button
              className="mt-2 text-sm rounded-xl px-5"
              onClick={() => (window.location.href = feature.href)}
            >
              Explore
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;