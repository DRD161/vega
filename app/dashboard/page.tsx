import { fetchChartData } from "@/lib/utils";
import ErrorToast from "@/components/ErrorToast";
import DoughnutChart from "@/components/DoughnutChart";
import TableComponent from "@/components/TableComponent";
import LineChart from "@/components/LineChart";
import LogoutLink from "@/components/LogoutLink";

const Dashboard = async () => {
  try {
    const portfolioData: [] | null = await fetchChartData(
      "http://localhost:3000/api/portfolio",
    );

    const pricesData: [] | null = await fetchChartData(
      "http://localhost:3000/api/prices",
    );

    return (
      <main>
        <section className="grid grid-cols-12 auto-rows-max pt-20 px-10 sm:px-20">
          <LogoutLink label="Logout" />
          <DoughnutChart data={portfolioData} />
          <LineChart portfolio={portfolioData} data={pricesData} />
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
