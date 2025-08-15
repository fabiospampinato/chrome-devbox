
/* IMPORT */

import './styles.css';
import type {Props} from './types';

/* MAIN */

const ToolButtons = ( { children }: Props ): JSX.Element => {

  return (
    <div class="devbox-tool-buttons">
      {children}
    </div>
  );

};

/* EXPORT */

export default ToolButtons;
