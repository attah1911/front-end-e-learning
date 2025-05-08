import React from "react";

interface ProfileFieldProps {
  label: string;
  name: string;
  value: string;
  isEditing: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  readOnly?: boolean;
}

const ProfileField: React.FC<ProfileFieldProps> = ({
  label,
  name,
  value,
  isEditing,
  onChange,
  type = "text",
  readOnly = false
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {isEditing && !readOnly ? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <p className="text-gray-900 py-2">
          {type === 'date' 
            ? new Date(value).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })
            : value}
        </p>
      )}
    </div>
  );
};

export default ProfileField;
