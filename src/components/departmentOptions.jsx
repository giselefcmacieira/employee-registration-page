import { useEffect } from "react";
import { Form } from "./search";


export default function Options(props) {
    const { departments, dep, setDep, def } = props

    function handleSelection(e) {
        e.preventDefault()
        setDep(e.target.value)
    }

    useEffect(() => {
        setDep(def)
    }, [])
    return (
        <Form>
            <label>Departamento</label>
            <select defaultValue={def} onChange={handleSelection}>
                <option key='vazio' value={''}></option>
                {departments.map((department, indice) => (
                    <option key={indice} value={department.id}>
                        {department.name}
                    </option>
                ))}
            </select>
        </Form>
    )
}