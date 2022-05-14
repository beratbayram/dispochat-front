import Api from "../../utils/Api";

export default function RoomMainFileUpload({msgCallback}){

    async function onFileUpload(event) {
        const selectedFile = event.target.files[0]
        const formData = new FormData();

        formData.append(
            "file",
            selectedFile,
            selectedFile.name
        );
        const {fileUri} = await Api.fileUpload(formData)
        localStorage.setItem(fileUri,URL.createObjectURL(selectedFile));
        msgCallback('!?/img '+ fileUri);
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