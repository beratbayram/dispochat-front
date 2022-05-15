import Api from "../../utils/Api";
import upload from "../../assets/upload.svg";
import gallery from "../../assets/img.svg";
import {useRef} from "react";

export default function RoomMainFileUpload({msgCallback,image}){

    const realInput = useRef();

    async function onFileUpload(event) {
        const selectedFile = event.target.files[0]
        console.log(selectedFile);
        const formData = new FormData();

        formData.append(
            "file",
            selectedFile,
            selectedFile.name
        );
        console.log(selectedFile)

        const {fileUri} = await Api.fileUpload(formData)
        sessionStorage.setItem(fileUri,URL.createObjectURL(selectedFile));
        msgCallback(`!?/${selectedFile.type} ${fileUri} ${selectedFile.name} ${selectedFile.size}`);
    }

    const acceptString = image ? "image/*, video/*" : "*";
    const icon  = image ? <img src={gallery} alt="gallery" /> : <img src={upload} alt="upload icon"/>;

    return <>
        <input type="file"
               ref={realInput}
               className="addImageReal"
               name="addImage"
               onChange={onFileUpload}
               accept={acceptString}/>
        <button type="button"
                id="addImage"
                onClick={() => realInput.current.click()}>
            {icon}
        </button>
    </>
}