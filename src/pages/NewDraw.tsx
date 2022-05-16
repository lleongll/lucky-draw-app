/* eslint-disable */
import './NewDraw.css';

import * as XLSX from 'xlsx';
import DataGrid from 'react-data-grid';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import BackButton from 'components/BackButton';

class NewDraw extends Component {
  constructor(props: any) {
    super(props);

    this.state = {
      // Initially, no file is selected
      selectedFile: null,
      data: [],
      cols: [],
      rows: [],
    };
  }

  handleFile = (file: File) => {
    const fileReader = new FileReader();

    fileReader.onload = (event: ProgressEvent<FileReader>) => {
      const bstr = event?.target?.result;
      const workBook = XLSX.read(bstr, { type: 'binary' });
      const workSheet = workBook.Sheets[workBook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
      this.setState({
        data: data.slice(1),
        cols: data[0].map((r) => ({ key: r, name: r })),
        rows: data.slice(1).map((r) =>
          r.reduce((acc, x, i) => {
            acc[data[0][i]] = x;
            return acc;
          }, {})
        ),
      });
    };
    fileReader.readAsBinaryString(file);
  };
  // On file select (from the pop up)
  handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update the state
    const { files } = event.target;
    if (files && files[0]) {
      this.setState({ selectedFile: files[0] });
      this.handleFile(files[0]);
    }
  };

  goBack = () => {
    return (
      <div>
        <Link to="/">
          <button>Go Back</button>
        </Link>
      </div>
    );
  };

  // File content to be displayed after
  // file upload is complete
  fileData = () => {
    if (this.state.selectedFile) {
      const { name } = this.state.selectedFile;
      return (
        <div>
          <div className="Hello">
            <p>File Name: {name}</p>
          </div>

          <div className="Wrapper">
            <DataGrid
              className="rdg-light"
              columns={this.state.cols}
              rows={this.state.rows}
            />
          </div>

          <div className="Hello">
            <Link to="/Draw" state={{ data: this.state.data }}>
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

  render() {
    return (
      <div>
        <div className="Hello">{this.fileData()}</div>
        <div className="Hello">
          <label id="fileUploadLabel">
            <input
              id="fileUpload"
              type="file"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              multiple={false}
              onChange={this.handleFileChange}
            />
            Open File
          </label>
        </div>
        <div className="Hello">
          <BackButton />
        </div>
      </div>
    );
  }
}

export default NewDraw;
