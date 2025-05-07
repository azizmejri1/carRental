"use client";
import { useState } from "react";
import EditProfileModal from "./EditProfileModal";
import ChangePasswordModal from "./ChangePasswordModal";
import { ProfileCardProps } from "@/app/types";
import ProfileInfo from "./profileInfo";

export default function ProfileCard({
  user,
  activated,
  onUpdate,
}: ProfileCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  if (!user) return null;

  return (
    <>
      <ProfileInfo
        user={user}
        activated={activated}
        onEditClick={() => setIsEditModalOpen(true)}
        onChangePasswordClick={() => setIsPasswordModalOpen(true)}
      />

      <EditProfileModal
        user={user}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={onUpdate}
      />

      <ChangePasswordModal
        userId={user.id}
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </>
  );
}
