import { React, useState } from 'react';
import DropdownButs from './Dropdown';
import {
    CellDirective, CellsDirective,
    ColumnDirective, ColumnsDirective,
    RangeDirective, RangesDirective,
    RowDirective, RowsDirective, SheetDirective,
    SheetsDirective, SpreadsheetComponent,
} from '@syncfusion/ej2-react-spreadsheet';

import { studentName } from '../data/StudentsName.js';
import UploadNewFile from './UploadNewFile'

function SpreadSheetStudent() {

    const [excelData, setExcelData] = useState(studentName);
    console.log(excelData);

    const [selectMaterialName, setSelectMaterialName] = useState('material_1');
    console.log(selectMaterialName)
    const [data, setData] = useState(null);
    console.log(data);

    let SSObj = SpreadsheetComponent;

    // on created event fun 
    const onCreated = () => {
        // style taple
        SSObj.cellFormat({
            fontWeight: "bold", textAlign: "center", verticalAlign: "middle", fontSize: "13pt",
            backgroundColor: "rgb(27 1 81)", color: "#fff"
        }, "A1:E1");
        SSObj.cellFormat({ fontWeight: "bold", textAlign: "center", backgroundColor: "#854EF2", color: "#fff" }, "A2:E12");

        // degree valdation
        SSObj.addDataValidation({ type: 'WholeNumber', operator: 'Between', value1: '1', value2: '100', ignoreBlank: true }, 'E3:E12');

        //    protected taple
        SSObj.protectSheet(0, { selectCells: true }, '123');
        SSObj.lockCells("E3:E12", false);

    };

    //  insert new sheet 
    const inSertNewSheet = (name, id) => {
        console.log(name, id);
        SSObj.insertSheet([{
            index: { id },
            name: { name },
            ranges: [{ dataSource: excelData }],
            columns: [{ width: 100 }, { width: 150 }, { width: 150 }, { width: 150 }, { width: 120 }, { width: 120 }]
        }])
    }

    //  save files 
    const ButtonClick = () => {
        SSObj.save({
            fileName: selectMaterialName,
            saveType: "XLSX"
        });
        let save = SSObj.saveUrl
        setData(save)
    }

    return (
        <div>
            <DropdownButs inSertNewSheet={inSertNewSheet} setSelectMaterialName={setSelectMaterialName} />
             <button className='e-btn  ' onClick={ButtonClick}>  save</button>
            <UploadNewFile setExcelData={setExcelData} />

            <SpreadsheetComponent
                height={500}
                ref={((x) => SSObj = x)}
                created={onCreated}
                allowCellFormatting={true}
                allowConditionalFormat={true}
                allowDataValidation={true}
                isProtected={true}
                allowOpen={true}
                openUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open"
                allowSave={true}
                saveUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save"
            >

                <SheetsDirective>
                    <SheetDirective frozenRows={2} frozenColumns={2} >

                        <RowsDirective>
                            <RowDirective height={40}>
                                <CellsDirective>
                                    <CellDirective value={selectMaterialName} colSpan={5}></CellDirective>
                                </CellsDirective>
                            </RowDirective>
                        </RowsDirective>

                        <RangesDirective  >
                            <RangeDirective dataSource={excelData} startCell={excelData ? "A2" : "A1"}></RangeDirective>
                        </RangesDirective>

                        <ColumnsDirective>
                            <ColumnDirective width={100}></ColumnDirective>
                            <ColumnDirective width={150}></ColumnDirective>
                            <ColumnDirective width={150}></ColumnDirective>
                            <ColumnDirective width={150}></ColumnDirective>
                            <ColumnDirective width={120}></ColumnDirective>
                            <ColumnDirective width={120}></ColumnDirective>
                        </ColumnsDirective>
                    </SheetDirective>
                </SheetsDirective>
            </SpreadsheetComponent></div>
    )
}

export default SpreadSheetStudent