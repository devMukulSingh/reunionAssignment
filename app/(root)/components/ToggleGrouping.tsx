import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BsStack } from "react-icons/bs";
import { Ttable } from "../page";

type Props = {
  table : Ttable
}
const ToggleGrouping = ({table}:Props) => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <BsStack className="cursor-pointer" size={20} />
        </SheetTrigger>
        <SheetContent side={"right"}>hi</SheetContent>
      </Sheet>
    </>
  );
};

export default ToggleGrouping;
