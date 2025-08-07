import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {
    categoryFormSchema,
    type CategoryFormInput,
} from "@/schemas/category";
import { zodResolver } from "@hookform/resolvers/zod";
import {Loader2} from "lucide-react";

type CategoryFormModalProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: CategoryFormInput ) => void;
    initialData?: CategoryFormInput;
    isLoading?: boolean;
    isEditing?: boolean;
}

export default function CategoryFormModal(
    { open, onClose, onSubmit, initialData, isLoading, isEditing }: CategoryFormModalProps
) {
    const form = useForm<CategoryFormInput>({
        resolver: zodResolver(categoryFormSchema),
        defaultValues: initialData || { name: "", type: "expense" },
    });

    useEffect(() => {
        form.reset(initialData || { name: "", type: "expense" });
    }, [initialData, form]);

    const submitHandler = (data: CategoryFormInput) => {
        onSubmit(data);
    }


    return (
        <Dialog open={open} onOpenChange={(onClose)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Edit Category" : "Add Category"}</DialogTitle>
                          <DialogDescription>
                              {isEditing ? "Update the category details." : "Add a new category."}
                          </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-4">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter category name..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="type" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category Type</FormLabel>
                                <Select value={field.value || undefined} onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder={"Select Type"} />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="expense">Expense</SelectItem>
                                        <SelectItem value="income">Income</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}/>
                        <DialogFooter>
                            <Button onClick={onClose} type="button" variant="outline" disabled={isLoading}>
                                Cancel
                            </Button>
                            <Button className="bg-teal-600 hover:bg-teal-700" type="submit" disabled={isLoading}>
                                {isLoading && <Loader2 className="animate-spin mr-2 h-4 w-4"/>}
                                {isEditing ? "Update": "Create"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}