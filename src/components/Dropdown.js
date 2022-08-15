import { React } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import { materialNames } from '../data/StudentsName'

export default function DropdownButs({inSertNewSheet}) {
     const selectedDrop = (materialName,id) => {
         inSertNewSheet(materialName,id)
    }
    return (
        <div>
            <Dropdown style={{ margin: '50px' }}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Dropdown Button
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {materialNames &&
                        materialNames.map(materialName => (
                            <Dropdown.Item key={materialName.id} 
                             onClick={() => selectedDrop(materialName.materialName,materialName.id)} 
                            >{materialName.materialName}</Dropdown.Item>
                        ))
                    }
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}
