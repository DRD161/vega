import LoginPage from "@/components/LoginPage";

const Home = () => {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen">
      <main className="flex flex-col gap-8 row-start-2">
        <LoginPage />
      </main>
    </div>
  );
};

export default Home;
