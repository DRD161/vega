import { fetchChartData } from "@/lib/utils";
import ErrorToast from "@/components/ErrorToast";

import DoughnutChart from "@/components/DoughnutChart";
import TableComponent from "@/components/TableComponent";

const Dashboard = async () => {
  try {
    const portfolioData = await fetchChartData(
      "http://localhost:3000/api/portfolio",
    );
    return (
      <main className="grid auto-rows-auto items-center justify-items-center min-h-screen">
        <section>
          <DoughnutChart data={portfolioData} />
          <TableComponent data={portfolioData} />
        </section>
      </main>
    );
  } catch (error: unknown) {
    console.error("Error fetching data:", error);

    return <ErrorToast />;
  }
};

export default Dashboard;
