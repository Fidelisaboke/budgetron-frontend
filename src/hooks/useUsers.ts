import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { fetchUsers, createUser } from "@/api/users";
import { toast } from "sonner";

export function useUsers(page: number, limit: number = 10) {
    return useQuery({
        queryKey: ["users", page, limit],
        queryFn: () => fetchUsers({ page, limit }),
        placeholderData: keepPreviousData
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