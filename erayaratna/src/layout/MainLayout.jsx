import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <main className="">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
