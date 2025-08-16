
/* IMPORT */

import './styles.css';
import {$$} from 'voby';
import ShortcutPill from '@components/shortcut_pill';
import type {Props} from './types';

/* MAIN */

const ToolButton = ( { tool }: Props ): JSX.Element => {

  const name = () => $$(tool).name;
  const shortcut = () => $$(tool).shortcut;
  const onClick = () => $$(tool).trigger ();

  return (
    <div class="devbox-tool-button" onClick={onClick}>
      <div class="devbox-tool-button-name">
        {name}
      </div>
      <ShortcutPill>
        {shortcut}
      </ShortcutPill>
    </div>
  );

};

/* EXPORT */

export default ToolButton;
