import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form.tsx'
import { Input } from '@/components/ui/input'
import AppLayout from '@/components/AppLayout'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FaGoogle, FaGithub } from "react-icons/fa"
import { type LoginSchema, loginSchema } from '@/schemas/login'
import PATHS from '@/routes/paths'
import { useAuth } from '@/contexts/AuthContext'
import apiClient from '@/api/apiClient'
import API_ENDPOINTS from '@/api/apiEndpoints'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const onSubmit = async (data: LoginSchema) => {
        try {
            setIsLoading(true);
            const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, data);
            login(response.data.accessToken);
        } catch (error: any) {
            console.log(error);
            const apiError = error?.response?.data?.errors[0] || 'An error occurred';
            toast.error(apiError);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AppLayout>
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <Form {...form}>
                    <h2 className="text-2xl font-bold mb-4 text-center">Welcome Back!</h2>
                    <p className="text-sm text-gray-600 mb-4">Sign in to your account to continue.</p>
                    {/* Google Sign In */}
                    <div className="w-full flex flex-col items-center justify-center">
                        <Button type="button" className="mb-2 w-full border border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-900">
                            <FaGoogle />
                            Sign in with Google
                        </Button>
                        <Button type="button" className="mb-2 w-full border border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-900">
                            <FaGithub />
                            Sign in with GitHub
                        </Button>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="w-full h-[1px] bg-gray-300 my-4"></div>
                        <span className="px-2 text-gray-500">OR</span>
                        <div className="w-full h-[1px] bg-gray-300 my-4"></div>
                    </div>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Email Address */}
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

                        <div className="flex flex-row items-center justify-between">
                            <div className="flex items-center">
                                <Checkbox id="remember" />
                                <Label htmlFor="remember" className="ml-2">Remember me</Label>
                            </div>

                            <Link
                                to="/forgot-password"
                                className="text-sm text-teal-600 hover:underline hover:text-teal-700">
                                Forgot Password?
                            </Link>
                        </div>

                        <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white" disabled={isLoading}>
                            {isLoading ? <Loader2 className="animate-spin" /> : 'Log In'}
                        </Button>

                        <p className="text-sm text-gray-600 text-center">
                            Don&apos;t have an account?
                            <Link to={PATHS.AUTH.REGISTER} className="text-teal-600 hover:underline hover:text-teal-700 ml-1">
                                Register
                            </Link>
                        </p>

                    </form>
                </Form>
            </div>
        </AppLayout>
    )
}