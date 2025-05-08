import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import authServices from "../../../../services/auth.service";
import mediaServices from "../../../../services/media.service";
import { IProfile, IProfileUpdate } from "../../../../types/Profile";
import { SessionExtended } from "../../../../types/Auth";
import NotificationAlert from "@/components/commons/NotificationAlert/NotificationAlert";
import ProfileSidebar from "./components/ProfileSidebar";
import ProfileDetails from "./components/ProfileDetails";

const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const Profile: React.FC = () => {
  const { data: session } = useSession() as { data: SessionExtended | null };
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [editableProfile, setEditableProfile] = useState<IProfileUpdate>({
    fullName: "",
    username: "",
    email: "",
    profilePicture: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await authServices.getProfileWithToken(session?.accessToken || "");
      const profileData = response.data.data || response.data;
      setProfile(profileData);
      setEditableProfile({
        fullName: profileData.fullName || "",
        username: profileData.username || "",
        email: profileData.email || "",
        profilePicture: profileData.profilePicture || ""
      });
      setLoading(false);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Gagal memuat data profil";
      setError(errorMessage);
      setLoading(false);
      console.error("Error loading profile:", err);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorUpload("File harus berupa gambar");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setErrorUpload("Ukuran file terlalu besar (maksimal 2MB)");
      return;
    }

    try {
      setUploading(true);
      setErrorUpload("");
      
      const response = await mediaServices.uploadSingle(file);
      const imageUrl = response.data.data.url;

      const updateResponse = await authServices.updateProfile({
        ...editableProfile,
        profilePicture: imageUrl
      });

      if (updateResponse.data) {
        setProfile(prev => prev ? { ...prev, profilePicture: imageUrl } : null);
        setEditableProfile(prev => ({ ...prev, profilePicture: imageUrl }));
        setSuccessMessage("Foto profil berhasil diperbarui");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error: any) {
      console.error("Error uploading image:", error);
      setErrorUpload(error.response?.data?.message || "Gagal mengupload gambar");
    } finally {
      setUploading(false);
    }
  };

  const handleEditToggle = () => {
    if (profile) {
      setEditableProfile({
        fullName: profile.fullName || "",
        username: profile.username || "",
        email: profile.email || "",
        profilePicture: profile.profilePicture || ""
      });
    }
    setIsEditing(!isEditing);
    setError("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableProfile({
      ...editableProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const fullName = editableProfile.fullName.trim();
      const username = editableProfile.username.trim();
      const email = editableProfile.email.trim();

      if (!fullName) {
        setError("Nama lengkap harus diisi");
        return;
      }
      if (!username) {
        setError("Username harus diisi");
        return;
      }
      if (!email) {
        setError("Email harus diisi");
        return;
      }
      if (!validateEmail(email)) {
        setError("Format email tidak valid");
        return;
      }

      const updateData: IProfileUpdate = {
        fullName,
        username,
        email,
        profilePicture: editableProfile.profilePicture
      };

      const response = await authServices.updateProfile(updateData);
      
      if (response.data) {
        setProfile(response.data.data || response.data);
        setIsEditing(false);
        setError("");
        setSuccessMessage("Profil berhasil diperbarui");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (err: any) {
      let errorMessage = "Gagal menyimpan perubahan profil";
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      setError(errorMessage);
      console.error("Error updating profile:", err.response?.data || err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center text-red-600 p-4">
        Data profil tidak ditemukan
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {(error || errorUpload || successMessage) && (
        <NotificationAlert
          message={error || errorUpload || successMessage}
          type={error || errorUpload ? "error" : "success"}
          onClose={() => {
            setError("");
            setErrorUpload("");
            setSuccessMessage("");
          }}
        />
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <ProfileSidebar
            profile={profile}
            uploading={uploading}
            onFileSelect={handleFileChange}
            errorUpload={errorUpload}
          />
          <ProfileDetails
            profile={profile}
            editableProfile={editableProfile}
            isEditing={isEditing}
            saving={saving}
            onChange={handleChange}
            onSave={handleSave}
            onCancel={handleEditToggle}
            onEdit={handleEditToggle}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
