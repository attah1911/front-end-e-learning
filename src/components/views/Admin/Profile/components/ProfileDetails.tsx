import React from "react";
import ProfileField from "./ProfileField";
import ProfileActions from "./ProfileActions";
import { IProfile, IProfileUpdate } from "../../../../../types/Profile";

interface ProfileDetailsProps {
  profile: IProfile;
  editableProfile: IProfileUpdate;
  isEditing: boolean;
  saving: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
  onEdit: () => void;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  profile,
  editableProfile,
  isEditing,
  saving,
  onChange,
  onSave,
  onCancel,
  onEdit,
}) => {
  return (
    <div className="md:w-2/3 p-8">
      <div className="space-y-6">
        <ProfileField
          label="Nama Lengkap"
          name="fullName"
          value={isEditing ? editableProfile.fullName : profile.fullName}
          isEditing={isEditing}
          onChange={onChange}
        />

        <ProfileField
          label="Username"
          name="username"
          value={isEditing ? editableProfile.username : profile.username}
          isEditing={isEditing}
          onChange={onChange}
        />

        <ProfileField
          label="Email"
          name="email"
          type="email"
          value={isEditing ? editableProfile.email : profile.email}
          isEditing={isEditing}
          onChange={onChange}
        />

        <ProfileField
          label="Bergabung Sejak"
          name="createdAt"
          value={profile.createdAt}
          isEditing={isEditing}
          type="date"
          readOnly={true}
        />

        <ProfileActions
          isEditing={isEditing}
          saving={saving}
          onSave={onSave}
          onCancel={onCancel}
          onEdit={onEdit}
        />
      </div>
    </div>
  );
};

export default ProfileDetails;
