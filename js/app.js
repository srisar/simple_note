import * as store from "./_localstore.js";
import {downloadFile} from "./_downloads.js";

$(function () {


    store.initLocalStorage();
    let storedDoc = store.fetchStoredDocument();

    if (storedDoc !== null) {
        loadDocument(storedDoc);
    }

    updateLastUpdatedTime();

    btnSaveDocumentClick();
    btnNewDocClick();
    btnDownloadClick();


    autoSave();


});


function loadDocument(document) {
    $("#document_title").val(document.title);
    $("#document").val(document.body);
}

function updateLastUpdatedTime() {
    const labelUpdateTime = $("#lbl_update_time");
    labelUpdateTime.val(moment().format('MMMM Do YYYY, h:mm:ss a'));
}


function saveDocument() {

    const documentTitle = $("#document_title");
    const documentBody  = $("#document");

    const document = {
        'title': documentTitle.val(),
        'body': documentBody.val()
    };

    store.updateLocalStorageDocument(document);
    updateLastUpdatedTime();
}

function autoSave(document) {
    setInterval(saveDocument, 5000, document);
}


function btnSaveDocumentClick(document) {

    const btnSave = $("#btn_save_doc");
    btnSave.on("click", function () {
        saveDocument();
    });

}

function btnNewDocClick() {
    $("#btn_new_doc").on("click", function () {

        const documentTitle = $("#document_title");
        const documentBody  = $("#document");

        store.cleanLocalStore();

        documentTitle.val("");
        documentBody.val("");

        saveDocument(document);
    });
}

function btnDownloadClick() {
    $("#btn_download").on("click", function () {

        let title  = $("#document_title").val();
        const body = $("#document").val();

        if (title === "") {
            title = "untitled"
        }

        let content = `## ${title}\n\n${body}`;

        downloadFile(`${title}.md`, content);

    })
}