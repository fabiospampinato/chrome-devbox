
/* IMPORT */

import useElementOutlinerBy from '@hooks/use_element_outliner_by';
import {isCustomEelement} from '@utils';

/* MAIN */

const useWebComponentOutliner = ( ref: $<Element | undefined> = document.body ): void => {

  useElementOutlinerBy ( ref, isCustomEelement, 'no web components' );

};

/* EXPORT */

export default useWebComponentOutliner;
