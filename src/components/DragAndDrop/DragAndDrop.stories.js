import React from 'react';
import DragAndDrop from './DragAndDrop';

export default {
  title: 'Drag and drop',
  component: DragAndDrop,
  tags: ['autodocs'],

};

export const Drag = (args) => (
  <DragAndDrop {...args}/>
);

Drag.args = {
  multiple : true,
  type:'document',
  setFile: () => Drag.args.file,
  file:null
 
};

Drag.parameters = {
  docs: {
    description: {
      story: 'This is a basic example of drag and drop component.'
    }
  }
};
