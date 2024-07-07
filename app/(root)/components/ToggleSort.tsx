import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BiSort } from "react-icons/bi";

const ToggleSort = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <BiSort className="cursor-pointer" size={20} />
        </SheetTrigger>
        <SheetContent side={"right"}>hi</SheetContent>
      </Sheet>
    </>
  );
};

export default ToggleSort;
