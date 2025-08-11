
/* IMPORT */

import './styles.css';
import {$$} from 'voby';
import type {Props} from './types';

/* MAIN */

const ToolButton = ( { command, name, shortcut }: Props ): JSX.Element => {

  const onToggle = async (): Promise<void> => {
    const [tab] = await chrome.tabs.query ({ active: true, currentWindow: true });
    const tabId = tab.id;
    if ( !tabId ) return;
    chrome.tabs.sendMessage ( tabId, $$(command) );
  };

  return (
    <div class="tool-button" onClick={onToggle}>
      <div class="tool-button-name">
        {name}
      </div>
      <div class="tool-button-shortcut">
        {shortcut}
      </div>
    </div>
  );

};

/* EXPORT */

export default ToolButton;
