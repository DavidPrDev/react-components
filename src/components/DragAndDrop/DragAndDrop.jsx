import React, { useState } from "react";
import './DragAndDrop.css';
import docIcon from './img/docIcon.png';

const DragAndDrop = ({ setFile, multiple = false, file }) => {

    const [fileName, setFileName] = useState("");
    const [acceted, setAccepted] = useState("");
    const [invalid, setInvalid] = useState("");
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
            setFileName(e.dataTransfer.files[0].name);

            if (multiple) {

                setFile(prevFiles => {
                    const updatedFiles = {
                        ...prevFiles, // Copia todos los archivos existentes
                        [e.dataTransfer.files[0].name]: e.dataTransfer.files[0] // Agrega el nuevo archivo utilizando su nombre como clave
                    };
                    return updatedFiles;
                });
            } else {
                setFile(e.dataTransfer.files[0]);
            }


            setAccepted(true)
        } else {

            setFileName("");
            setAccepted("")
            setInvalid(true)
            setError("¡Archivo no valido !");

            setTimeout(() => {
                setError("")
                setInvalid("")
            }, 2000)

        }
    };

    const handleReset = () => {
        setAccepted(false);
        setFileName(null);
        setFileName(null);
        setFile(null)
    }

    return (
        <>
            <div
                className={`drag-container ${acceted && 'file-accept'} ${invalid && 'file-invalid'}`}
                onDragOver={e => { e.preventDefault() }}
                onDrop={e => { loadFile(e) }}>

                <label className="label-drag">Drop your files here !</label>

                {error && <h1 className="error-txt">{error}</h1>}

                {multiple == false ?

                    <>
                        {fileName && <img src={docIcon} alt="Document icon" className="img-doc" />}
                        {fileName && <div className="file-name">{fileName} <button className='delete-file' onClick={() => handleReset()}>❌</button></div>}                    </>
                    :
                    <div className="row-icons">
                        {file && Object.values(file).map((fil, index) =>
                            <div key={index} className="multi-file-container">

                                <img src={docIcon} alt="Document icon" className="img-doc-multi" />
                                <div className="file-name-multi">{fil.name.length > 5 ? "..." + fil.name.substring() : fil.name} <button className='delete-file' onClick={() => handleReset()}>❌</button></div>

                            </div>
                        )}
                    </div>

                }

            </div>

        </>
    )
}

export default DragAndDrop;