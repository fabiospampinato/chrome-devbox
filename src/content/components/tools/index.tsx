
/* IMPORT */

import './styles.css';
import type {Props} from './types';

/* MAIN */

const Tools = ( { name, children }: Props ): JSX.Element => {

  return (
    <div class="devbox-tools">
      <div class="devbox-tools-name">
        {name}
      </div>
      <div class="devbox-tools-buttons">
        {children}
      </div>
    </div>
  );

};

/* EXPORT */

export default Tools;
