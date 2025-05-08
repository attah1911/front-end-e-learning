import React from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DataGuru from "../../../components/views/Admin/DataGuru";
import PageHead from "../../../components/commons/PageHead";

const DataGuruPage: React.FC = () => {
  return (
    <DashboardLayout>
      <PageHead title="Data Guru" />
      <DataGuru />
    </DashboardLayout>
  );
};

export default DataGuruPage;
