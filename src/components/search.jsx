import axios from "axios"
import { useEffect } from "react"
import styled from "styled-components"
import Options from "./departmentOptions"

export default function Search(props) {

    const { departments, setDepartments, dep, setDep, name, setName, search, setSearch } = props

    function handleChange(e) {
        e.preventDefault()
        setName(e.target.value)
    }

    function handleClick(e) {
        e.preventDefault()
        setSearch(!search)
    }

    async function getDepartments() {
        const BASE_URL = import.meta.env.VITE_API_URL
        const url = `${BASE_URL}/departments`
        axios.get(url)
            .then(resp => {
                setDepartments(resp.data)
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }

    useEffect(() => {
        getDepartments()
    }, [])

    return (
        <>
            <Container>
                <Form>
                    <label>Nome</label>
                    <input
                        type="text"
                        value={name}
                        onChange={handleChange}
                    />
                </Form>
                <Options departments={departments} dep={dep} setDep={setDep} def='' />
                <button onClick={handleClick}>Pesquisar</button>
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
    padding: 20px;
    button{
        position: absolute;
        right: 20px;
        top: 27px;
        height: 60px;
        width: 120px;
        background-color: #c0bbbb;
        border: 1px solid black;
        cursor: pointer;
    }
`

export const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    width: 30%;
    background-color: red;
    margin-right: 30px;
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