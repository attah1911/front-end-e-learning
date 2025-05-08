import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  userName: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  userName
}) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      backdrop="opaque"
      placement="center"
      classNames={{
        backdrop: "bg-black/50"
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Konfirmasi Hapus User
            </ModalHeader>
            <ModalBody>
              <p>
                Apakah Anda yakin ingin menghapus user <span className="font-semibold">{userName}</span>?
              </p>
              <p className="text-sm text-gray-500">
                Tindakan ini tidak dapat dibatalkan.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button 
                color="default" 
                variant="light" 
                onPress={onClose}
                isDisabled={isLoading}
              >
                Batal
              </Button>
              <Button 
                color="danger" 
                onPress={onConfirm}
                isLoading={isLoading}
                isDisabled={isLoading}
              >
                Hapus
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmationModal;
