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
 
function SpreadSheetStudent() {
    // const [selectMaterialName, setSelectMaterialName] = useState('material_1')

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
        SSObj.protectSheet(0, { selectCells: true }, "123");
        SSObj.lockCells("E3:E12", false);

     };
 
    //  insert new sheet 
    const inSertNewSheet =(name, id)=>{
        console.log(name, id);
        SSObj.insertSheet([{
            index: {id},
            name: {name},
            ranges: [{dataSource: studentName}],
            columns: [{ width: 150 }, { width: 110 }, { width: 110 }, { width: 85 }, { width: 85 }, { width: 85 }]
          }])
    }

    // const insert=()=>{
    //     SSObj.insertSheet(insertSheetModel);
    //     SSObj.duplicateSheet();

    // }

    return (
        <div> 
            <DropdownButs inSertNewSheet={inSertNewSheet} />
            <SpreadsheetComponent
                height={500}
                ref={((x) => SSObj = x)}
                created={onCreated}
                allowCellFormatting={true}
                allowConditionalFormat={true}
                allowDataValidation={true}
                isProtected={true} password="123"
                allowOpen={true}
                openUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open"
                allowSave={true}
                saveUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save">

                <SheetsDirective>
                    <SheetDirective frozenRows={2} frozenColumns={2} >

                        <RowsDirective>
                            <RowDirective height={40}>
                                <CellsDirective>
                                    <CellDirective value='test' colSpan={5}></CellDirective>
                                </CellsDirective>
                            </RowDirective>
                        </RowsDirective>

                        <RangesDirective  >
                            <RangeDirective dataSource={studentName} startCell="A2"></RangeDirective>
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