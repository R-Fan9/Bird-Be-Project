import { Component } from "react";
import { Button, Form, Col, Row } from 'react-bootstrap';
import { TextForm } from "../stateless/TextForm";
import { RadioForm } from "../stateless/RadioForm";

export class AddForm extends Component{

    constructor(){
        super();
        this.state = {
          validated:false,
        }
    }

    //handles form submission
    handleSubmit = (event) =>{
        event.preventDefault();

        const form = event.target;
        const { inCart } = this.props;

        //if the user removes a product or adds a product with a valid form
        if (inCart || form.checkValidity()) {
            this.props.toggleItem(inCart);
            form.reset(); //rest form
            this.setState({validated:false}); //disable validation on form

        //if the user add a product with invalid form 
        }else{
            this.setState({validated:true}); //enable form validation
        }
    }

    render(){
        const { validated } = this.state;
        const { pid, price, modifiers, inCart } = this.props;

        const recipent_modifier = `{"id":157,"name":"Recipent's name","display_name":"Who it's for","type":"text","required":true,` + 
        `"config":{"default_value":"","text_characters_limited":"true","text_min_length":"1","text_max_length":"18"},` + 
        `"option_values":[]}`;
        
        const allergy_modifier = `{"id":158,"name":"Allergies","display_name":"List any allergies","type":"text","required":false,` + 
        `"config":{"default_value":"","text_characters_limited":"false","text_min_length":"","text_max_length":""},` + 
        `"option_values":[]}`;

        return(
            <Form noValidate validated={validated} onSubmit={this.handleSubmit.bind(this)}>
                <Col className="mb-3">
                    {modifiers.filter(m => m.type === 'text').map(m => (
                        <div key = {`${m.id}_${pid}`}>
                            <TextForm pid = {pid} modifier = {m}/>
                        </div>
                    ))}
                    <TextForm pid = {pid} modifier = {JSON.parse(recipent_modifier)}/>
                    <TextForm pid = {pid} modifier = {JSON.parse(allergy_modifier)}/>
                </Col>
                
                <Row className="mb-3 d-flex justify-content-center">
                    {modifiers.filter(m => m.type === 'radio_buttons').map(m => (
                        <div key = {`${m.id}_${pid}`}>
                            <RadioForm pid = {pid} modifier = {m}/>
                        </div>
                    ))}
                </Row>

                <div className="d-flex justify-content-center">
                    <Button variant={!inCart ? "primary" : "outline-primary"} type="submit">
                        <i className="fa fa-shopping-cart"></i> 
                        {!inCart ? ' Add to cart' : ' Remove from Cart'} - ${price}
                    </Button>   
                </div>
 
            </Form>
        )
    }
}