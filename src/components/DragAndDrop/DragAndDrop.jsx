import React, { useEffect, useState } from "react";
import './DragAndDrop.css';
import { DocRules, ImgRules } from './constants/constants.js';
import docIcon from './img/docIcon.png';
import imgIcon from './img/imgIcon.png';
import Tooltip from "../Tooltip/Tooltip.jsx";
import PropTypes from 'prop-types';


const DragAndDrop = ({ setFile, multiple = false, file, type }) => {

    const [fileName, setFileName] = useState("");
    const [acceted, setAccepted] = useState("");
    const [invalid, setInvalid] = useState("");
    const [error, setError] = useState(null);
    const [rules, setRules] = useState([]);
    const [icon, setIcon] = useState(null);

    useEffect(() => {
        if (type === 'document') {
            setRules(DocRules);
            setIcon(docIcon);
        } else if (type === 'image') {
            setRules(ImgRules);
            setIcon(imgIcon);
        }
    }, [type]);
    const loadFile = (e) => { checkFile(e) };

    const handleFileChange = (e) => { checkFile(e, 'input') };

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

    const checkFile = (e, type = null) => {
        e.preventDefault();
        let fileEvent;
        type != null ? fileEvent = e.target : fileEvent = e.dataTransfer;

        if (fileEvent !== null && rules.includes(fileEvent.files[0].type)) {

            setFileName(fileEvent.files[0].name);

            if (multiple) {

                setFile(prevFiles => {
                    const updatedFiles = {
                        ...prevFiles,
                        [fileEvent.files[0].name]: fileEvent.files[0]
                    };
                    return updatedFiles;
                });
            } else {
                setFile(fileEvent.files[0]);
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
    }

    return (
        <>
            <div
                className={`drag-container ${acceted && 'file-accept'} ${invalid && 'file-invalid'}`}
                onDragOver={e => { e.preventDefault() }}
                onDrop={e => { loadFile(e) }}
            >

                <div className="centered">
                    <h2 className="title-drag">Drop your files here !</h2>

                    <p className="str-separator">Or Click</p>

                    {error && <h2 className="error-txt">{error}</h2>}

                    <input type="file" className="file-input" onChange={handleFileChange} />
                </div>
                {multiple == false ?

                    <>
                        <div className="row-icon">
                            {fileName && <img src={icon} alt="Document icon" className="img-icon" />}
                            {fileName && <div className="file-name">{fileName} <button className='delete-file' onClick={() => handleReset()}>❌</button></div>}
                        </div>
                    </>

                    :
                    <div className="row-icons">
                        {file && Object.values(file).map((fil, index) =>
                            <div key={index} className="multi-file-container">


                                <Tooltip text={fil.name} direction='bottom'>
                                    <img src={icon} alt="Document icon" className="img-icon" />
                                    <div className="file-name-multi">{fil.name.length > 10 ? "..." + fil.name.substring(fil.name.length - 1, fil.name.length - 7) : fil.name}
                                        <button className='delete-file' onClick={() => handleReset(fil.name)}>❌</button>
                                    </div>
                                </Tooltip>



                            </div>
                        )}
                    </div>

                }

            </div >

        </>
    )
}
DragAndDrop.propTypes = {
    multiple: PropTypes.bool.isRequired,
    type: PropTypes.oneOf(['document', 'image']).isRequired,
    setFile: PropTypes.func.isRequired,
    file: PropTypes.node
};
export default DragAndDrop;