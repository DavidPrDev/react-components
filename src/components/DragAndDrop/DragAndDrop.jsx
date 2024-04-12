import React from "react";
import './DragAndDrop.css';

const DragAndDrop = () => {


    const loadFile = (e) => {
        e.preventDefault();
        console.log('onDrop');
        if (e.dataTransfer !== null) console.log(e.dataTransfer.files[0]);

    }

    return (
        <>

            <input
                className="destino"
                onDragEnter={e => console.log('onDragEnter')}
                onDragLeave={e => console.log('onDragLeave')}
                onDragOver={e => { e.preventDefault(); console.log('onDragOver'); }}
                onDrop={e => { loadFile(e) }}
                type="file"
            />


        </>
    )
}

export default DragAndDrop;