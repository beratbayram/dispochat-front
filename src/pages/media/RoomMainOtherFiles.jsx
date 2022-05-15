import download from "../../assets/download.svg";
import {formatBytes} from "../../utils/utils";
import "./RoomMainOtherFiles.sass";

export default function RoomMainOtherFiles({filename, src, size}) {

    return (
        <div className="other-files">
            <a href={src} download target="_blank" rel="noreferrer">
                <img src={download} alt="download icon"/>
                <div className="file-details">
                    <p>{filename}</p>
                    <p>({formatBytes(size)})</p>
                </div>
            </a>
        </div>
    )
}