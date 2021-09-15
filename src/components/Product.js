import { Component } from "react";
import { Card, Button, Form, Col, Row, Modal } from 'react-bootstrap';
import "../css/product.css"

class TextForm extends Component{
    render(){

        const { pid, modifier } = this.props
        const { id, name, display_name, required, config } = modifier
        const { text_characters_limited, text_min_length, text_max_length } = config
    
        return(
            <Form.Group className="mb-3" controlId={`form-${pid}_${id}`}>
                <Form.Label><strong>{name}<span>{required ? "*" : ""}</span></strong></Form.Label>
                <Form.Control 
                        type="text" 
                        name="input"
                        placeholder={`${display_name} ${!required ? "(Optional)" : ""}`}
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
                <Form.Label><strong>{name}</strong></Form.Label>
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
          showModal:false
        }
    }

    openModal = () => {
        this.setState({showModal:true});
    }

    closeModal = () => {
        this.setState({showModal:false});
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
        const { inCart, validated, showModal } = this.state;
        const {id, name, price, type, sku, meta_description, modifiers} = this.props.product;
        const {url_standard, description} = this.props.product.primary_image;

        return(

            <Card className="text-center shadow">
                <div className="overflow">
                    <Card.Img src={url_standard} alt={description} className="card-img-top"/>
                    <Card.Body className="text-dark">
                        <h4 className="card-title">{name} - ${price}</h4>
                        <p className="card-text text-muted">
                            {type} | {sku}
                        </p>
                        <p className="card-text text-secondary">
                            {meta_description}
                        </p>
                
                        <a href = "#" className="link-primary" onClick={this.openModal.bind(this)}>more details</a>
                        <hr/>

                        <Form noValidate validated={validated} onSubmit={this.handleSubmit.bind(this)}>
                                <Col className="mb-3">
                                    {modifiers.filter(m => m.type === 'text').map(m => (
                                        <div key = {`${m.id}_${id}`}>
                                            <TextForm pid = {id} modifier = {m}/>
                                        </div>
                                    ))}
                                </Col>
                                
                                <Row className="mb-3 d-flex justify-content-center">
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
                    </Card.Body>
                </div>

                <Modal show={showModal} onHide={this.closeModal.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{name}</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                            <div dangerouslySetInnerHTML={{__html: this.props.product.description}} />
                        </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal.bind(this)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Card>

        )
    }
}

