
/* IMPORT */

import livereload from 'chrome-extension-livereload/webview';
import {render} from 'voby';
import App from './app';

/* INIT */

livereload ();

render ( <App />, document.getElementById ( 'app' ) );
