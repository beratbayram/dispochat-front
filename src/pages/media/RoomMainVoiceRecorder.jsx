import {Component, useState} from "react";
import {Recorder} from 'react-voice-recorder';
import 'react-voice-recorder/dist/index.css';
import './RoomMainVoiceRecorder.sass';
import Modal from "../../elements/Modal";
import Api from "../../utils/Api";
import mic from "../../assets/mic.svg";

export default function RoomMainVoiceRecorder({msgCallback}) {
    const [isModalOpen, setModalOpen] = useState(false);

    const closeFunction = () => setModalOpen(isModalOpen => !isModalOpen);

    return <>
        <button type="button"
                id="addRecording"
                onClick={closeFunction}>
            <img src={mic} alt="mic icon"/>
        </button>
        <div id='voiceRecorder'>
            <Modal state={[isModalOpen, setModalOpen]} title="Voice Recorder">
                <RoomMainVoiceRecorderInner msgCallback={msgCallback} closeFunction={closeFunction}/>
            </Modal>
        </div>
    </>
}


class RoomMainVoiceRecorderInner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audioDetails: {
                url: null,
                blob: null,
                chunks: null,
                duration: {
                    h: 0,
                    m: 0,
                    s: 0
                }
            }
        }
    }

    handleAudioStop(data) {
        this.setState({audioDetails: data});
    }

    handleAudioUpload(file) {
        if(!file) return;
        file.lastModifiedDate = new Date();
        file.name = "Recording";
        this.props.msgCallback('!?/audio');

        const formData = new FormData();


        formData.append(
            "file",
            file,
            file.name
        );

        Api.fileUpload(formData).then(({fileUri}) => {
            sessionStorage.setItem(fileUri,URL.createObjectURL(file));
            this.props.msgCallback(`!?/audio/mp3 ${fileUri} ${file.name}`);
        })

        this.props.closeFunction();
    }

    handleReset() {
        const reset = {
            url: null,
            blob: null,
            chunks: null,
            duration: {
                h: 0,
                m: 0,
                s: 0
            }
        };
        this.setState({audioDetails: reset});
    }

    render() {
        return (
            <Recorder
                record={true}
                title={"Voice Recording"}
                audioURL={this.state.audioDetails.url}
                showUIAudio
                hideHeader
                handleAudioStop={data => this.handleAudioStop(data)}
                handleAudioUpload={data => this.handleAudioUpload(data)}
                handleReset={() => this.handleReset()}
            />
        )
    }
}