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
    const getPageNumbers = () => {
        const pages: (number | "...")[] = [];

        // Always show first page
        pages.push(1);

        // Show Left ellipsis if needed
        if (currentPage > 4) {
            pages.push("...");
        }

        // Pages around current page
        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(totalPages - 1, currentPage + 1);
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        // Show right ellipsis if needed
        if (currentPage < totalPages - 3) {
            pages.push("...");
        }

        // Always show the last page (if not the same as first)
        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages; 
    };

    const pageNumbers = getPageNumbers();


    return (
        <Pagination>
            <PaginationContent className="justify-center">
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                        className={currentPage === 1? "pointer-events-none opacity-50": ""}
                    />
                </PaginationItem>
                {pageNumbers.map((pg, idx) => (
                    <PaginationItem key={idx}>
                        {pg === "..." ? (
                            <span className="px-3 py-1 text-muted-foreground">...</span>
                        ) : (
                            <Button
                                onClick={() => onPageChange(pg)}
                                variant="outline"
                                disabled={pg === currentPage}
                                className={`px-3 py-1 cursor-pointer rounded ${
                                    pg === currentPage ? "bg-teal-600 text-white hover:bg-teal-700 hover:text-white": "hover:bg-muted"
                                }`}
                            >
                                {pg}
                            </Button>
                        )}
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