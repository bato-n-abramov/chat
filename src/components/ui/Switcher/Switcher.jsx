import React from 'react';
import * as Switch from '@radix-ui/react-switch';
import './styles.scss';

const Switcher = ({ checked, onCheckedChange }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Switch.Root
     className="SwitchRoot"
      checked={checked}
      onCheckedChange={onCheckedChange}
    >
      <Switch.Thumb  className="SwitchThumb" />
    </Switch.Root>
  </div>
);

export default Switcher;
