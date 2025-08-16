
/* IMPORT */

import './styles.css';
import {For} from 'voby';
import ToolButton from '@components/tool_button';
import type {Props} from './types';

/* MAIN */

const Tools = ( { name, tools }: Props ): JSX.Element => {

  return (
    <div class="devbox-tools">
      <div class="devbox-tools-name">
        {name}
      </div>
      <div class="devbox-tools-buttons">
        <For values={tools}>
          {tool => (
            <ToolButton tool={tool} />
          )}
        </For>
      </div>
    </div>
  );

};

/* EXPORT */

export default Tools;
