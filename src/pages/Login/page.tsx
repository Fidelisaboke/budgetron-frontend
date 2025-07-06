import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form.tsx'
import { Input } from '@/components/ui/input'
import AppLayout from '@/components/AppLayout'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff, Mail } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'

import { type LoginSchema, loginSchema } from '@/schemas/login'


export default function LoginPage() {
    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (data: LoginSchema) => {
        //
    }

    return (
        <AppLayout>
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <Form {...form}>
                    <h2 className="text-2xl font-bold mb-4 text-center">Welcome Back!</h2>
                    <p className="text-sm text-center text-gray-600 mb-8">Please enter your details to login.</p>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {/* Email Address */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="johndoe@example.com" {...field} />
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

                        <div className="flex items-center justify-between">
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

                        <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                            Log In
                        </Button>

                    </form>
                </Form>
            </div>
        </AppLayout>
    )
}