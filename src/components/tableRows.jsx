import dayjs from "dayjs"
import styled from "styled-components"


export default function TableRows(props) {
    const { employees, employeeToUpdate, setEmployeeToUpdate, showUpdatePopUp, setShowUpdatePopUp, showDeletePopUp, setShowDeletePopUp, employeeToDelete, setEmployeeToDelete } = props

    function updateEmployee(e, employee) {
        e.preventDefault()
        setShowUpdatePopUp(true)
        setEmployeeToUpdate(employee)
    }

    function deleteEmployee(e, employee) {
        e.preventDefault()
        setShowDeletePopUp(true)
        setEmployeeToDelete(employee)
    }

    return (
        <>
            {employees.map((employee, indice) => (
                <tr key={indice}>
                    <td>{employee.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}</td>
                    <td>{employee.Department.name}</td>
                    <td>R$ {(employee.salary / 100).toFixed(0)},00</td>
                    <td>{dayjs(employee.dateOfBirth).format('DD/MM/YYYY')}</td>
                    <td><Box><div onClick={(e) => updateEmployee(e, employee)}>editar</div><p> - </p><div onClick={(e) => deleteEmployee(e, employee)}> excluir</div></Box></td>
                </tr>
            ))}
        </>
    )
}

const Box = styled.div`
    display: flex;
    justify-content: space-between;
    width: 120px;
    div{
        margin: 0;
        cursor: pointer;
    }
    p{
        margin: 0;
    }
`