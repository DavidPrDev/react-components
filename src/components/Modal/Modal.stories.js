import React from 'react';
import Modal from './Modal';

export default {
  title: 'Modal',
  component: Modal,
  tags: ['autodocs'],

};

export const Basic = (args) => (
  <Modal {...args}>
    {args.children}
  </Modal>
);

Basic.args = {
  isOpen: true,
  confirm:false,
  direction: 'right',
  title: 'Modal title' ,
  setOpen: () => Basic.args.isOpen = false,
  setConfirm: () => Basic.args.isOpen = false,
  children: 'This is the content of the modal.'
};

Basic.parameters = {
  docs: {
    description: {
      story: 'This is a basic example of a modal.'
    }
  }
};
