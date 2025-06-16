import {
  BadgeDollarSign,
  TrendingUp,
  Handshake,
  HandCoins,
} from "lucide-react";

const DataCards = () => {
  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-4 gap-4 overflow-hidden">
      {/* first card */}
      <div className="flex flex-col gap-3 w-full p-4 rounded-lg bg-white/20 dark:bg-black/20 overflow-hidden">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm text-muted-foreground font-semibold">
            Total Spendings
          </h3>
          <HandCoins className="size-5 text-primary" />
        </div>
        <h1 className="font-bold text-2xl lg:text-4xl">$8,900.69</h1>
      </div>

      {/* second card */}
      <div className="flex flex-col gap-3 w-full p-4 rounded-lg bg-white/20 dark:bg-black/20 overflow-hidden">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm text-muted-foreground font-semibold">
            Usage Trend
          </h3>
          <TrendingUp className="size-5 text-primary" />
        </div>
        <h1 className="font-bold text-2xl lg:text-4xl">76%</h1>
      </div>

      {/* third card */}
      <div className="flex flex-col gap-3 w-full p-4 rounded-lg bg-white/20 dark:bg-black/20 overflow-hidden">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm text-muted-foreground font-semibold">
            Total Friends
          </h3>
          <Handshake className="size-5 text-primary" />
        </div>
        <h1 className="font-bold text-2xl lg:text-4xl">8.9K</h1>
      </div>

      {/* fourth card */}
      <div className="flex flex-col gap-3 w-full p-4 rounded-lg bg-white/20 dark:bg-black/20 overflow-hidden">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm text-muted-foreground font-semibold">
            Platform Revenue
          </h3>
          <BadgeDollarSign className="size-5 text-primary" />
        </div>
        <h1 className="font-bold text-2xl lg:text-4xl">$4,900.89</h1>
      </div>
    </div>
  );
};

export default DataCards;
