import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, createUser } from "@/api/users";
import { toast } from "sonner";

export function useUsers() {
    return useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
    });
}

export function useCreateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.success("User created successfully.");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })
}