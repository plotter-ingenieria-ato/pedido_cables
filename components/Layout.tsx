import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <div className="flex">

      <Sidebar />

      <div className="flex-1">

        <Header />

        <main className="p-8 bg-slate-100 min-h-screen">
          {children}
        </main>

      </div>

    </div>

  );
}