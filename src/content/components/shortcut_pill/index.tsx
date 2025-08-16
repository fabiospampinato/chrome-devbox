
/* IMPORT */

import './styles.css';
import ShoSho from 'shosho';
import {$$} from 'voby';
import type {Props} from './types';

/* MAIN */

const ShortcutPill = ( { children }: Props ): JSX.Element => {

  const label = () => ShoSho.format ( $$(children), 'symbols' );
  const title = () => ShoSho.format ( $$(children), 'short-inflexible-directional' );

  return (
    <div class="devbox-shortcut-pill" title={title}>
      {label}
    </div>
  );

};

/* EXPORT */

export default ShortcutPill;
