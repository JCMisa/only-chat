import DataCards from "./_components/DataCards";
import { SpendingToRevenueChart } from "./_components/SpendingToRevenueChart";

interface UserProfilePageProps {
  params: Promise<{ clerkId: string }>;
}

const UserProfilePage = async ({ params }: UserProfilePageProps) => {
  const clerkId = await params.clerkId;
  return (
    <div className="flex flex-col space-y-20 w-full">
      {/* data cards */}
      <DataCards />
      {/* chart */}
      <SpendingToRevenueChart />
    </div>
  );
};

export default UserProfilePage;
