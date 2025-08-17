
/* IMPORT */

import useCustomElementOutliner from '@hooks/use_custom_element_outliner';
import useToolTrigger from '@hooks/use_tool_trigger';

/* MAIN */

const CustomElementOutliner: ToolConfig = {
  id: 'custom-element-outliner',
  name: 'Custom Element Outliner',
  description: 'Toggle the custom element outliner, to spot where and which custom elements are used in the page',
  command: 'devbox.custom-element-outliner.toggle',
  shortcut: 'Ctrl+Cmd+W',
  trigger: useToolTrigger ( useCustomElementOutliner )
};

/* EXPORT */

export default CustomElementOutliner;
