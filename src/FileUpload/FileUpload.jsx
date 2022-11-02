import React, { useState } from "react";
import axios from "axios";
import style from "./style.module.css";

function FileUpload() {
  const [form, setForm] = useState({
    file: "",
  });
  const [fileData, setfileData] = useState([]);

  const filehandler = (e) => {
    console.log(e.target.files[0]);
    setForm({ file: e.target.files[0] });
  };

  let { file } = form;

  const handleSubmit = async () => {
    console.log(form, file);
    let formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:4000/file-upload",
        data: formData,
      });
      console.log(res);
      if (res.status === 200 || res) {
        setfileData(res.data?.data);
      }
    } catch (error) {
      console.log(error);
      alert("File Format is wrong !");
    }
  };

  return (
    <div className={style.container}>
      <div className={style.leftContainer}>
        <div className={style.inputDiv}>
          Upload File
          <input
            className={style.input}
            type={"file"}
            onChange={filehandler}
            name="file"
          />
        </div>
        <button className={style.uploadButton} onClick={handleSubmit}>
          <span>{file ? "Upload file" : "Submit"}</span>
        </button>
      </div>
      <div className={style.rightContainer}>
        <table>
          <tr>
            <th>TimeStamp</th>
            <th>Log Level</th>
            <th>TransactionId</th>
            <th>Err</th>
          </tr>

          {
            // constablee.log(fileData)
            fileData.length
              ? fileData.map((x, i) => {
                  return (
                    <tr key={i}>
                      <td>{x.timestamp}</td>
                      <td>{x.logLevvel}</td>
                      <td>{x.transactionId}</td>
                      <td>{x.err}</td>
                    </tr>
                  );
                })
              : "No Data"
          }
        </table>
      </div>
    </div>
  );
}

export default FileUpload;
