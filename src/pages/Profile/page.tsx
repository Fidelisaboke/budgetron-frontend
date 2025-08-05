import AppLayout from "@/components/AppLayout.tsx";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import {Button} from "@/components/ui/button.tsx";
import {useAuth} from "@/contexts/AuthContext.tsx";

export default function ProfilePage() {
    const { user } = useAuth();

    return (
        <AppLayout title={"Profile"}>
            <div className="w-full flex lg:flex-row flex-col gap-8 max-w-7xl items-start">
                <Card className="w-full lg:w-1/3">
                    <CardHeader className="flex justify-center text-teal-700">
                        <Avatar className="w-20 h-20">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback className="text-xl font-semibold">User</AvatarFallback>
                        </Avatar>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                        <h2 className="text-xl font-bold text-teal-700">
                            {user?.username || "User"}
                        </h2>
                        <p className="text-gray-500">{user?.email || "someone@example.com"}</p>
                    </CardContent>
                </Card>
                <Card className="w-full lg:w-2/3">
                    <CardHeader>
                        <CardTitle>Profile Details</CardTitle>
                        <CardDescription>View your profile</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col">
                        <h3 className="mb-2 font-semibold">Username</h3>
                        <p className="mb-4 p-2 text-gray-500 border border-gray-400 rounded-md">
                            {user?.username || "User"}
                        </p>
                        <h3 className="mb-2 font-semibold">Email</h3>
                        <p className="mb-4 p-2 text-gray-500 border border-gray-400 rounded-md">
                            {user?.email || "someone@example.com"}
                        </p>
                        <div className="flex ml-auto">
                            <Button className="bg-teal-600 hover:bg-teal-800">
                                Edit
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}