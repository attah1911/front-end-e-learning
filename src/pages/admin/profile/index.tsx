import React from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import Profile from "../../../components/views/Admin/Profile/Profile";
import PageHead from "../../../components/commons/PageHead";

const AdminProfilePage: React.FC = () => {
  return (
    <DashboardLayout>
      <PageHead title="Profil Admin" />
      <div className="p-6">
        <div className="-mt-16 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Profil Saya</h1>
          <p className="text-gray-600">Kelola informasi profil Anda</p>
        </div>
        <Profile />
      </div>
    </DashboardLayout>
  );
};

export default AdminProfilePage;
