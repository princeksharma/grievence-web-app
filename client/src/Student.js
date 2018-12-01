import React, { Component } from 'react';
import { Form, FormGroup, Input, Label, Button, Jumbotron } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col, Tooltip, Badge} from 'reactstrap';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


class Student extends Component {
  constructor() {
    super();

    this.state = {
      activeTab: '1',
      tooltipOpen: false,
      name: '',
      email: '',
      number: '',
      phoneNumber: '',
      department:'',
      value:'Ist',
      message: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChanges = this.onChanges.bind(this)
    this.toggle = this.toggle.bind(this)
    this.toggles = this.toggles.bind(this)
  }

  toggle(tab) {
  if (this.state.activeTab !== tab) {
    this.setState({
      activeTab: tab
    });
  }
}

toggles() {
 this.setState({
   tooltipOpen: !this.state.tooltipOpen
 });
}

  radioChange = e => {
    this.setState({value: e.target.value});
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value })
  }

  onChanges = e => {
    this.setState({ value: e.target.value });
  }

  async handleSubmit(e) {
     e.preventDefault()

    const { name, email,number, phoneNumber, department, year, message } = this.state;

    const form = await axios.post('/api/form', {
      name,
      email,
      number,
      phoneNumber,
      department,
      year,
      message
    })
  };


  render() {
     return (
       <div className="container">
       <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Student Grievance Form
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              More Forms
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <h4>Grievance Forms</h4>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="6">
                <Card body>
                  <CardTitle>SC/ST Grievance Form</CardTitle>
                  <CardText>Click Below to Open SC/ST Grievance Form</CardText>
                  <Badge href="/scst" color="success">SC/ST</Badge>
                </Card>
              </Col>
              <Col sm="6">
                <Card body>
                  <CardTitle>Internal Complaint Committee</CardTitle>
                  <CardText>Click Below to Open Internal Grievance Form</CardText>
                  <Badge href="/internal" color="success">Internal</Badge>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
        <p>Somewhere in here is a <span style={{textDecoration: "underline", color:"blue"}} href="#" id="TooltipExample">tooltip</span></p>
        <Tooltip placement="right" isOpen={this.state.tooltipOpen} target="TooltipExample" toggles={this.toggles}>
          Hello world!
        </Tooltip>
       <Form onSubmit={this.handleSubmit} onChange={this.handleChange} style={{ width: '1000px'}}>
        <FormGroup>
        <Jumbotron>
          <h1 className="display-3">Ambedkar Institute of Advanced Communication Technologies and Research</h1>
          <p className="lead"><h2>Student Grivences</h2></p>
          <hr className="my-2" />
          <h4>Occasionally, a student may encounter an issue or problem on campus that he or she has not been able to resolve. AIACTR, Delhi has a formal grievance process that students may initiate by submitting this official Student Grievance Form. Please complete all information requested so your grievance can be processed.
</h4>
          <p className="lead">
            <Button color="success">Login</Button>
          </p>
        </Jumbotron>
          <Label for="name"><h5>Name: </h5></Label>
          <Input
          type="text"
          name="name"
          onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="email"><h5>Email: </h5></Label>
          <Input
          type="email"
          name="email"
          onChange={this.handleChange} />
         </FormGroup>
          <FormGroup>
            <Label for="number"><h5>Roll Number: </h5></Label>
            <Input
            type="number"
            name="number"
            onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="Phone Number"><h5>Phone Number: </h5></Label>
          <Input
          type="number"
          name="phoneNumber"
          onChange={this.handleChange} />
          </FormGroup>
        <FormGroup tag="fieldset">
        <legend><h5>Your Department</h5> </legend>
        <FormGroup check>
          <Label for="department" check>
            <Input type="radio" name="department" onChange={this.radioChange}/>
            CSE
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label for="department" check>
            <Input type="radio" name="department" onChange={this.radioChange} />
            ECE
          </Label>
        </FormGroup>
      </FormGroup>
      <FormGroup>
       <Label for="year"><h5>Year  </h5> </Label>
        <select type="select" name="year" onChange={this.onChanges}>
           <option value="Ist">Ist</option>
           <option value="IInd">IInd</option>
           <option value="IIIrd">IIIrd</option>
           <option value="IVth">IVth</option>
          </select>
        </FormGroup>
        <FormGroup>
          <Label for="name"><h5>Message: </h5></Label>
          <Input
          type="textarea"
          name="message"
          onChange={this.handleChange} />
        </FormGroup>

        <Button>Submit</Button>
       </Form>
      </div>
     );


  }
}

export default Student;
