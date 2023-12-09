import styled from "styled-components"
import Options from "./departmentOptions"
import { useState } from "react";
import dayjs from "dayjs";
import axios from "axios";


export default function PopUpNewEmployee(props) {
    const { departments, setDepartments, dep, setDep, showNewEmployeePopUp, setShowNewEmployeePopUp, employeeAdd, setEmployeeAdd } = props
    const [name, setName] = useState('')
    const [cpf, setCpf] = useState('');
    const [salary, setSalary] = useState('R$');
    const [data, setData] = useState('');

    function handleCPFChange(event) {
        let inputValue = event.target.value.replace(/\D/g, '');

        if (inputValue.length > 3) {
            inputValue = inputValue.replace(/^(\d{3})(\d)/, '$1.$2');
        }

        if (inputValue.length > 6) {
            inputValue = inputValue.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
        }

        if (inputValue.length > 9) {
            inputValue = inputValue.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
        }

        setCpf(inputValue);
    }

    function handleSalaryChange(event) {
        let inputValue = event.target.value.replace(/\D/g, '');

        if (inputValue.length > 2) {
            inputValue = inputValue.replace(/(\d{2})$/, ',$1');
        }

        if (inputValue.length > 6) {
            inputValue = inputValue.replace(/(\d{3}),(\d{2})$/, '.$1,$2');
        }

        setSalary(`R$ ${inputValue}`);
    }

    function handleDateChange(event) {
        let inputValue = event.target.value.replace(/\D/g, '');

        if (inputValue.length > 2 && inputValue.length <= 4) {
            inputValue = inputValue.replace(/(\d{2})(\d{2})/, '$1/$2');
        } else if (inputValue.length > 4) {
            inputValue = inputValue.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
        }


        setData(inputValue);
    };

    function handleNameChange(e) {
        e.preventDefault()
        setName(e.target.value)
    }

    function cancel(e) {
        e.preventDefault()
        setDep('')
        setShowNewEmployeePopUp(false)
    }

    async function createNewEmployee(e) {
        e.preventDefault()
        if (data.length !== 10) {
            return alert('Invalid Date of birth')
        }
        const parts = data.split('/');
        const BASE_URL = import.meta.env.VITE_API_URL
        const url = `${BASE_URL}/employees`
        const body = {
            name,
            cpf: cpf.replace(/\D/g, ''),
            salary: salary.replace(/\D/g, ''),
            dateOfBirth: dayjs(`${parts[2]}-${parts[1]}-${parts[0]}`).toISOString(),
            departmentId: dep
        }
        axios.post(url, body)
            .then(resp => {
                setDep('')
                setEmployeeAdd(!employeeAdd)
                setShowNewEmployeePopUp(false)
            })
            .catch(err => {
                alert(err.response.data.message)
            })

    }

    return (
        <>
            <PopUpContainer>
                <Header>Novo funcionário</Header>
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
                <Options departments={departments} dep={dep} setDep={setDep} def='' />
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
                        value={data}
                        onChange={handleDateChange}
                    />
                </Form>
                <ButtonContainer>
                    <button onClick={cancel}>
                        Cancelar
                    </button>
                    <button onClick={createNewEmployee}>
                        Salvar
                    </button>
                </ButtonContainer>
            </PopUpContainer>
        </>
    )
}

export const PopUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 600px;
    position: fixed;
    top: 100px;
    right: 20px;
    background-color: white;
    border: 1px solid black;
    z-index: 3;
    padding: 20px;
`
export const Header = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    margin-bottom: 30px;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    position: relative;
    width: 90%;
    margin-bottom: 40px;
    label {
        display: 'block';
        margin-bottom: '5px';
        position: absolute;
        left: 0px;
        top: -20px;
    }
`

export const NameInput = styled.input`
    font-weight: 400;
    line-height: 20px;
    color: black;
    font-size: 18px;
    width: 100%;
    outline: none;
    height: 42px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    border: 1px solid black;
`

export const CPFInput = styled.input`
    font-weight: 400;
    line-height: 20px;
    color: black;
    font-size: 18px;
    width: 35%;
    outline: none;
    height: 42px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    border: 1px solid black;
`

export const SalaryForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    position: relative;
    width: 90%;
    margin-bottom: 40px;
    margin-top: 40px;
    label {
        display: 'block';
        margin-bottom: '5px';
        position: absolute;
        left: 0px;
        top: -20px;
    }
`
export const SalaryInput = styled.input`
    font-weight: 400;
    line-height: 20px;
    color: black;
    font-size: 18px;
    width: 35%;
    outline: none;
    height: 42px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    border: 1px solid black;
`

export const DateOfBirthInput = styled.input`
    font-weight: 400;
    line-height: 20px;
    color: black;
    font-size: 18px;
    width: 35%;
    outline: none;
    height: 42px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    border: 1px solid black;
`

export const ButtonContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    button {
        border: 1px solid black;
        background-color: gray;
        margin-right: 20px;
        padding: 5px;
        width: 100px;
        cursor: pointer;
    }
`