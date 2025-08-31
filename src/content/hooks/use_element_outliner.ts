
/* IMPORT */

import useElementOutlinerBy from '@hooks/use_element_outliner_by';
import {isNativeElement} from '@utils';

/* MAIN */

const useElementOutliner = ( ref: $<Element | undefined> = document.body ): void => {

  useElementOutlinerBy ( ref, isNativeElement, 'no elements' );

};

/* EXPORT */

export default useElementOutliner;
