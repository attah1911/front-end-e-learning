import React from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DataMataPelajaran from "../../../components/views/Admin/DataMataPelajaran";
import PageHead from "../../../components/commons/PageHead";

const DataMataPelajaranPage: React.FC = () => {
  return (
    <DashboardLayout>
      <PageHead title="Data Mata Pelajaran" />
      <DataMataPelajaran />
    </DashboardLayout>
  );
};

export default DataMataPelajaranPage;
