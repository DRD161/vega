"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DateSelect from "@/components/DateSelect";
import { PortfolioInterface, PositionsInterface } from "@/app/data/portfolio";
import { fetchChartData, formatDate, formatCurrency } from "@/lib/utils";
import { useEffect, useState, useMemo } from "react";

interface TableProps {
  data: PortfolioInterface[] | null;
}

const TableComponent = ({ data }: TableProps) => {
  const [tableData, setTableData] = useState<PositionsInterface[] | null>(null);
  const [totalValue, setTotalValue] = useState<string | null>(null);

  useEffect(() => {
    if (!data) return;

    const tablePositions: PositionsInterface[] = data.flatMap(
      (portfolio: PortfolioInterface) => portfolio.positions,
    );

    const sortedPositions: PositionsInterface[] = tablePositions.sort(
      (a: PositionsInterface, b: PositionsInterface) =>
        a.asset.localeCompare(b.asset),
    );

    setTableData(sortedPositions);
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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      {tableData && (
        <div className="w-full col-span-3">
          <DateSelect onDateChange={handleDateChange} />

          <Table>
            <TableCaption>A list of your assets and totals.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Asset</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>As Of</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((position, id) => (
                <TableRow key={id}>
                  <TableCell>{position.asset}</TableCell>
                  <TableCell>{position.quantity}</TableCell>
                  <TableCell>{formatCurrency.format(position.value)}</TableCell>
                  <TableCell>{formatDate(position.asOf)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter className="w-full">
              <TableRow>
                <TableCell colSpan={2}>Grand Total</TableCell>
                <TableCell className="text-right">{totalValue}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      )}
    </>
  );
};

export default TableComponent;
