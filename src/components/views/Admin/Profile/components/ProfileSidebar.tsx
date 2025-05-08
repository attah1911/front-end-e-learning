import React from "react";
import ProfilePicture from "./ProfilePicture";
import { IProfile } from "../../../../../types/Profile";

interface ProfileSidebarProps {
  profile: IProfile;
  uploading: boolean;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorUpload?: string;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  profile,
  uploading,
  onFileSelect,
  errorUpload
}) => {
  return (
    <div className="md:w-1/3 p-8 bg-gray-50 flex flex-col items-center">
      <ProfilePicture
        src={profile.profilePicture}
        alt={profile.fullName}
        uploading={uploading}
        onFileSelect={onFileSelect}
      />
      {errorUpload && (
        <div className="mt-2 text-sm text-red-600 text-center">
          {errorUpload}
        </div>
      )}
      <h2 className="mt-4 text-xl font-semibold text-gray-900">
        {profile.fullName}
      </h2>
      <p className="text-gray-500">{profile.role}</p>
    </div>
  );
};

export default ProfileSidebar;
