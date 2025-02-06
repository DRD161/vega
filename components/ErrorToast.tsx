"use client";

import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";

const ErrorToast = () => {
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "Oops! Something went wrong!",
      description: "Unable to fetch data. Please try again later.",
      variant: "destructive",
    });
  }, [toast]);

  return (
    <>
      <Toaster />
    </>
  );
};

export default ErrorToast;
