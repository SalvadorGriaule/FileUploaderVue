<script setup lang="ts">
import Dropzone from "dropzone";

import { colorRandomizerByChildren } from "../assets/ts/colorRandomizer";
import { onMounted, ref, useTemplateRef, watch } from "vue";

type FileType = "image" | "audio" | "vidéo" | "text";

interface Props {
    type?: "all" | FileType[]
    souple?: boolean
    defaultVal?: string
    maxFile?: number
}

const { type = "all", souple = true, defaultVal = null, maxFile = 1 } = defineProps<Props>()

const preview = useTemplateRef("preview");
const standBy = useTemplateRef("standBy");
const imgUpload = useTemplateRef("imgUpload")
const feedBack = useTemplateRef("feedback")


const emit = defineEmits<{
    ifUpload: [bool: boolean]
    fileUpload: [file: File[]]
}>()

let fileDz: File[];
//let data: string | null | undefined;
//let url: string = window.location.host;

const testFile = (type: FileType[]) => {
    let res = "";
    for (let elem of type) {
        switch (elem) {
            case "image":
                res += "image/*";
                break;
            case "audio":
                res += res.length > 0 ? ",audio/*" : "audio/*";
                break;
            case "vidéo":
                res += res.length > 0 ? ",vidéo/*" : "vidéo/*";
                break;
            case "text":
                res +=
                    res.length > 0
                        ? ",.doc,.docx,.odt,.rtf,.txt,.pages"
                        : ".doc,.docx,.odt,.rtf,.txt,.pages";
        }
    }
    return res;
};

const firstMaj = (str: string) => {
    return str.replace(str[0], str[0].toLocaleUpperCase());
};

const upload: Function = (form_data: FormData) => {
    if (fileDz != null && fileDz?.length > 0) {
        for (let i = 0; i < fileDz?.length; i++) {
            form_data.append(
                (Array.isArray(type) && type.length == 1 ? firstMaj(type[0]) : "File") +
                `${i}`,
                fileDz[i]
            );
        }
    }
};
let dragOver = ref(0);
let dOheight = ref(0);
let dOwidth = ref(0);
let fileDiv = ref();
let typeMode = ""

const dragEvent = (bool: boolean) => {
    feedBack.value.style.height = bool ? `${dOheight.value}px` : "0px";
    feedBack.value.style.width = bool ? `${dOwidth.value}px` : "0px";
};

onMounted(() => {
    // data = document.getElementById("app")?.getAttribute("data-image");
    // if (data) data = "http://" + url + "/" + data;
    if (Array.isArray(type)) typeMode = testFile(type);

    watch(dragOver, () => {
        dOheight.value = imgUpload.value.offsetHeight
        dOwidth.value = imgUpload.value.offsetWidth
        dragEvent(dragOver.value == 1)
    })


    if (preview.value && standBy.value) {
        const dropzone = new Dropzone("#dropImgVue", {
            maxFiles: maxFile,
            uploadMultiple: maxFile > 1,
            url: "http://127.0.0.1:8123/media/static/img/",
            autoProcessQueue: false,
            previewTemplate: preview.value.innerHTML,
            acceptedFiles: `${typeMode}`,
            clickable: ".clickabVue",
        });
        dropzone.on("addedfile", (file: File) => {
            standBy.value.classList.toggle("flex");
            standBy.value.classList.toggle("hidden");
            imgUpload.value.classList.add("flex-col")
            Array.isArray(fileDz) ? fileDz.push(file) : (fileDz = [file]);
            fileDiv.value = imgUpload.value?.querySelectorAll(".template")[1]?.clientHeight
            if (typeof fileDiv == "number" && fileDiv * fileDz.length > 144) {
                imgUpload.value.parentElement.parentElement.parentElement.style.height = `${imgUpload.value.parentElement.parentElement.parentElement.clientHeight + (fileDiv + 4)}px`;
                imgUpload.value.parentElement.parentElement.style.height = `${fileDiv * fileDz.length + 8}px`;
                imgUpload.value.parentElement.style.height = `${fileDiv * fileDz.length + 8}px`;
            }
            colorRandomizerByChildren(imgUpload.value.children);
            emit('ifUpload', false)
            emit("fileUpload", fileDz)
        });
        dropzone.on("removedfile", (file: File) => {
            fileDz = fileDz.filter((elem) => elem.name != file.name);
            if (fileDz.length == 0) {
                dragEvent(false);
                dragOver.value = 0;
                standBy.value.classList.add("flex");
                standBy.value.classList.remove("hidden");
                imgUpload.value.classList.remove("flex-col");
            }
            emit('ifUpload', true)
            emit("fileUpload", fileDz)
        });
        dropzone.on("dragenter", (e) => {
            if (imgUpload.value == e.target) {
                dragOver.value = 1;
            }
        })
        dropzone.on("dragleave", (e) => {
            if (feedBack.value == e.target) {
                dragOver.value = 0;
            }
        })
        document.addEventListener("formdata", (e) => {
            if (fileDz != undefined) upload(e.formData);
        })
    }
})
</script>

<template>
    <div class="flex w-11/12 justify-center items-center rounded-lg overflow-hidden h-full">
        <div class="w-full h-full flex justify-center items-center">
            <div ref="imgUpload" class="clickabVue relative flex justify-center items-center bg-gray-300 w-full h-full" id="dropImgVue">
                <div ref="standBy" id="standBy"
                    class="clickabVue flex-row flex justify-center items-center w-11/12 rounded-md p-2 border-blue-500 border-2 border-dashed h-11/12"
                >
                    <div class="flex justify-center items-center flex-col">
                        <div class="w-1/3 clickabVue lg:w-1/6 {defaultVal != undefined
              ">
                            <img src="../../assets/download.svg" alt="" />
                        </div>
                        <div class="w-1/4 clickabVue my-2">
                            <img src="../assets/download.svg" alt="" />
                        </div>
                        <p class="text-blue-500 ms-4 text-xl lg:text-base lg:ms-0">
                            insérer un fichier ici
                        </p>
                    </div>
                    <div ref="feedback" class="clickabVue absolute top-0 bg-gray-500/50"></div>
                </div>
                <div ref="preview" class="dropzone-previews hidden flex-col" id="preview ">
                    <div class="template flex justify-center items-center space-x-2 lg:w-3/5 p-2 rounded-xl">
                        <div class="w-1/6">
                            <img class="w-full" alt="" data-dz-thumbnail />
                        </div>
                        <div class="flex flex-col items-start">
                            <div class="flex space-x-1">
                                <p data-dz-name></p>
                                <p data-dz-size></p>
                                <p data-dz-errormessage></p>
                            </div>
                            <div>
                                <div class="progress progress-striped active" role="progressbar" aria-valuemin="0"
                                    aria-valuemax="100" aria-valuenow="0">
                                    <div class="progress-bar progress-bar-success" style="width:0%"></div>
                                </div>
                            </div>
                            <div class="flex justify-center space-x-2">
                                <button
                                    class="bg-red-700 text-white rounded-md mt-1 py-1 px-2 cursor-pointer w-fit hover:bg-white hover:text-red-700"
                                    data-dz-remove>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>