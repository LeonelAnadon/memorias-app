import React, { useState } from "react";
import { useRef } from "react";

const InputBase64 = ({onDone, multiple, setIsImgLoad}) => {
  const btn = useRef();
  const [files, setFiles] = useState([]);

  const handleCLick = () => {
    btn.current.click();
  };
  const handleReset = () => {
  }

  const handleChange = (e, onDone, multiple) => {
    let files = e.target.files;

    // Process each file
    let allFiles = [];
    for (var i = 0; i < files.length; i++) {
      let file = files[i];

      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        let fileInfo = {
          name: file.name,
          type: file.type,
          size: Math.round(file.size / 1000) + " kB",
          base64: reader.result,
          file: file,
        };

        // Push it to the state
        allFiles.push(fileInfo);

        // If all files have been proceed
        if (allFiles.length == files.length) {
          // Apply Callback function
          if (multiple) onDone(allFiles);
          else {onDone(allFiles[0]); setIsImgLoad(true)}
         
        }
      }; // reader.onload
    } // for
  };

  return (
    <>
    <input onChange={(e) => handleChange(e, onDone, multiple)} ref={btn} hidden type={"file"} />
      <button onClick={handleCLick}>Elegir una imagen</button>
    </>
  );
};

export default InputBase64;
