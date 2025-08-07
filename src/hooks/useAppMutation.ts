import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";


type UseAppMutationProps<TData, TVariables> = {
    mutationFn: (variables: TVariables) => Promise<TData>;
    queryKey?: string;
    successMsg?: string;
    errorMsg?: string;
    onSuccess?: (data: TData) => void;
    onError?: (error: unknown) => void;
};

export function useAppMutation<TData = unknown, TVariables = void>({
    mutationFn,
    queryKey,
    successMsg,
    errorMsg,
    onSuccess,
    onError,
}: UseAppMutationProps<TData, TVariables>) {
    const queryClient = useQueryClient();

    return useMutation<TData, Error, TVariables>({
        mutationFn,
        onSuccess: (data) => {
            if (queryKey) queryClient.invalidateQueries({ queryKey: [queryKey] });
            if (successMsg) toast.success(successMsg);
            if (onSuccess) onSuccess(data);
        },
        onError: (error) => {
            toast.error(errorMsg ?? error.message ?? "Oops, Something went wrong!");
            if (onError) onError(error);
        },
    });

}