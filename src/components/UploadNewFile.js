import { React, useState } from 'react'
import * as XLSX from 'xlsx';

function UploadNewFile({ setExcelData }) {

     const [excelFile, setExcelFile] = useState(null);
    console.log(excelFile)
    const [excelFileError, setExcelFileError] = useState(null);


    // upload files 

    const fileType = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    const handleFile = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {

            if (selectedFile && fileType.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = (e) => {
                    setExcelFileError(null);
                    setExcelFile(e.target.result);
                }
            }
            else {
                setExcelFileError('Please select only excel file types');
                setExcelFile(null);
            }
        }
        else {
            console.log('Please select your file');
        }
    }

    // submit function
    const handleSubmit = (e) => {
        e.preventDefault();
        if (excelFile !== null) {
            const workbook = XLSX.read(excelFile, { type: 'buffer' });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            setExcelData(data);
        }
        else {
            setExcelData(null);
        }
    }

    return (
        <div>
            <form
                className='form-group'
                autoComplete="off"
                onSubmit={handleSubmit}>

                <input type='file'
                    onChange={handleFile} required></input>
                {excelFileError && <div className='text-danger' style={{ margin: '10px' }}>{excelFileError}</div>}

                <button
                    type='submit'
                    className='btn btn-success'
                    style={{ margin: '10px' }}>Upload</button>
            </form>

        </div>
    )
}

export default UploadNewFile