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
          {/* assetsData */}
          <DoughnutChart data={portfolioData} />
        </main>
      </div>
    );
  } catch (error: unknown) {
    let toastContent: string | React.ReactNode;

    if (typeof error === "string") {
      toastContent = error;
    } else if (error instanceof Error) {
      toastContent = error.message;
    } else {
      toastContent = "An unknown error occurred.";
    }

    return (
      <ErrorToast
        title="Oops! Something went wrong!"
        description="Unable to fetch data. Please try again later."
        toastContent={toastContent}
      />
    );
  }
};

export default Dashboard;
