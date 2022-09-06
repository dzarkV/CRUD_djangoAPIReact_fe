import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddEmpModal} from './AddEmpModal';
import {EditEmpModal} from './EditEmpModal';

export class Employee extends Component{

    constructor(props){
        super(props);
        this.state={emps:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'company')
        .then(response=>response.json())
        .then(data=>{
            this.setState({emps:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteEmp(compid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'company/'+compid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {emps, compid,compname,addr,compnit,number}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>CompanyId</th>
                        <th>CompanyName</th>
                        <th>Address</th>
                        <th>NIT</th>
                        <th>PhoneNumber</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(emp=>
                            <tr key={emp.CompanyId}>
                                <td>{emp.CompanyName}</td>
                                <td>{emp.Address}</td>
                                <td>{emp.NIT}</td>
                                <td>{emp.PhoneNumber}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        compid:emp.CompanyId,compname:emp.CompanyName,addr:emp.Address, compnit:emp.NIT,number:emp.PhoneNumber})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteEmp(emp.CompanyId)}>
            Delete
        </Button>

        <EditEmpModal show={this.state.editModalShow}
        onHide={editModalClose}
        compid={compid}
        compname={compname}
        addr={addr}
        compnit={compnit}
        number={number}
        />
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Company</Button>

                    <AddEmpModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}