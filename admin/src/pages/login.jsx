
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function SignInForm() {

  const apiUrl = "http://localhost:4000"
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });





  const handleInputChange = (name,value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {

    try {

   
      const response = await fetch(`${apiUrl}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful. Received data:", data);
       
        localStorage.setItem("token", JSON.stringify(data.token))
        localStorage.setItem("user", JSON.stringify(data.user))
       
      
      
      } else {
        console.error("Login failed. Status:", response.status);
       
      }
    } catch (error) {
      console.error("Error during login:", error);
  
    }
  };

  return (
    <div className="relative flex flex-col bg-black text-white justify-center items-center min-h-screen overflow-hidden">
        <h1 className=" text-4xl mt-5 font-bold"> Welcome To Survey Form</h1>
      <div className="w-full  m-auto h-full text-black bg-white lg:max-w-lg">
       
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
           LOG IN
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to sign up
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder=""
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                onChange={(e) => handleInputChange("password", e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button  className="w-full" onClick={handleSubmit}>
             login
            </Button>
            <p className="mt-2 text-xs text-center text-gray-700">
              need to have an account?{" "}
            
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
