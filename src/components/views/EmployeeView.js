import { Outlet, Route, Routes } from "react-router-dom"
import { TicketContainer } from "../tickets/TicketContainer"
import { EmployeeList } from "../employees/EmployeesList"
import { EmployeeDetails } from "../employees/EmployeeDetails"
import { CustomerList } from "../employees/CustomerList"
import { CustomerDetails } from "../employees/CustomerDetails"
export const EmployeeViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Honey Rae Repair Shop</h1>
                    <div>Your one-stop-shop to get all your electronics fixed</div>

                    <Outlet />
                </>
            }>

                <Route path="tickets" element={ <TicketContainer /> } />
                <Route path="employees" element={ <EmployeeList />} />
                <Route path="employees/:employeeId" element={ <EmployeeDetails />} />
                <Route path="customers" element={ <CustomerList />} />
                <Route path="customers/:customerId" element={ <CustomerDetails />} />
            </Route>
        </Routes>
    )
}