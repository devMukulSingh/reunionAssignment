import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FiFilter } from "react-icons/fi";

const ToggleFilters = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <FiFilter className="cursor-pointer" size={20} />
        </SheetTrigger>
        <SheetContent side={"right"}>hi</SheetContent>
      </Sheet>
    </>
  );
};

export default ToggleFilters;
