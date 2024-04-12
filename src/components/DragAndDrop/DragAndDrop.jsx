import React, { useEffect, useState } from "react";
import './DragAndDrop.css';
import dragIcon from './img/dragIcon.png';
import docIcon from './img/docIcon.png';

const DragAndDrop = ({ setFile }) => {

    const [fileName, setFileName] = useState("");
    const [acceted, setAccepted] = useState(null);
    const [invalid, setInvalid] = useState(null);
    const [error, setError] = useState(null);

    const rules = ["application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/plain",
        "application/vnd.oasis.opendocument.text"
    ];

    const loadFile = (e) => {
        e.preventDefault();

        if (e.dataTransfer !== null && rules.includes(e.dataTransfer.files[0].type)) {
            console.log(e.dataTransfer.files[0].type);
            setFileName(e.dataTransfer.files[0].name);
            setFile(e.dataTransfer.files[0]);
            setAccepted(true)
        } else {
            setFile(null);
            setFileName(null);
            setAccepted(false)
            setInvalid(true)
            setError("¡Archivo no valido !");

            setTimeout(() => {
                setError("")
                setInvalid(false)
            }, 2000)

        }
    };

    const handleReset = () => {
        setAccepted(false);
        setFileName(null);
        setFileName(null);
    }



    return (
        <>
            <div
                className={`drag-container ${acceted && 'file-accept'} ${invalid && 'file-invalid'}`}
                onDragOver={e => { e.preventDefault() }}
                onDrop={e => { loadFile(e) }}>

                <label className="label-drag">Drop your files here !</label>


                {fileName && <img src={docIcon} alt="Document icon" className="img-doc" />}

                {error && <h2 className="error-txt">{error}</h2>}

                {fileName && <div className="file-name">{fileName} <button className='delete-file' onClick={() => handleReset()}>❌</button> </div>}
            </div>

        </>
    )
}

export default DragAndDrop;