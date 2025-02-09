"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loader from "@/components/Loader";

type FormType = z.infer<typeof formSchema>;

const formSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must be at least 4 characters." })
    .max(50)
    .refine((value) => value === "admin", {
      message: "Invalid username. Please try again.",
    }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(50)
    .refine((value) => value === "password123", {
      message: "Invalid password. Please try again.",
    }),
});

const LoginForm = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const credentials = {
    username: "admin",
    password: "password123",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "" as FormType["username"],
      password: "" as FormType["password"],
    },
  });

  const onLogin = (values: z.infer<typeof formSchema>) => {
    if (
      values.username === credentials.username &&
      values.password === credentials.password
    ) {
      localStorage.setItem("credentials", JSON.stringify(credentials));
      setIsLoading(false);
      router.push("/dashboard");
    }
  };

  useEffect(() => {
    const credentialsFromStorage = localStorage.getItem("credentials");
    if (credentialsFromStorage) {
      setIsLoggedIn(true);
      router.push("/dashboard");
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loader className="stroke-blue-900" size={50} />;
  }

  return (
    <>
      {!isLoggedIn && (
        <Card className="lg:px-8 lg:py-6">
          <CardHeader>
            <CardTitle className="text-center">
              <h1 className="text-2xl mb-3">Welcome!</h1>
              <h2 className="text-md">Please login to view your finances.</h2>
              <hr className="mt-6" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onLogin)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          className="focus-visible:ring-blue"
                          placeholder="Enter username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          className="focus-visible:ring-blue"
                          placeholder="Enter password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="font-bold bg-blue-900 focus-visible:ring-blue hover:bg-blue-500"
                  type="submit"
                >
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default LoginForm;
