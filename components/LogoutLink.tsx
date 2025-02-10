"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface LogoutLinkProps {
  label: string;
}

const LogoutLink = ({ label }: LogoutLinkProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = () => {
    const value: string | null = localStorage.getItem("credentials");
    if (value) localStorage.removeItem("credentials");
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {!isLoading && (
        <Button
          className="w-max bg-blue-900 focus-visible:ring-blue hover:bg-blue-500 font-bold py-4 mb-6"
          type="button"
          data-testid="logoutButton"
        >
          <Link className="flex items-center" href="/" onClick={handleLogout}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-left mr-2"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            {label}
          </Link>
        </Button>
      )}
    </>
  );
};
export default LogoutLink;
