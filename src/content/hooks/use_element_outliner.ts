
/* IMPORT */

import useElementOutlinerBy from '@hooks/use_element_outliner_by';

/* MAIN */

const useElementOutliner = ( ref: $<Element | undefined> = document.body ): void => {

  useElementOutlinerBy ( ref, element => {

    return !element.tagName.includes ( '-' ); // Native element

  });

};

/* EXPORT */

export default useElementOutliner;
