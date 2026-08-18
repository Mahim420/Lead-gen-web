import Link from "next/link";

const layout = ({ children }) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col">
        {/* Mobile Navbar */}
        <div className="navbar bg-base-100 border-b lg:hidden">
          <label
            htmlFor="dashboard-drawer"
            className="btn btn-square btn-ghost"
          >
            ☰
          </label>

          <h1 className="ml-2 text-xl font-bold">LeadGen AI</h1>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="dashboard-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <aside className="w-72 min-h-screen bg-base-200 border-r">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-primary">LeadGen AI</h2>
          </div>

          <ul className="menu p-4 text-base font-medium">
            <li>
              <Link href={"/dashboard"}>Dashboard</Link>
            </li>
            <li>
              <Link href={"/dashboard/gen-leads"}>Generate Leads</Link>
            </li>
            <li>
              <Link href={"/dashboard/leads"}>Generated Leads</Link>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default layout;
