import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';

export class EditEmpModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'company',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                CompanyId:null,
                CompanyName:event.target.CompanyName.value,
                Address:event.target.Address.value,
                NIT:event.target.NIT.value,
                PhoneNumber:event.target.PhoneNumber.value

            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }


    handleFileSelected(event){
        event.preventDefault();
        this.photofilename=event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch(process.env.REACT_APP_API+'Employee/SaveFile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.imagesrc=process.env.REACT_APP_PHOTOPATH+result;
        },
        (error)=>{
            alert('Failed');
        })
        
    }

    render(){
        return (
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header clooseButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Edit Company
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="CompanyName">
                        <Form.Label>CompanyName</Form.Label>
                        <Form.Control type="text" name="CompanyName" required 
                        placeholder="CompanyName"/>
                    </Form.Group>

                    <Form.Group controlId="Address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control 
                        type="text"
                        name="Address"
                        required
                        placeholder="Address"
                        />                        
                    </Form.Group>

                    <Form.Group controlId="NIT">
                        <Form.Label>NIT</Form.Label>
                        <Form.Control 
                        type="text"
                        name="NIT"
                        required
                        placeholder="Company's Id"
                        />                        
                    </Form.Group>

                    <Form.Group controlId="PhoneNumber">
                        <Form.Label>PhoneNumber</Form.Label>
                        <Form.Control 
                        type="text"
                        name="PhoneNumber"
                        required
                        placeholder="Company's phone"
                        />                        
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Update Company
                        </Button>
                    </Form.Group>
                </Form>
            </Col>

            <Col sm={6}>
                <Image width="200px" height="200px" 
                src={process.env.REACT_APP_PHOTOPATH+this.props.photofilename}/>
                <input onChange={this.handleFileSelected} type="File"/>
            </Col>
        </Row>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}
