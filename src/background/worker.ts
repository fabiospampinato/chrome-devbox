
/* MAIN */

const init = async (): Promise<void> => {

  chrome.action.onClicked.addListener ( async () => {

    const [tab] = await chrome.tabs.query ({ active: true, currentWindow: true });
    const tabId = tab.id;

    if ( !tabId ) return;

    chrome.tabs.sendMessage ( tabId, 'devbox.dashboard.toggle' );

  });

};

/* INIT */

init ();
