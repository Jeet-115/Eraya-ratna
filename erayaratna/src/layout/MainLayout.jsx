import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <main className="bg-gradient-to-br from-[#FFD59F] to-[#FFB39F] pt-[90px]">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
