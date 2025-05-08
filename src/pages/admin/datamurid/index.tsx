import React from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DataMurid from "../../../components/views/Admin/DataMurid";
import PageHead from "../../../components/commons/PageHead";

const DataMuridPage: React.FC = () => {
  return (
    <DashboardLayout>
      <PageHead title="Data Murid" />
      <DataMurid />
    </DashboardLayout>
  );
};

export default DataMuridPage;
