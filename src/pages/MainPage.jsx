import NewEmployeeButton from "../components/buttonNewEmployee";
import InformationTable from "../components/informationTable";
import Search from "../components/search";


export default function MainPage() {
    return (
        <>
            <Search />
            <InformationTable />
            <NewEmployeeButton />
        </>
    )
}
