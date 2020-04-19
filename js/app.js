import * as store from "./_localstore.js";
import {downloadFile} from "./_downloads.js";

$(function () {

    $("#lbl_version").text("v 0.20");

    store.initLocalStorage();
    loadDocument(store.fetchStoredDocument());

    updateLastUpdatedTime();
    autoUpdateWindowTitle();

    btnSaveDocumentClick();
    btnNewDocClick();
    btnDownloadClick();


    autoSave();
    updateWordsCount();

    return registerSW();

});

async function registerSW() {
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('./sw.js');
        } catch (e) {
            alert('ServiceWorker registration failed. Sorry about that.');
        }
    } else {
        document.querySelector('.alert').removeAttribute('hidden');
    }
}


/*
 *++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * UI hooks and methods
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */


function updateLastUpdatedTime() {
    const labelUpdateTime = $("#lbl_update_time");
    labelUpdateTime.val(moment().format('MMMM Do YYYY, h:mm:ss a').toLowerCase());
}

function autoUpdateWindowTitle() {

    $("#note_title").on("keyup", function () {
        document.title = "";
        document.title = "simple note";
        document.title += " - " + $(this).val();
    });

}

function countWords(str) {
    const matches = str.match(/[\w\d’'-]+/gi);
    return matches ? matches.length : 0;
}


function updateWordsCount() {
    $("#note_body").on("keyup", function () {
        const text = $(this).val();

        $("#word_count").text(countWords(text));

    });
}

/*
 *++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * Document loading and saving
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */

function loadDocument(note) {

    if (note === null) return;

    $("#note_title").val(note.title);
    $("#note_body").val(note.body);

    if (note.title !== "") {
        document.title = `simple note - ${note.title}`;
    }

}

function saveDocument() {

    const documentTitle = $("#note_title");
    const documentBody  = $("#note_body");

    const document = {
        'title': documentTitle.val(),
        'body': documentBody.val()
    };

    store.updateLocalStorageDocument(document);
    updateLastUpdatedTime();
}

function autoSave(note) {
    setInterval(saveDocument, 5000, note);
}

/*
 *++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * Event Listeners
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */

function btnSaveDocumentClick() {

    const btnSave = $("#btn_save_doc");
    btnSave.on("click", function () {
        saveDocument();
    });

}

function btnNewDocClick() {
    $("#btn_new_doc").on("click", function () {

        const documentTitle = $("#note_title");
        const documentBody  = $("#note_body");

        store.cleanLocalStore();

        documentTitle.val("");
        documentBody.val("");

        saveDocument(document);
    });
}

function btnDownloadClick() {
    $("#btn_download").on("click", function () {

        let title  = $("#note_title").val();
        const body = $("#note_body").val();

        if (title === "") {
            title = "untitled"
        }

        let content = `## ${title}\n\n${body}`;

        downloadFile(`${title}.md`, content);

    })
}

