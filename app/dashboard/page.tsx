import { fetchChartData } from "@/lib/utils";
import ErrorToast from "@/components/ErrorToast";

import DoughnutChart from "@/components/DoughnutChart";

const Dashboard = async () => {
  try {
    // const { assetsData, portfolioData, pricesData } = await fetchChartData();

    const { portfolioData } = await fetchChartData();

    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <DoughnutChart data={portfolioData} />
        </main>
      </div>
    );
  } catch (error: unknown) {
    console.error("Error fetching data:", error);

    return <ErrorToast />;
  }
};

export default Dashboard;
