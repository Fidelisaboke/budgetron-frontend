import AppLayout from "@/components/AppLayout";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { type RegisterSchema, registerSchema } from "@/schemas/register";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import PATHS from "@/routes/paths";
import apiClient from "@/api/apiClient";
import API_ENDPOINTS from "@/api/apiEndpoints";
import { toast } from "sonner";
import { handleFormErrors } from "@/utils/formErrorHandler";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const form = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirm_password: "",
        },
    });

    const onSubmit = async (data: RegisterSchema) => {
        try {
            setIsLoading(true);
            const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, data);
            if (response.status === 201) {
                toast.success("Registered successfully. Please login to continue.");
                navigate(PATHS.AUTH.LOGIN);
            }
        } catch (error: any) {
            handleFormErrors(error, form);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AppLayout>
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <Form {...form}>
                    <h2 className="text-2xl font-bold mb-4 text-center">Create an account</h2>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Username */}
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="johndoe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Email Address*/}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="johndoe@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Password */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormDescription className="text-gray-500 text-sm mb-2">
                                        Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.
                                    </FormDescription>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="********"
                                                {...field}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            >
                                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Confirm Password */}
                        <FormField
                            control={form.control}
                            name="confirm_password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="********"
                                                {...field}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            >
                                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <Button type="submit" disabled={isLoading} className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                            {isLoading ? <Loader2 className="animate-spin" /> : "Create Account"}
                        </Button>

                        <p className="text-sm text-gray-600 text-center">
                            Already have an account?
                            <Link to={PATHS.AUTH.LOGIN} className="text-teal-600 hover:underline hover:text-teal-700 ml-1">
                                Login
                            </Link>
                        </p>
                    </form>
                </Form>
            </div>
        </AppLayout>
    )
}