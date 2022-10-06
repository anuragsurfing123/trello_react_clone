import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import {addCard, deleteCard, updateCard} from '../redux/features/trello/trelloSlices'
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

const AddCard = ({handleShow,handleClose,show,type}) => {
    const dispatch = useDispatch()
    


    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [group, setGroup] = useState("");
    const [error, setError] = useState({
        title:"",
        description:""
    });


    const handleSubmit = (itemId)=>{

        if(type.type == "add"){

            dispatch(addCard({name,description,group}))
            handleClose()
            toast.success('Card Added Successfully', {
                position: "bottom-right"
              })

        }else{
            dispatch(updateCard({itemId:itemId,name,description,group}))
            handleClose()
            toast.success('Card Updated Successfully', {
                position: "bottom-right"
            })

        }

    }

    const handleDelete = (itemId)=>{
        dispatch(deleteCard({itemId:itemId,name,description,group}))
        handleClose()
        toast.error('Card Deleted Successfully', {
            position: "bottom-right"
        })
        
    }

    const allLetter = (inputText) =>{
        if(inputText==null || inputText==''){
            return false
        }

        var letters = /^[A-Za-z\s]+$/;
        if(inputText.match(letters))
        {
            return true;
        }
        else{
            return false
        }
            
    }

    const countCharacter = (inputTxt) =>{
        if(inputTxt==null || inputTxt==''){
            return false

        }
        var letters = /[a-zA-Z]/g;
        
        if(inputTxt.match(letters).length>25){
            return true
        }else{
            return false
        }
    }

    useEffect(()=>{
        

        if(type.type == "update" && show == true){
            setName(type.updateItem.content)
            setDescription(type.updateItem.description)
            setGroup(type.cardGroup)
        }else{
            setName("")
            setDescription("")
            setGroup("")
        }

    },[type])

    useEffect(()=>{
        if(allLetter(name) == false && countCharacter(description) == false){
            setError({
                title:false,
                description:false
            })
        }else if(allLetter(name) != false && countCharacter(description) == false){
            setError({
                title:true,
                description:false
            })

        }else if(allLetter(name) == false && countCharacter(description) != false){
            setError({
                title:false,
                description:true
            })

        }else{
            setError({
                title:true,
                description:true
            })
        }   


    },[name,description])

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{type.type == "update" ? "Update" : "Add"} Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <p>
                {error.description == false && <span style={{color:"red"}}>Minimum 25 character Required In Description</span>}<br/>
                {error.title == false &&<span style={{color:"red"}}>Only Alphabets are required In Title</span>}
            </p> */}


            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="john doe"
                  value={name}
                  onChange={(e) => {setName(e.target.value)}}
                />
                <p>{error.title == false &&<span style={{color:"red"}}>Only Alphabets are required In Title</span>}</p>
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Select Group</Form.Label>
              <Form.Select aria-label="Default select example"
              value={group}
              onChange={(e) => {setGroup(e.target.value)}}
              >
                <option value="col1">To Do </option>
                <option value="col2">In Progress</option>
                <option value="col3">Done</option>
            </Form.Select>

              </Form.Group>
              
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
                <p>{error.description == false && <span style={{color:"red"}}>Minimum 25 character Required In Description</span>}</p>
              </Form.Group>
              
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="secondary" onClick={handleClose}>
              Close
            </Button> */}
            
            
            {(error.title == true && error.description == true) && <Button variant="primary" onClick={()=>handleSubmit(type.itemId)}>
               {type.type == "update" ? "Update" : "Add"} 
            </Button>}
            {type.type == "update" && <Button variant="danger" onClick={()=>handleDelete(type.itemId)}>
              Delete
            </Button>}
          </Modal.Footer>
        </Modal>
      
    </div>
  )
}

export default AddCard
