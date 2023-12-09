import { useEffect, useState } from "react";
import NewEmployeeButton from "../components/buttonNewEmployee";
import InformationTable from "../components/informationTable";
import Search from "../components/search";
import axios from "axios";
import PopUpNewEmployee from "../components/pop-upNewEmployee";
import PopUpUpdteEmployee from "../components/pop-upUpdateEmployee";
import PopUpDeleteEmployee from "../components/pop-upDeleteEmployee";


export default function MainPage() {
    const [departments, setDepartments] = useState([])
    const [dep, setDep] = useState('')
    const [name, setName] = useState('')
    const [employees, setEmployees] = useState([])
    const [search, setSearch] = useState(false)
    const [showNewEmployeePopUp, setShowNewEmployeePopUp] = useState(false)
    const [employeeToUpdate, setEmployeeToUpdate] = useState({})
    const [showUpdatePopUp, setShowUpdatePopUp] = useState(false)
    const [employeeAdd, setEmployeeAdd] = useState(false)
    const [employeeUpdated, setEmployeeUpdated] = useState(false)
    const [showDeletePopUp, setShowDeletePopUp] = useState(false)
    const [employeeToDelete, setEmployeeToDelete] = useState({})
    const [employeeDeleted, setEmployeeDeleted] = useState(false)

    async function getEmployees() {
        const BASE_URL = import.meta.env.VITE_API_URL
        ///employees?departmentId=1&name=Paula
        let url = `${BASE_URL}/employees`
        if (dep !== '' && name === '') url += `?departmentId=${dep}`
        if (dep === '' && name !== '') url += `?name=${name}`
        if (dep !== '' && name !== '') url += `?name=${name}&departmentId=${dep}`
        console.log(url)
        axios.get(url)
            .then(resp => {
                setEmployees(resp.data)
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }

    useEffect(() => {
        getEmployees()
    }, [search, employeeAdd, employeeUpdated, employeeDeleted])

    return (
        <>
            {showNewEmployeePopUp
                ?
                <PopUpNewEmployee
                    departments={departments} setDepartments={setDepartments}
                    dep={dep} setDep={setDep}
                    showNewEmployeePopUp={showNewEmployeePopUp} setShowNewEmployeePopUp={setShowNewEmployeePopUp}
                    employeeAdd={employeeAdd} setEmployeeAdd={setEmployeeAdd}
                    name={name} setName={setName}
                />
                :
                ''}
            {showUpdatePopUp
                ?
                <PopUpUpdteEmployee
                    departments={departments} setDepartments={setDepartments}
                    dep={dep} setDep={setDep}
                    showUpdatePopUp={showUpdatePopUp} setShowUpdatePopUp={setShowUpdatePopUp}
                    employeeToUpdate={employeeToUpdate} setEmployeeToUpdate={setEmployeeToUpdate}
                    employeeUpdated={employeeUpdated} setEmployeeUpdated={setEmployeeUpdated}
                    name={name} setName={setName}
                />
                :
                ''
            }
            {showDeletePopUp
                ?
                <PopUpDeleteEmployee
                    employeeToDelete={employeeToDelete}
                    showDeletePopUp={showDeletePopUp} setShowDeletePopUp={setShowDeletePopUp}
                    employeeDeleted={employeeDeleted} setEmployeeDeleted={setEmployeeDeleted}
                />
                :
                ''

            }
            <Search
                departments={departments} setDepartments={setDepartments}
                dep={dep} setDep={setDep}
                name={name} setName={setName}
                search={search} setSearch={setSearch}
            />
            <InformationTable
                employees={employees} setEmployees={setEmployees}
                employeeToUpdate={employeeToUpdate} setEmployeeToUpdate={setEmployeeToUpdate}
                showUpdatePopUp={showUpdatePopUp} setShowUpdatePopUp={setShowUpdatePopUp}
                employeeToDelete={employeeToDelete} setEmployeeToDelete={setEmployeeToDelete}
                showDeletePopUp={showDeletePopUp} setShowDeletePopUp={setShowDeletePopUp}
            />
            <NewEmployeeButton showNewEmployeePopUp={showNewEmployeePopUp} setShowNewEmployeePopUp={setShowNewEmployeePopUp} />
        </>
    )
}
