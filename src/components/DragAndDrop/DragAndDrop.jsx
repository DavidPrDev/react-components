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
    //Hacer funciones comunes y crear archivo constantes 
    const loadFile = (e) => {
        e.preventDefault();

        if (e.dataTransfer !== null && rules.includes(e.dataTransfer.files[0].type)) {
            setFileName(e.dataTransfer.files[0].name);

            if (multiple) {

                setFile(prevFiles => {
                    const updatedFiles = {
                        ...prevFiles,
                        [e.dataTransfer.files[0].name]: e.dataTransfer.files[0]
                    };
                    return updatedFiles;
                });
                console.log(file)
            } else {
                setFile(e.dataTransfer.files[0]);
            }
            setAccepted(true)

            setTimeout(() => {
                setAccepted(false)
            }, 2000)


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

    const handleReset = ($name = null) => {
        setAccepted(false);
        setFileName(null);

        if ($name == null) {
            setFile(null)
        } else {
            const updatedFile = { ...file };
            delete updatedFile[$name];
            setFile(updatedFile);

        }

    }


    const handleFileChange = (e) => {

        const selectedFile = e.target.files[0];

        if (selectedFile) {

            setFileName(selectedFile.name)

            if (rules.includes(selectedFile.type)) {

                if (multiple) {

                    setFile(prevFiles => {
                        const updatedFiles = {
                            ...prevFiles,
                            [selectedFile.name]: selectedFile
                        };
                        return updatedFiles;
                    });
                } else {
                    setFile(selectedFile);
                }
                console.log(file)
                setAccepted(true);

                setTimeout(() => {
                    setAccepted("");
                }, 2000);
            } else {
                setFileName("");
                setInvalid(true);
                setError("¡Archivo no válido!");

                setTimeout(() => {
                    setError("");
                    setInvalid("");
                }, 2000);
            }
        }
    };

    return (
        <>

            <div
                className={`drag-container ${acceted && 'file-accept'} ${invalid && 'file-invalid'}`}
                onDragOver={e => { e.preventDefault() }}
                onDrop={e => { loadFile(e) }}
            >

                <div className="container-txt"></div>
                <h2 className="title-drag">Drop your files here !</h2>

                <p className="str-separator">Or Click</p>

                {error && <h1 className="error-txt">{error}</h1>}

                <input type="file" className="file-input" onChange={handleFileChange} />

                {multiple == false ?

                    <>
                        <div className="row-icon">
                            {fileName && <img src={docIcon} alt="Document icon" className="img-doc" />}
                            {fileName && <div className="file-name">{fileName} <button className='delete-file' onClick={() => handleReset()}>❌</button></div>}
                        </div>
                    </>

                    :
                    <div className="row-icons">
                        {file && Object.values(file).map((fil, index) =>
                            <div key={index} className="multi-file-container">

                                <img src={docIcon} alt="Document icon" className="img-doc-multi" />
                                <div className="file-name-multi">{fil.name.length > 10 ? "..." + fil.name.substring(fil.name.length / 2) : fil.name} <button className='delete-file' onClick={() => handleReset(fil.name)}>❌</button></div>

                            </div>
                        )}
                    </div>

                }

            </div>

        </>
    )
}

export default DragAndDrop;