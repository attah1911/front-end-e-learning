import React from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DataAkun from "../../../components/views/Admin/DataAkun";
import PageHead from "../../../components/commons/PageHead";

const DataAkunPage: React.FC = () => {
  return (
    <DashboardLayout>
      <PageHead title="Data Akun" />
      <DataAkun />
    </DashboardLayout>
  );
};

export default DataAkunPage;
