import { useEffect, useState } from "react"
import { Employee } from "./Employee"
import { Customer } from "./Customer"


export const CustomerList = () => {

        const [customers, setCustomers] = useState([])
        
        useEffect(() => {
            fetch('http://localhost:8088/users?isStaff=false')
            .then(res => res.json())
            .then((customerArray) => setCustomers(customerArray))
        }, []
        )
        
        return ( <>
        <h1>List of all Customers</h1>
         <article className="customers">

        {
            customers.map(customer =>
                <Customer key={`customer--${customer.id}`}
                    id={customer.id}
                    fullName={customer.fullName}
                    email={customer.email} />)
        }
    </article>
    </>
    )

}
