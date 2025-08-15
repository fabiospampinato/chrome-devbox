
/* IMPORT */

import './styles.css';
import {$$} from 'voby';
import type {Props} from './types';

/* MAIN */

const ToolButton = ( { tool }: Props ): JSX.Element => {

  const name = () => $$(tool).name;
  const shortcut = () => $$(tool).shortcut;
  const onClick = () => $$(tool).trigger ();

  return (
    <button class="devbox-tool-button" tabIndex={0} title={name} onClick={onClick}>
      <div class="devbox-tool-button-name">
        {name}
      </div>
      <div class="devbox-tool-button-shortcut">
        {shortcut}
      </div>
    </button>
  );

};

/* EXPORT */

export default ToolButton;
