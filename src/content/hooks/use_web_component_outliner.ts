
/* IMPORT */

import useElementOutlinerBy from '@hooks/use_element_outliner_by';

/* MAIN */

const useWebComponentOutliner = ( ref: $<Element | undefined> = document.body ): void => {

  useElementOutlinerBy ( ref, element => {

    return element.tagName.includes ( '-' ); // Custom element

  });

};

/* EXPORT */

export default useWebComponentOutliner;
