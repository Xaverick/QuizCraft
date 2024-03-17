
import { useState } from "react";
require('dotenv').config();
import { useToast } from "@/components/ui/use-toast"

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserProvider, useUserContext } from "@/lib/contextapi/UserProvider";
export default function SignUpForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const { toast } = useToast();
  const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_API_URL;
  const handleInputChange = (name,value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const { state, dispatch } = useUserContext();
    


  const handleSubmit = async () => {
    console.log(formData);
    try {
      const response = await fetch(`${apiUrl}/api/v1/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User registered successfully:", data.user);
        // Optionally, you can clear the form data after successful registration
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
        setUser(data.user);
        toast({
          title: "Success",
          description: "User registered successfully"
          
        });
        console.log(state.user)
        localStorage.setItem("token", JSON.stringify(data.token))
        localStorage.setItem("user", JSON.stringify(data.user))
        window.location.href = "/Dashboard";

      } else {
        const errorData = await response.json();
        console.error("Error registering user:", errorData.message);
        toast({
          title: "Error",
          description: errorData.message || "Error registering user",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast({
        title: "Error",
        description: error.message || "Error registering user",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center bg-black text-white min-h-screen overflow-hidden">
              <h1 className=" text-4xl mt-5 font-bold"> Welcome To Survey Form</h1>
      <div className="w-full m-auto bg-white text-black lg:max-w-lg">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              Create an account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your details to sign up
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                type="text"
                placeholder=""
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                value={formData.firstName}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                type="text"
                placeholder=""
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                value={formData.lastName}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder=""
                onChange={(e) => handleInputChange("email", e.target.value)}
                value={formData.email}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                onChange={(e) => handleInputChange("password", e.target.value)}
                value={formData.password}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" onClick={handleSubmit}>
              Sign Up
            </Button>
            {/* Optionally, add a link to your login page */}
            <p className="mt-2 text-xs text-center text-gray-700">
              Already have an account?{" "}
              <span className="text-blue-600 hover:underline">Sign In</span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
