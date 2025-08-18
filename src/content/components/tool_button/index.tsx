
/* IMPORT */

import './styles.css';
import {$$} from 'voby';
import ShortcutPill from '@components/shortcut_pill';
import type {Props} from './types';

/* MAIN */

const ToolButton = ( { active, tool }: Props ): JSX.Element => {

  const name = () => $$(tool).name;
  const description = () => $$(tool).description;
  const shortcut = () => $$(tool).shortcut;
  const onClick = () => $$(tool).trigger ();

  return (
    <div class={{ 'devbox-tool-button': true, active }} title={description} onClick={onClick}>
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
