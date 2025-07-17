import { type FieldValues, type Path, type UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

export function handleFormErrors<T extends FieldValues>(
    error: any,
    form: UseFormReturn<T>
) {
    const fieldErrors = error?.response?.data?.errors;
    if (fieldErrors && typeof fieldErrors === "object") {
        Object.entries(fieldErrors).forEach(([field, messages]) => {
            form.setError(field as Path<T>, {
                type: "server",
                message: Array.isArray(messages) ? messages[0] : messages,
            });
        });
    } else if (error?.response?.data?.error) {
        toast.error(error.response.data.error);
    } else {
        toast.error("Oops! Something went wrong.");
    }
}