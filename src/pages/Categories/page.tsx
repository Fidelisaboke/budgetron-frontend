import AppLayout from "@/components/AppLayout.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { PlusIcon, SearchIcon, SquarePenIcon, TrashIcon, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCategories } from "@/hooks/useCategories";
import type { Category } from "@/schemas/category";
import { useState, useMemo } from "react";
import clsx from 'clsx';
import { Paginate } from "@/components/pagination/Paginate";

export default function CategoriesPage() {
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data: categoriesData, isLoading: categoriesLoading } = useCategories(page, limit);
    const categories = categoriesData?.items || [];

    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState("all");

    const filteredCategories = useMemo(() => {
        return categories.filter((category: Category) => {
            const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter = filterType === "all" || category.type === filterType;
            return matchesSearch && matchesFilter;
        })
    }, [categories, searchQuery, filterType]);

    const hasNextPage = Boolean(categoriesData?.next);
    const hasPrevPage = Boolean(categoriesData?.prev);

    return (
        <AppLayout title={"Categories"}>
            <div className="w-full flex flex-col sm:flex-row gap-6 mb-4">
                <Button className="bg-teal-600 hover:bg-teal-700 cursor-pointer focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2">
                    <PlusIcon />
                    Add Category
                </Button>

                <div className="relative flex items-center w-full sm:max-w-md">
                    <Input 
                        className="bg-white focus-visible:ring-teal-400 focus-visible:ring-offset-2" 
                        placeholder={"Search..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} 
                    />
                    <Button 
                        className="absolute right-0 h-full p-2 bg-transparent text-gray-500 hover:text-gray-700 hover:bg-transparent"
                        variant="ghost"
                        size="icon"
                    >
                        <SearchIcon className="w-4 h-4" />
                    </Button>
                </div>

                <Select onValueChange={setFilterType}>
                    <SelectTrigger className="w-[160px] bg-white">
                        <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                        <SelectItem value="income">Income</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {categoriesLoading ? (
                <div className="flex items-center justify-center">
                    <Loader2 className="animate-spin" />
                </div>
            ) : (
                <div className="space-y-4 w-full max-w-5xl mx-auto">
                    <div className="flex">
                        <Paginate
                            currentPage={page}
                            totalPages={categoriesData.pages}
                            onPageChange={setPage}
                        />
                    </div>


                    <Table className="bg-white border border-gray-300 rounded-md max-w-4xl">
                        <TableHeader className="bg-gray-50">
                            <TableRow>
                                <TableHead className="w-[200px]">Name</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Default?</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCategories.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-4">
                                        No categories match your search or filter.
                                    </TableCell>
                                </TableRow>
                            ): (
                                filteredCategories.map((category: Category) => (
                                    <TableRow key={category.id}>
                                        <TableCell className="font-medium">
                                            {category.name}
                                        </TableCell>
                                        <TableCell>
                                            <CategoryTypeLabel categoryType={category.type} />
                                        </TableCell>
                                        <TableCell>
                                            {category.is_default ? "Yes" : "No"}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                {category.is_default ? (
                                                    <span>-</span>
                                                ): 
                                                    <>
                                                        <Button className="bg-blue-600 hover:bg-blue-700">
                                                            <SquarePenIcon />
                                                        </Button>
                                                        <Button className="bg-red-500 hover:bg-red-600">
                                                            <TrashIcon />
                                                        </Button>
                                                    </>
                                                }
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}
        </AppLayout>
    );
}

function CategoryTypeLabel({categoryType}: {categoryType: string}){
    const baseStyles = "px-2 py-0.5 text-xs font-medium uppercase rounded-lg";
    let labelStyles;
    if(categoryType === "expense") {
        labelStyles = "bg-red-100 text-red-600";
    } else {
        labelStyles = "bg-green-100 text-green-600";
    }

    return <span className={clsx(baseStyles, labelStyles)}>{categoryType}</span>
}