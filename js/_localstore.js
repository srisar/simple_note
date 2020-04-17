const NOTE_TITLE = 'note_title';
const NOTE_BODY  = 'note_body';

export function initLocalStorage() {
    let localStoreDocTitle = window.localStorage.getItem(NOTE_TITLE);
    let localStoreDocBody  = window.localStorage.getItem(NOTE_BODY);

    if (localStoreDocTitle === null) {
        localStorage.setItem(NOTE_TITLE, "");
    }

    if (localStoreDocBody === null) {
        localStorage.setItem(NOTE_BODY, "");
    }

}

export function updateLocalStorageDocument(note) {

    localStorage.setItem(NOTE_TITLE, note.title);
    localStorage.setItem(NOTE_BODY, note.body);
}

export function fetchStoredDocument() {
    let localStoreDocTitle = localStorage.getItem(NOTE_TITLE);
    let localStoreDocBody  = localStorage.getItem(NOTE_BODY);

    if (localStoreDocTitle !== null) {
        return {
            'title': localStoreDocTitle,
            'body': localStoreDocBody
        }
    }

    return null;

}

export function cleanLocalStore() {
    let localStoreDocTitle = window.localStorage.getItem(NOTE_TITLE);
    let localStoreDocBody  = window.localStorage.getItem(NOTE_BODY);

    if (localStoreDocTitle !== null) {
        window.localStorage.setItem(NOTE_TITLE, "");
    }

    if (localStoreDocBody !== null) {
        window.localStorage.setItem(NOTE_BODY, "");
    }

}