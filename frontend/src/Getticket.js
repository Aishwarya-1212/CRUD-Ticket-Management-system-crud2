import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
export default function Getticket({list, load})
{
    return ( 
    <> 
    
            <Table hover responsive size="sm" className="table table-info">
                <thead >
                    <tr>
                        <th>TICKET ID</th>
                        <th>CUSTOMER NAME</th>
                        <th>ISSUE DESCRIPTION</th>
                        <th>STATUS</th>
                        <th>DATE</th>
                    </tr>
                </thead>
                <tbody>
                    {list.sort((a,b) => a.customername.localeCompare(b.customername)).map( (i) => (
                        <tr key={i._id}>
                            <td className="bg-warning text-white">{i.ticketid}</td>
                            <td>{i.customername}</td>
                            <td>{i.issue}</td>
                            <td>{i.status}</td>
                            <td>{new Date(i.ticketdate).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </Table> 


    </>
    )
}