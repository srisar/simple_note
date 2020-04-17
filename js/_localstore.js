const DOC_TITLE = 'doc_title';
const DOC_BODY  = 'doc_body';

export function initLocalStorage() {
    let localStoreDocTitle = window.localStorage.getItem(DOC_TITLE);
    let localStoreDocBody  = window.localStorage.getItem(DOC_BODY);

    if (localStoreDocTitle === null) {
        window.localStorage.setItem(DOC_TITLE, "");
    }

    if (localStoreDocBody === null) {
        window.localStorage.setItem(DOC_BODY, "");
    }

}

export function updateLocalStorageDocument(document) {

    window.localStorage.setItem(DOC_TITLE, document.title);
    window.localStorage.setItem(DOC_BODY, document.body);
}

export function fetchStoredDocument() {
    let localStoreDocTitle = window.localStorage.getItem(DOC_TITLE);
    let localStoreDocBody  = window.localStorage.getItem(DOC_BODY);

    if (localStoreDocTitle !== null) {
        return {
            'title': localStoreDocTitle,
            'body': localStoreDocBody
        }
    }

    return null;

}

export function cleanLocalStore() {
    let localStoreDocTitle = window.localStorage.getItem(DOC_TITLE);
    let localStoreDocBody  = window.localStorage.getItem(DOC_BODY);

    if (localStoreDocTitle !== null) {
        window.localStorage.setItem(DOC_TITLE, "");
    }

    if (localStoreDocBody !== null) {
        window.localStorage.setItem(DOC_BODY, "");
    }

}