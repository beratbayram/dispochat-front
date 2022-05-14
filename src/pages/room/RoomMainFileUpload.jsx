import {useState} from "react";
import Api from "../../utils/Api";

export default function RoomMainFileUpload(){

    function onFileUpload(event) {
        const selectedFile = event.target.files[0]
        const formData = new FormData();

        formData.append(
            "file",
            selectedFile,
            selectedFile.name
        );
        console.log(selectedFile);
        Api.fileUpload(formData).then(console.log);
    }

    return <>
        <input type="file"
               capture="user"
               id="addImageReal"
               name="addImage"
               onChange={onFileUpload}
               accept="image/png, image/jpeg"/>
        <button type="button"
                id="addImage"
                onClick={() => document.getElementById("addImageReal").click()}>
            {'+' }
        </button>
    </>
}