import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Murid/Dashboard";

const DashboardMuridPage = () => {
  return (
    <DashboardLayout
      title="Dashboard"
      description="Dashboard Murid"
      type="murid"
    >
      <Dashboard />
    </DashboardLayout>
  );
};

export default DashboardMuridPage;
