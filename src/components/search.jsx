import styled from "styled-components"

export default function Search() {
    return (
        <>
            <Container>
                <Form>
                    <label>Nome</label>
                    <input
                        type="search"
                        title="Nome"
                    />
                </Form>
                <Form>
                    <label>Departamento</label>
                    <select id="estado" name="estado">
                        <option value="SP">SP</option>
                        <option value="RJ">RJ</option>
                        <option value="PB">PB</option>
                    </select>
                </Form>
                <button>Pesquisar</button>
            </Container>
        </>
    )
}

const Container = styled.div`
    width: calc(100vw - 60px);
    height: 120px;
    border: 1px solid black;
    display: flex;
    align-items: center;
    position: relative;
    button{
        position: absolute;
        right: 20px;
        top: 27px;
        height: 60px;
        width: 120px;
        background-color: #c0bbbb;
        border: 1px solid black;
    }
`

const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    width: 30%;
    background-color: red;
    margin-left: 30px;
    input {
        font-weight: 400;
        line-height: 20px;
        color: black;
        font-size: 18px;
        width: 100%;
        outline: none;
        border: none;
        height: 42px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        border: 1px solid black;
    }
    label {
        display: 'block';
        margin-bottom: '5px';
        position: absolute;
        left: 0px;
        top: -20px;
    }
    select{
        font-weight: 400;
        line-height: 20px;
        color: black;
        font-size: 18px;
        width: 100%;
        outline: none;
        border: none;
        height: 42px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        border: 1px solid black;
        background-color: white;
    }
`