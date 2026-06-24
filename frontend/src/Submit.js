import {useForm} from "react-hook-form";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card"
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
export default function Submit({list, load})
{
    const {register, handleSubmit,reset,setValue ,formState: {errors}} = useForm();
    
    const add = async (data) => {
        await axios.post("http://localhost:5000/add", data)
        await load();
        reset();
    }

    const onSubmit = (data) => {
        console.log(data);
        add(data);
    }
    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            TICKET ID: < input {...register("ticketid", {
                required : "Ticket ID is required!!",
                setValueAs : Number,
            })} />
            <p>{errors.ticketid?.message}</p>

            CUSTOMER NAME: <input {...register("customername", {
                required : "NAME is required!!",
                minLength : {
                    value : 5,
                    message :"minimun 5 has to be there!!"
                }
            })}/>
            <p>{errors.customername?.message}</p>

            ISSUE DESCRIPTION: <textarea {...register("issue", {
                required : "issues description is required!!"
            })} />
            <p>{errors.issue?.message}</p>

            STATUS: <input type="checkbox" value="open" {...register("status")}/>OPEN
                    <input type="checkbox" value="close" {...register("status")}/>CLOSE

            TICKETED DATE: <input type="date" {...register("ticketdate", {
                required:"date is required!!"
            })}/>
            <p>{errors.ticketdate?.message};</p>

            <Button variant="primary" type="submit">SUBMIT</Button>{''}

        </form>
            {list.map((item) => (
  <Card key={item.ticketid} className="bg-danger text-white mb-3">
    <Card.Header>Customer infos</Card.Header>
    <Card.Body>
      <Card.Title>{item.customername}</Card.Title>
      <Card.Text>
        Issue: {item.issue}
      </Card.Text>
      <Card.Text>
        Status: {item.status}
      </Card.Text>
    </Card.Body>
    <Card.Footer className="bg-dark text-white">Customer info</Card.Footer>
  </Card>
))}
           

        </>
    )
}