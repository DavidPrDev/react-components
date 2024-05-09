import React from 'react';
import TooltipComponent from './Tooltip';

export default {
  title: 'Tooltip',
  component: TooltipComponent,
  tags: ['autodocs'],

};

export const Tooltip = (args) => (
  <TooltipComponent {...args}/>
);

Tooltip.args = {
  text:'tooltip',
  direction:'top',
  children: 'Text example',
 
 
};

Tooltip.parameters = {
  docs: {
    description: {
      story: 'This is a  example of tooltip.'
    }
  }
};
