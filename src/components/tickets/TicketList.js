import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./tickets.css"

export const TicketList = ({ searchText }) => {
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setfiltered] = useState([])
    const [emergency, setEmergency] = useState(false)
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
    const navigate = useNavigate()
    const [openOnly, setOpen] = useState(false)

    useEffect(() => {
        const searchedTickets = tickets.filter(ticket => ticket.description.toLowerCase().startsWith(searchText.toLowerCase()))
        setfiltered(searchedTickets)
    },
    [ searchText ]
    )

    useEffect(() => {
        if (openOnly) {
            const openTicketArray = tickets.filter(ticket => {
                return ticket.userId === honeyUserObject.id && ticket.dateCompleted == ""
            }
            )
            setfiltered(openTicketArray)
        } else {
            const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
            setfiltered(myTickets)
        }
    },
        [openOnly])


    useEffect(
        () => {
            if (emergency) (
                setfiltered(tickets.filter((ticket) => ticket.emergency === true))
            )
            else {
                setfiltered(tickets)
            }
        }
        ,
        [emergency]
    )

    useEffect(
        () => {
            fetch('http://localhost:8088/serviceTickets')
                .then((res) => res.json())
                .then((ticketArray) => { setTickets(ticketArray) })
            console.log("Initial state of tickets", tickets) // View the initial state of tickets
        },
        [] // When this array is empty, you are observing initial component state
    )
    useEffect(
        () => {
            if (honeyUserObject.staff) {
                setfiltered(tickets)
            }
            else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setfiltered(myTickets)
            }
        }, [tickets]
    )
    return <>
        {
            honeyUserObject.staff
                ? <><button onClick={() => { setEmergency(true) }}>Emergency Only</button>
                    <button onClick={() => { setEmergency(false) }}>All Tickets</button>
                </>
                : <><button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
                    <button onClick={() => setOpen(true)}>Open Tickets</button>
                    <button onClick={() => setOpen(false)}>All My tickets</button>
                </>
        }

        <h2>List of Tickets</h2>

        <article className="tickets">
            {
                filteredTickets.map(
                    (ticket) => {
                        return <section className="ticket">
                            <header>{ticket.description}</header>
                            <footer>{ticket.emergency ? "🧨" : "No"}</footer>
                        </section>
                    }
                )
            }
        </article>
    </>
}