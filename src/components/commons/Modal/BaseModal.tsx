import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  isSubmitting?: boolean;
  showCloseButton?: boolean;
}

const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  isSubmitting = false,
  showCloseButton = true,
}) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size={size}
      scrollBehavior="inside"
      isDismissable={!isSubmitting}
      hideCloseButton={!showCloseButton || isSubmitting}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {title}
        </ModalHeader>
        <ModalBody>
          {children}
        </ModalBody>
        {footer && (
          <ModalFooter>
            {footer}
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default BaseModal;
