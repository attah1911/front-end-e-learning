import React from "react";
import PageContainer from "@/components/commons/PageContainer";
import PageHeader from "@/components/commons/PageHeader";

const Dashboard: React.FC = () => {
  return (
    <PageContainer>
      <PageHeader 
        title="Dashboard" 
        description="Selamat datang di halaman Dashboard Admin" 
      />
      {/* Add dashboard content components here */}
    </PageContainer>
  );
};

export default Dashboard;
