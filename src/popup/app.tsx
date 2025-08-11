
/* IMPORT */

import './app.css';
import {ToolButton, ToolButtons} from '../shared/components';
import {ElementOutliner} from '../shared/tools';

/* MAIN */

const App = (): JSX.Element => {

  return (
    <ToolButtons>
      <ToolButton command={ElementOutliner.command} name={ElementOutliner.name} shortcut={ElementOutliner.shortcut} />
    </ToolButtons>
  );

};

/* EXPORT */

export default App;
