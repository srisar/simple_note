import * as store from "./_localstore.js";
import {downloadFile} from "./_downloads.js";
import {selectRandomTitle} from "./_note_titles.js";

$(function () {

    $(".lbl_version").text("v 0.28");


    store.initLocalStorage();
    loadDocument(store.fetchStoredDocument());

    autoUpdateWindowTitle();
    selectRandomTitle();

    btnNewDocClick();
    btnDownloadClick();


    autoSave();
    updateWordsCount();

    $("#btn_about").on("click", function () {
        $("#modal_about").modal("show");
    });

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

function autoUpdateWindowTitle() {

    $("#note_title").on("keyup", function () {
        document.title = "";
        document.title = "simple note";
        document.title += " - " + $(this).val();
    });

}

function countWords(str) {

    if (str.trim() === "") return 0;
    str = str.replace(/\n/g, " ");
    str = str.replace(/(^\s*)|(\s*$)/gi, "");
    str = str.replace(/[ ]{2,}/gi, " ");
    str = str.replace(/\n /, "\n");

    const matches = str.split(" ");
    return matches.length;
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

    $("#word_count").text(countWords(note.body));

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
}

function autoSave(note) {
    setInterval(saveDocument, 1000, note);
}

function cleanSlate() {
    const documentTitle = $("#note_title");
    const documentBody  = $("#note_body");

    store.cleanLocalStore();

    documentTitle.val("");
    documentBody.val("");
    selectRandomTitle();

    saveDocument(document);
}


function downloadNote() {
    let title  = $("#note_title").val();
    const body = $("#note_body").val();

    if (title === "") {
        title = "untitled"
    }

    let content = `## ${title}\n\n${body}`;

    downloadFile(`${title}.md`, content);
}

/*
 *++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * Event Listeners
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */


function btnNewDocClick() {
    $("#btn_new_doc").on("click", function () {

        const documentBody  = $("#note_body");

        if (documentBody.val().length > 0) {
            const modal = $("#modal_save_note")
            modal.modal("show");

            $("#btn_modal_create_new_note").on("click", function () {
                cleanSlate();
                modal.modal("hide");
            });

            $("#btn_modal_download_note").on("click", function () {
                downloadNote();
                modal.modal("hide");
            })

        }

        selectRandomTitle();

    });
}

function btnDownloadClick() {
    $("#btn_download").on("click", function () {

        downloadNote();

    })
}

