import React from 'react';
import Modal from './Modal';

export default {
  title: 'Modal',
  component: Modal,
  tags: ['autodocs'],

};

// Define la historia Basic
export const Basic = (args) => (
  <Modal {...args}>
    {/* Contenido del modal */}
    {args.children}
  </Modal>
);

Basic.args = {
  isOpen: true,
  confirm:false,
  direction: 'right',
  title: 'Título del Modal',
  setOpen: () => Basic.args.isOpen = false,
  setConfirm: () => Basic.args.isOpen = false,
  children: 'Este es el contenido del modal.' // Contenido por defecto
};

Basic.parameters = {
  docs: {
    description: {
      story: 'Este es un ejemplo básico de un modal.'
    }
  }
};
