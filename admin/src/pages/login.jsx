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
  const apiUrl = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (name, value) => {
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

        localStorage.setItem("token", JSON.stringify(data.token));
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("expiresIn", JSON.stringify(data.expiresIn));
        alert("Login successful");
        window.location.href = "/";
      } else {
        console.error("Login failed. Status:", response.status);
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed");
    }
  };

  return (
    <div className="relative flex flex-col lg:flex-row  text-white min-h-screen overflow-hidden">
      {/* Left Panel - You need to login first */}
      <div className="lg:w-1/2 bg-gray-800 lg:min-h-screen min-h-[30vh] flex justify-center items-center">
        <div className="max-w-lg p-8">
          <h1 className="text-4xl font-bold mb-8 text-center">Welcome To Geek Clash Admin Panel</h1>
          {/* <h1 className="text-4xl font-bold mb-8 text-center">You Need to Login First</h1> */}
          <p className="text-lg text-center">You Need to Login First</p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="lg:w-1/2 bg-white lg:min-h-screen flex justify-center items-center">
        <div className="max-w-md w-full p-8">
          <h1 className="text-4xl font-bold mb-8 text-center">QuizCraft Admin Panel</h1>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">
                LOG IN
              </CardTitle>
              <CardDescription className="text-center">
                Enter your email and password to sign in
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
              <Button className="w-full" onClick={handleSubmit}>
                Login
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

