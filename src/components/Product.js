import { Component } from "react";
import { Card, Button, Form, Col, Row } from 'react-bootstrap';

class TextForm extends Component{
    render(){

        const { pid, modifier } = this.props
        const { id, name, display_name, required, config } = modifier
        const { text_characters_limited, text_min_length, text_max_length } = config
    
        return(
            <Form.Group className="mb-3" controlId={`form-${pid}_${id}`}>
                <Form.Label>{name}<span>{required ? "*" : ""}</span></Form.Label>
                <Form.Control 
                        type="text" 
                        name="input"
                        placeholder={display_name}
                        defaultValue={config.default_value}
                        required={required}
                        maxLength={text_characters_limited ? text_max_length : ''}
                        minLength={text_characters_limited ? text_min_length : ''}
                />
                <Form.Control.Feedback type="invalid">{`Please provide a valid ${name}`}</Form.Control.Feedback>
            </Form.Group>
        )
    }
}

class RadioForm extends Component{

    render(){
        const { pid, modifier } = this.props
        const { name, required, display_name, option_values } = modifier
        return(
            <Form.Group>
                <Form.Label>{name}</Form.Label>
                <div key={`inline-radio-${pid}`} className="mb-3">
                    {option_values.map((op_val) => (
                        <Form.Check
                            inline
                            defaultChecked={op_val.is_default}
                            label={op_val.label}
                            type="radio"
                            id={`inline-radio-${op_val.id}_${pid}`}
                            key={`${op_val.id}_${pid}`}
                            name="radio-form"
                            required={required}
                        />
                    ))}
                </div>
            </Form.Group>
        )
    }
}


export class Product extends Component{

    constructor(){
        super();
        this.state = {
          inCart:false,
          validated:false,
        }
    }

    toggleItem = (inCart) => {
        this.props.handleItem(this.props.product.price, !inCart);
        this.setState({inCart:!inCart});
    }

    handleSubmit = (event) =>{
        event.preventDefault();

        const form = event.target;
        let inCart = this.state.inCart;

        if (inCart || form.checkValidity()) {
            this.toggleItem(inCart);
            form.reset();
            this.setState({validated:false});
        }else{
            this.setState({validated:true});
        }
    }

    render(){
        const { inCart, validated } = this.state;
        const {id, name, price, description, meta_description, modifiers} = this.props.product;
        const {url_standard} = this.props.product.primary_image;

        return(
        <Card className = "mb-3" style={{ color : "#000"}}>
            <Card.Img src = {url_standard}/>
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>${price}</Card.Text>

              <Form noValidate validated={validated} onSubmit={this.handleSubmit.bind(this)}>
                  <Col className="mb-3">
                    {modifiers.filter(m => m.type === 'text').map(m => (
                        <div key = {`${m.id}_${id}`}>
                            <TextForm pid = {id} modifier = {m}/>
                        </div>
                    ))}
                  </Col>
                  
                  <Row className="mb-3">
                    {modifiers.filter(m => m.type === 'radio_buttons').map(m => (
                        <div key = {`${m.id}_${id}`}>
                            <RadioForm pid = {id} modifier = {m}/>
                        </div>
                    ))}
                  </Row>

                <Button variant={!inCart ? "primary" : "outline-primary"} type="submit">
                    {!inCart ? 'Add to cart' : 'Remove from Cart'}
                </Button>    
              </Form>

              {/* <div dangerouslySetInnerHTML={{__html: this.props.product.description}} /> */}
              
            </Card.Body>  

          </Card>

        )
    }
}

