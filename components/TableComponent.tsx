"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DateSelect from "@/components/DateSelect";
import { PortfolioInterface, PositionsInterface } from "@/app/data/portfolio";
import { fetchChartData, formatDate, formatCurrency } from "@/lib/utils";
import React, { useEffect, useState, useMemo } from "react";

interface TableProps {
  data: PortfolioInterface[] | null;
}

const TableComponent = ({ data }: TableProps) => {
  const [tableData, setTableData] = useState<PositionsInterface[] | null>(null);
  const [totalValue, setTotalValue] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage: number = 6;

  useEffect(() => {
    if (!data) return;

    const tablePositions: PositionsInterface[] = data.flatMap(
      (portfolio: PortfolioInterface) => portfolio.positions,
    );

    const sortedPositions: PositionsInterface[] = tablePositions.sort((a, b) =>
      a.asset.localeCompare(b.asset),
    );

    setTableData(sortedPositions);
    setCurrentPage(1); // Reset to the first page when data changes
  }, [data]);

  const totalAssetValue: number | undefined = useMemo(() => {
    return tableData?.reduce((acc: number, { value }) => acc + value, 0);
  }, [tableData]);

  useEffect(() => {
    if (totalAssetValue) setTotalValue(formatCurrency.format(totalAssetValue));
  }, [totalAssetValue]);

  const handleDateChange = async (value: string) => {
    try {
      const portfolioData =
        value !== "Show All"
          ? await fetchChartData(`/api/portfolio?asOf=${value}`)
          : await fetchChartData(`/api/portfolio`);
      if (!portfolioData) {
        console.error("No data returned from fetchChartData");
        return;
      }

      setTableData(
        portfolioData?.flatMap((p: PortfolioInterface) => p.positions) || [],
      );
      setCurrentPage(1); // Reset to the first page on date change
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const totalPages = tableData ? Math.ceil(tableData.length / rowsPerPage) : 0;
  const paginatedData: PositionsInterface[] = useMemo(() => {
    if (!tableData) return [];
    const startIndex: number = (currentPage - 1) * rowsPerPage;
    const endIndex: number = startIndex + rowsPerPage;
    return tableData.slice(startIndex, endIndex);
  }, [tableData, currentPage]);

  return (
    <>
      {tableData && (
        <div className="w-full col-span-full mt-6">
          <Card className="col-start-6 col-span-10">
            <CardHeader>
              <CardTitle className="flex items-center text-lg font-bold">
                Positions Table
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-table ml-2 text-blue-900"
                >
                  <path d="M12 3v18" />
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M3 15h18" />
                </svg>
              </CardTitle>
              <CardDescription>
                Select a date from the dropdown to filter position data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DateSelect onDateChange={handleDateChange} />
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>As Of</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((position, id) => (
                    <TableRow key={id}>
                      <TableCell>{position.asset}</TableCell>
                      <TableCell>{position.quantity}</TableCell>
                      <TableCell>
                        {formatCurrency.format(position.value)}
                      </TableCell>
                      <TableCell>{formatDate(position.asOf)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter className="w-full">
                  <TableRow>
                    <TableCell colSpan={2}>Grand Total</TableCell>
                    <TableCell>{totalValue}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableFooter>
              </Table>

              <Pagination className="mt-4">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      className={`${currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} text-blue-900 border border-blue-900`}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          isActive={page === currentPage}
                          onClick={() => setCurrentPage(page)}
                          className={`${currentPage === page ? "pointer-events-none opacity-50" : "cursor-pointer"} text-blue-900 border border-blue-900`}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ),
                  )}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      className={`${currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} text-blue-900 border border-blue-900`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default TableComponent;
