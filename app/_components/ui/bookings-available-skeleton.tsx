import { Button } from "./button";
import { Skeleton } from "./skeleton";

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const BookingsAvailableSkeleton = () => {
  return (
    <div className="wrap-nowrap flex gap-2">
      {arr.map((e) => (
        <Button
          key={e}
          className="min-w-20 rounded-full border-[#d4ffd2b6] bg-[#d3ffd1b6]"
          variant={"outline"}
          asChild
        >
          <Skeleton />
        </Button>
      ))}
    </div>
  );
};

export default BookingsAvailableSkeleton;
