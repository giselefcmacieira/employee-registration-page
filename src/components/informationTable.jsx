import styled from "styled-components"


export default function InformationTable() {
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
                <tr>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                </tr>
            </Table>
        </>
    )
}

const Table = styled.table`
    width: 100%;
    border: 1px solid black;
    margin-top: 20px;
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
    }
`

const MainRow = styled.tr`
    height: 20px;
    border: 1px solid black;
    background-color: gray;
    height: 80px;
    th:last-child{
        width: 360px;
    }
`