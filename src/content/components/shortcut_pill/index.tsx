
/* IMPORT */

import './styles.css';
import {$$, If} from 'voby';
import type {Props} from './types';

/* MAIN */

const ShortcutPill = ( { children }: Props ): JSX.Element => {

  const title = () => $$(children);
  const symbols = () => title ().replaceAll ( '+' , '' );

  return (
    <If when={title}>
      <div class="devbox-shortcut-pill" title={title}>
        {symbols}
      </div>
    </If>
  );

};

/* EXPORT */

export default ShortcutPill;
