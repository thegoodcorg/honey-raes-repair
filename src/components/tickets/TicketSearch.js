export const TicketSearch = ({ searchInput }) => {
    return (<>
        <div>
            <input
                onChange={(changeEvent) => searchInput(changeEvent.target.value)}
                type="text" placeholder="Enter Search Terms"></input>
        </div>
    </>
    )
}