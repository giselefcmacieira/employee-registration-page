import styled from "styled-components"
import { Header } from "./pop-upNewEmployee"
import axios from "axios";

export default function PopUpDeleteEmployee(props) {
    const { employeeToDelete, showDeletePopUp, setShowDeletePopUp, employeeDeleted, setEmployeeDeleted } = props
    const cleanedCpf = employeeToDelete.cpf.replace(/\D/g, ''); // Remove caracteres não numéricos
    const formattedCpf = cleanedCpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
    function cancel() {
        setShowDeletePopUp(false)
    }
    async function deleteEmployee(e) {
        e.preventDefault()
        const BASE_URL = import.meta.env.VITE_API_URL
        const url = `${BASE_URL}/employees/${employeeToDelete.id}`
        axios.delete(url)
            .then(resp => {
                setShowDeletePopUp(false)
                setEmployeeDeleted(!employeeDeleted)
            })
            .catch(err => {
                alert(err.response.data.message)
            })
    }
    return (
        <>
            <PopUpContainer>
                <Header>Deseja excluir o funcionário abaixo?</Header>
                <InformationsContainer>
                    <p>{employeeToDelete.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}</p>
                    <p>CPF: {formattedCpf}</p>
                </InformationsContainer>
                <ButtonContainer>
                    <button onClick={cancel}>Cancelar</button>
                    <button onClick={deleteEmployee}>Excluir</button>
                </ButtonContainer>
            </PopUpContainer>
        </>
    )
}

const PopUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
    height: 300px;
    position: fixed;
    top: 500px;
    right: 20px;
    background-color: white;
    border: 1px solid black;
    z-index: 3;
    padding: 20px;
`

const InformationsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    p {
        margin-bottom: 30px;
    }
`

export const ButtonContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: space-between;
    margin-top: 10px;
    button {
        border: 1px solid black;
        background-color: gray;
        margin-right: 20px;
        padding: 5px;
        width: 100px;
        margin-left: 40px;
        margin-right: 40px;
        cursor: pointer;
    }
`