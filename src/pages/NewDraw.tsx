/* eslint-disable */
import './NewDraw.css';

import * as XLSX from 'xlsx';
import DataGrid from 'react-data-grid';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import BackButton from 'components/BackButton';

const NewDraw = () => {
  const [file, setFile] = useState();
  const [data, setData] = useState();
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);

  const handleFile = (file: File) => {
    const fileReader = new FileReader();

    fileReader.onload = (event: ProgressEvent<FileReader>) => {
      const bstr = event?.target?.result;
      const workBook = XLSX.read(bstr, { type: 'binary' });
      const workSheet = workBook.Sheets[workBook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
      setData(data.slice(1));
      setCols(data[0].map((r) => ({ key: r, name: r })));
      setRows(
        data.slice(1).map((r) =>
          r.reduce((acc, x, i) => {
            acc[data[0][i]] = x;
            return acc;
          }, {})
        )
      );
    };
    fileReader.readAsBinaryString(file);
  };
  // On file select (from the pop up)
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update the state
    const { files } = event.target;
    if (files && files[0]) {
      setFile(files[0]);
      handleFile(files[0]);
    }
  };

  // File content to be displayed after
  // file upload is complete
  const fileData = () => {
    if (file) {
      const { name } = file;
      return (
        <div>
          <div className="Hello">
            <p>File Name: {name}</p>
          </div>

          <div className="Wrapper">
            <DataGrid className="rdg-light" columns={cols} rows={rows} />
          </div>

          <div className="Hello">
            <Link to="/Draw" state={{ data: data }}>
              <button>Draw!</button>
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="Hello">
            <span>
              <h2>Load from file!</h2>
              <p>File must be in Excel format.</p>
            </span>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <div className="Hello">
        <label id="fileUploadLabel">
          <input
            id="fileUpload"
            type="file"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            multiple={false}
            onChange={handleFileChange}
          />
          Open File
        </label>
      </div>
      <div className="Hello">{fileData()}</div>
      <div className="Hello">
        <BackButton />
      </div>
    </div>
  );
};

export default NewDraw;
