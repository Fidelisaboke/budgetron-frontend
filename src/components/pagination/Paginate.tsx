import { 
    Pagination, 
    PaginationContent, 
    PaginationItem, 
    PaginationNext, 
    PaginationPrevious 
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

type PaginateProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Paginate({ currentPage, totalPages, onPageChange }: PaginateProps) {
    return (
        <Pagination>
            <PaginationContent className="justify-center">
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                        className={currentPage === 1? "pointer-events-none opacity-50": ""}
                    />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                    <PaginationItem key={pg}>
                    <Button
                        onClick={() => onPageChange}
                        variant="outline"
                        className={`px-3 py-1 cursor-pointer rounded ${
                            pg === currentPage ? "bg-teal-600 text-white hover:bg-teal-700 hover:text-white": "hover:bg-muted"
                        }`}
                        >
                        {pg}
                    </Button>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext
                        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}