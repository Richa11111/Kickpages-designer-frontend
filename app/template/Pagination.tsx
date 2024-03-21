import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
interface MyPaginationComponentProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}
const MyPaginationComponent = ({ totalPages, currentPage, onPageChange }: MyPaginationComponentProps) => {
  let pageNumbers = [];
  for (let p = 1; p <= totalPages; p++) {
    if (p === 1 || p === totalPages || (p >= currentPage - 2 && p <= currentPage + 2)) {
      pageNumbers.push(p);
    }
  }

 
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem >
          <PaginationPrevious onClick={() => currentPage > 1 && onPageChange(currentPage - 1)} />
        </PaginationItem>

        {pageNumbers.map((page) => (
          <PaginationItem key={page} className="mx-1">
            <PaginationLink
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 border ${currentPage === page ? 'bg-blue-500 text-white' : 'text-gray-700 bg-white hover:bg-gray-100'} transition duration-150 ease-in-out rounded`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {pageNumbers.length < totalPages && (
          <PaginationEllipsis />
        )}

        <PaginationItem >
          <PaginationNext onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default MyPaginationComponent;
