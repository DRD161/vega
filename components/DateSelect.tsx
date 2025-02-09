import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate } from "@/lib/utils";

interface DateSelectProps {
  onDateChange: (selectedDate: string) => void;
}

const options: string[] = ["2024-06-01", "2024-07-01", "2024-08-01"];

const DateSelect = ({ onDateChange }: DateSelectProps) => {
  return (
    <Select onValueChange={onDateChange}>
      <SelectTrigger className="w-[180px] focus:ring-blue">
        <SelectValue placeholder="Select Date" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Show All">Show All</SelectItem>
        {options.map((option: string, index: number) => (
          <SelectItem key={index} value={option}>
            {formatDate(option)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DateSelect;
