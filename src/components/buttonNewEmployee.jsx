import styled from "styled-components"

export default function NewEmployeeButton(props) {

    const { showNewEmployeePopUp, setShowNewEmployeePopUp } = props

    function handleClick() {
        setShowNewEmployeePopUp(!showNewEmployeePopUp)
    }

    return (
        <>
            <Button onClick={handleClick}>
                Novo funcionário
            </Button>
        </>
    )
}

const Button = styled.button`
    height: 60px;
    width: 200px;
    background-color: #c0bbbb;
    border: 1px solid black;
    margin-top: 20px;
    cursor: pointer;
`