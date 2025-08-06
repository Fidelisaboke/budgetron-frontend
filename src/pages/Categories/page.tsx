import AppLayout from "@/components/AppLayout.tsx";
import {Button} from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { PlusIcon, SearchIcon, SquarePenIcon, TrashIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


export default function CategoriesPage() {
    return (
        <AppLayout title={"Categories"}>
            <div className="w-full flex flex-col sm:flex-row gap-6 mb-4">
                <Button className="bg-teal-600 hover:bg-teal-700 cursor-pointer focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2">
                    <PlusIcon />
                    Add Category
                </Button>
                <div className="relative flex items-center w-full sm:max-w-md">
                    {/* TODO: Implement Dynamic Searching */}
                    <Input className="bg-white focus-visible:ring-teal-400 focus-visible:ring-offset-2" placeholder={"Search..."} />
                    <Button 
                        className="absolute right-0 h-full p-2 bg-transparent text-gray-500 hover:text-gray-700 hover:bg-transparent"
                        variant="ghost"
                        size="icon"
                    >
                        <SearchIcon className="w-4 h-4" />
                    </Button>
                </div>
                {/* TODO: Implement Filtering */}
                <Select>
                    <SelectTrigger className="w-[160px] bg-white">
                        <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                        {/* TODO: Map categories here. */}
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                        <SelectItem value="income">Income</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Table className="bg-white border border-gray-300 rounded-md">
                <TableHeader className="bg-gray-50">
                    <TableRow>
                        <TableHead className="w-[200px]">Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Usage (%)</TableHead>
                        <TableHead>Default?</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* TODO: Add mapping for categories */}
                    <TableRow>
                        <TableCell className="font-medium">Groceries</TableCell>
                        <TableCell>
                            <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-medium rounded-lg">Expense</span>
                        </TableCell>
                        <TableCell>60</TableCell>
                        <TableCell>Yes</TableCell>
                        <TableCell>
                            <div className="flex gap-2">
                                <Button className="bg-blue-600 hover:bg-blue-700"><SquarePenIcon /></Button>
                                <Button className="bg-red-500 hover:bg-red-600"><TrashIcon /></Button>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </AppLayout>
    );
}