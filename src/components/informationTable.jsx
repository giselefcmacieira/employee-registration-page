import styled from "styled-components"
import TableRows from "./tableRows"

export default function InformationTable(props) {
    const { employees, setEmployees, employeeToUpdate, setEmployeeToUpdate, showUpdatePopUp, setShowUpdatePopUp, showDeletePopUp, setShowDeletePopUp, employeeToDelete, setEmployeeToDelete } = props
    return (
        <>
            <Table>
                <MainRow>
                    <th>Nome</th>
                    <th>Departamento</th>
                    <th>Salário</th>
                    <th>Data de nascimento</th>
                    <th></th>
                </MainRow>

                <TableRows
                    employees={employees} employeeToUpdate={employeeToUpdate}
                    setEmployeeToUpdate={setEmployeeToUpdate}
                    showUpdatePopUp={showUpdatePopUp} setShowUpdatePopUp={setShowUpdatePopUp}
                    employeeToDelete={employeeToDelete} setEmployeeToDelete={setEmployeeToDelete}
                    showDeletePopUp={showDeletePopUp} setShowDeletePopUp={setShowDeletePopUp}
                />

            </Table>
        </>
    )
}

const Table = styled.table`
    width: 100%;
    border: 1px solid black;
    margin-top: 20px;
    position: relative;
    tr{
        text-align: center;
        height: 80px;
    }
    th{
        border: 1px solid black;
        text-align: left;
        vertical-align: middle;
        padding:10px;
    }
    td{
        border: 1px solid black;
        text-align: left;
        vertical-align: middle;
        padding:10px;
        line-height: 25px;
    }
`

const MainRow = styled.tr`
    height: 20px;
    border: 1px solid black;
    background-color: gray;
    height: 80px;
`