import {useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
export default function Updateticket({list, load})
{
    const [editId, setEditId] = useState("");
    const [status, setStatus] = useState("");
    const [delname, setDelname] = useState("");
    const {register, handleSubmit,reset,setValue ,formState:{errors}} = useForm();

    const dele = async() => {
        await axios.delete("http://localhost:5000/deletebtech");
        await load();
    }

    const update = async (data) => {
        await axios.put(`http://localhost:5000/update/${editId}`, data);
        await load();
    }

    const editt = (i) => {
        setEditId(i._id);
        setValue("ticketid", i.ticketid);
        setValue("customername", i.customername);
        setValue("issue", i.issue);
        setValue("status", i.status);
        setValue("ticketdate", i.ticketdate)
    }

    const add = async (data) => {
        await axios.post("http://localhost:5000/add", data)
        await load();
        reset();
    }

    const onSubmit = (data) => {
        console.log(data);
        add(data);
    }

    const removeUser = async (e) => {
        e.preventDefault();
        const res = await axios.delete(`http://localhost:5000/delete/${delname}`);
        alert(res.data.msg);
        await load();
    }
    console.log("LIST:", list);
    return ( <>

       <form onSubmit={removeUser}>
            ENTER NAME: < input value={delname} onChange={(e) => setDelname(e.target.value)} />
           <button type="submit">delete</button>
        </form> 

        <center><h1>THE FORM</h1></center>

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

            STATUS: <input type="radio" value="open" {...register("status")}/>OPEN
                    <input type="radio" value="close" {...register("status")}/>CLOSE
                    <input type="radio" value="pending" {...register("status")}/>PENDING

            TICKETED DATE: <input type="date" {...register("ticketdate", {
                required:"date is required!!"
            })}/>
            <p>{errors.ticketdate?.message};</p>

                    <button variant="primary" type="submit">SUBMIT</button>{''}
                </form>
                    
                    {Array.isArray(list)  && (
                        list.map( (i) => (<li key={i._id}>
                            {i.ticketid} || {i.customername} || {i.issue} || {i.status} || {i.ticketdate}

                            <button onClick={() => {editt(i)}}>EDIT</button>
                        </li>))
                    )}
            <button onClick={handleSubmit(update)}>UPDATE</button>
        </>
    )
}