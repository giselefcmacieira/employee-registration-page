import { useState } from "react";
import Options from "./departmentOptions";
import { ButtonContainer, CPFInput, DateOfBirthInput, Form, Header, NameInput, PopUpContainer, SalaryForm, SalaryInput } from "./pop-upNewEmployee";
import dayjs from "dayjs";
import axios from "axios";

export default function PopUpUpdteEmployee(props) {
    const { departments, setDepartments, dep, setDep, showUpdatePopUp, setShowUpdatePopUp, employeeToUpdate, setEmployeeToUpdate, employeeUpdated, setEmployeeUpdated } = props
    const [name, setName] = useState(employeeToUpdate.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' '))
    const cleanedCpf = employeeToUpdate.cpf.replace(/\D/g, '');
    const formattedCpf = cleanedCpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
    const [cpf, setCPF] = useState(formattedCpf)
    const [salary, setSalary] = useState(`R$ ${(employeeToUpdate.salary / 100).toFixed(0)},00`)
    const [dateOfBirth, setDateOfBirth] = useState(dayjs(employeeToUpdate.dateOfBirth).format('DD/MM/YYYY'))

    function cancel(e) {
        e.preventDefault()
        setShowUpdatePopUp(false)
        setDep('')
    }

    function handleNameChange(e) {
        e.preventDefault()
        setName(e.target.value)
    }

    function handleCPFChange(e) {
        e.preventDefault()
        let inputValue = e.target.value.replace(/\D/g, '');

        if (inputValue.length > 3) {
            inputValue = inputValue.replace(/^(\d{3})(\d)/, '$1.$2');
        }

        if (inputValue.length > 6) {
            inputValue = inputValue.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
        }

        if (inputValue.length > 9) {
            inputValue = inputValue.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
        }

        setCPF(inputValue)
    }

    function handleSalaryChange(e) {
        e.preventDefault()
        let inputValue = e.target.value.replace(/\D/g, '');

        if (inputValue.length > 2) {
            inputValue = inputValue.replace(/(\d{2})$/, ',$1');
        }

        if (inputValue.length > 6) {
            inputValue = inputValue.replace(/(\d{3}),(\d{2})$/, '.$1,$2');
        }

        setSalary(`R$ ${inputValue}`)
    }

    function handleBirthChange(e) {
        e.preventDefault()
        let inputValue = e.target.value.replace(/\D/g, '');

        if (inputValue.length > 2 && inputValue.length <= 4) {
            inputValue = inputValue.replace(/(\d{2})(\d{2})/, '$1/$2');
        } else if (inputValue.length > 4) {
            inputValue = inputValue.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
        }
        setDateOfBirth(inputValue)
    }

    async function updateEmployee(e) {
        e.preventDefault()
        if (dateOfBirth.length !== 10) {
            return alert('Invalid Date of birth')
        }
        const parts = dateOfBirth.split('/');
        const BASE_URL = import.meta.env.VITE_API_URL
        const url = `${BASE_URL}/employees/${employeeToUpdate.id}`
        const body = {
            name,
            cpf: cpf.replace(/\D/g, ''),
            salary: salary.replace(/\D/g, ''),
            dateOfBirth: dayjs(`${parts[2]}-${parts[1]}-${parts[0]}`).toISOString(),
            departmentId: dep
        }

        axios.put(url, body)
            .then(resp => {
                setDep('')
                setEmployeeUpdated(!employeeUpdated)
                setShowUpdatePopUp(false)
            })
            .catch(err => {
                alert(err.response.data.message)
            })
    }

    return (
        <>
            <PopUpContainer>
                <Header>Editar funcionário</Header>
                <Form>
                    <label>Nome</label>
                    <NameInput
                        value={name}
                        onChange={handleNameChange}
                    />
                </Form>
                <Form>
                    <label>CPF</label>
                    <CPFInput
                        value={cpf}
                        onChange={handleCPFChange}
                    />
                </Form>
                <Options departments={departments} dep={dep} setDep={setDep} def={employeeToUpdate.Department.id} />
                <SalaryForm>
                    <label>Salário</label>
                    <SalaryInput
                        value={salary}
                        onChange={handleSalaryChange}
                    />
                </SalaryForm>
                <Form>
                    <label>Data de nascimento</label>
                    <DateOfBirthInput
                        value={dateOfBirth}
                        onChange={handleBirthChange}
                    />
                </Form>
                <ButtonContainer>
                    <button onClick={cancel}>
                        Cancelar
                    </button>
                    <button onClick={updateEmployee}>
                        Salvar
                    </button>
                </ButtonContainer>
            </PopUpContainer>
        </>
    )
}