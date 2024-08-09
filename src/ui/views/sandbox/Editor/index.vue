<template>
    <div class="m-8">
        <Button
            class="primary"
            rounded
            @click="selectDirectory"
        >Ouvrir un dossier</Button>

        <Button
            class="info"
            rounded
            @click="viewDirectory"
        >Voir le dossier enregistré</Button>


        <br>
        <br>
        AutoSaveinterval :
        <br>
        <input
            type="text"
            v-model="autoSaveInterval"
        >
        <Button
            class="success"
            rounded
            @click="save"
        >Sauvegarder</Button>
    </div>
</template>
<script setup>
import { inject, ref, computed, onMounted } from "vue";
import Store from "@engine/storage/Store";
import Bundle from "@core/Bundle";
import Config from "@engine/Config";

const engine = inject("$engine");
const db = ref();
const store = ref();
const directoryHandle = ref();
const directoryHandle2 = ref();

const autoSaveInterval = ref("");
const save = () => {
    Config.setConfig("database", "autoSaveInterval", autoSaveInterval.value);
};

const selectDirectory = async () => {
    // directoryHandle.value = await window.showDirectoryPicker({ mode: 'readwrite' });
    store.value.save("project_directory_handle", { toto: "test" }, true);
};

const viewDirectory = async () => {
    // console.log(directoryHandle.value.values());

    for await (const fileHandle of getFilesRecursively(directoryHandle.value)) {
        console.log(fileHandle);
    }
};

async function* getFilesRecursively(entry) {
    if (entry.kind === "file") {
        const file = await entry.getFile();
        if (file !== null) {
            file.relativePath = entry;
            yield file;
        }
    } else if (entry.kind === "directory") {
        for await (const handle of entry.values()) {
            yield* getFilesRecursively(handle);
        }
    }
}


onMounted(async () => {

    autoSaveInterval.value = Config.getConfig('database', 'autoSaveInterval');

    //     if ('launchQueue' in window) {
    //     console.log('File Handling API is supported!');

    //     window.launchQueue.setConsumer(launchParams => {
    //         handleFiles(launchParams.files);
    //     });
    // } else {
    //     console.error('File Handling API is not supported!');
    // }

    // async function handleFiles(files) {
    //     for (const file of files) {
    //         const blob = await file.getFile();
    //         blob.handle = file;
    //         const text = await blob.text();

    //         console.log(`${file.name} handled, content: ${text}`);
    //     }
    // }

    // Retrieve message sent to work from main script
    // const message = "Mes données ! Wesh";

    // // Get handle to draft file
    // const root = await navigator.storage.getDirectory();
    // const draftHandle = await root.getFileHandle("draft.txt", { create: true });
    // // Get sync access handle
    // const accessHandle = await draftHandle.createSyncAccessHandle();

    // // Get size of the file.
    // const fileSize = accessHandle.getSize();
    // // Read file content to a buffer.
    // const buffer = new DataView(new ArrayBuffer(fileSize));
    // const readBuffer = accessHandle.read(buffer, { at: 0 });

    // // Write the message to the end of the file.
    // const encoder = new TextEncoder();
    // const encodedMessage = encoder.encode(message);
    // const writeBuffer = accessHandle.write(encodedMessage, { at: readBuffer });

    // // Persist changes to disk.
    // accessHandle.flush();

    // // Always close FileSystemSyncAccessHandle if done.
    // accessHandle.close();


    //     const root = await navigator.storage.getDirectory("./");
    // // Get the handle for a file in the directory.
    // const fileHandle = await root.getFileHandle("my-file.txt");

    // console.log("root", root, fileHandle)

    // db.value = engine.getBundle(Bundle.BUNDLES.DATABASE);
    // db.value.onStarted(async () => {
    //     store.value = db.value.getStore(Store.STORES.PROJECT);

    //     directoryHandle.value = store.value.get("project_directory_handle");
    //     console.log("retrieved", directoryHandle.value);

    //     const options = {
    //         mode: "readwrite"
    //     };
    //     // if ((await directoryHandle.value.queryPermission(options)) === 'granted') {
    //     //     return true;
    //     // }
    //     // // Request permission. If the user grants permission, return true.
    //     // if ((await directoryHandle.value.requestPermission(options)) === 'granted') {
    //     //     return true;
    //     // }
    // });
});
// const pre = document.querySelector('pre');
// const button = document.querySelector('button');
// button.addEventListener('click', async () => {
//     try {
//         const fileHandleOrUndefined = await get('file');
//         if (fileHandleOrUndefined) {
//             pre.textContent =
//                 `Retrieved file handle "${fileHandleOrUndefined.name}" from IndexedDB.`;
//             return;
//         }
//         // This always returns an array, but we just need the first entry.
//         const [fileHandle] = await window.showOpenFilePicker();
//         await set('file', fileHandle);
//         pre.textContent =
//             `Stored file handle for "${fileHandle.name}" in IndexedDB.`;
//     } catch (error) {
//         alert(error.name, error.message);
//     }
// });
</script>
<style lang="">
    
</style>