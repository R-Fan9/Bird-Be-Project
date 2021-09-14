import { Component } from "react";
import { Card, Button, Form } from 'react-bootstrap';
// import { TextForm } from "../forms/TextForm";
// import { RadioForm } from "../forms/RadioForm";

class TextForm extends Component{

    render(){
        const {required, config} = this.props
        const {
            default_value, 
            text_characters_limited,
            text_min_length,
            text_max_length
        } = config

        return(
            <Form></Form>
        )
    }
}

class RadioForm extends Component{

    render(){
        const {pid, required, option_values} = this.props
        return(
            <Form>
                <div key="inline-radio" className="mb-3">
                {option_values.map((op_val) => (
                    
                    <Form.Check
                        inline
                        defaultChecked={op_val.is_default}
                        label={op_val.label}
                        type="radio"
                        id={`inline-radio-${op_val.id+pid}`}
                        key={op_val.id+pid}
                    />
                    
                ))}
                </div>
                
            </Form>
        )
    }
}


export class Product extends Component{

    constructor(){
        super();
        this.state = {
          inCart:false
        }
    }

    toggleCart = (price, inCart) => {
        this.props.handler(price, !this.state.inCart);
        this.setState({inCart: !inCart});
    }

    render(){
        const { inCart } = this.state;
        const {id, name, price, description, meta_description, modifiers} = this.props.product;
        const {url_standard} = this.props.product.primary_image;

        return(
        <Card className = "mb-3" style={{ color : "#000"}}>
            <Card.Img src = {url_standard}/>
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>${price}</Card.Text>

              {modifiers.map(m => (
                  <div key = {m.id+id}>
                      {m.type === 'text' ? 
                      <TextForm pid = {id} required = {m.required} config = {m.config} /> : 
                      <RadioForm pid = {id} required = {m.required} option_values = {m.option_values}/>}
                  </div>
              ))}

              {/* <div dangerouslySetInnerHTML={{__html: this.props.product.description}} /> */}
              
              <Button variant={!inCart ? "primary" : "outline-primary"} onClick={this.toggleCart.bind(this, price, inCart)}>
                      {!inCart ? 'Add to cart' : 'Remove from Cart'}
                </Button>
            </Card.Body>  

          </Card>

        )
    }
}

