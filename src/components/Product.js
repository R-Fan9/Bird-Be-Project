import "../utils/constants.js";
import '../css/components/product.css';
import { DESCR, IMG, recipent_modifier, allergy_modifier } from "../utils/constants.js";
import { Component } from "react";
import { Card, Button, Form, Col, Row } from 'react-bootstrap';
import { TextForm } from "../widgets/forms/TextForm";
import { RadioForm } from "../widgets/forms/RadioForm";
import { CustomModal } from "../widgets/CustomModal.js";

export class Product extends Component{

    constructor(){
        super();
        this.state = {
          inCart:false,
          validated:false,
          showDetail:false,
          showImg:false,
        }
    }

    //opens modal to display content
    openModal = (contentType) =>{
        switch(contentType){
            case "DESCR": //description content
                this.setState({showDetail: true});
                break;
            case "IMG": //image content
                this.setState({showImg: true});
                break;
            default:
                console.log("content type does not exist");
        }
    }

    //closes modal
    closeModal = (contentType) =>{
        switch(contentType){
            case "DESCR":
                this.setState({showDetail: false});
                break;
            case "IMG":
                this.setState({showImg: false});
                break;
            default:
                console.log("content type does not exist");
        }
    }

    //toggles the inCart state and updates total price based on the user action
    toggleItem = (inCart) => {
        this.setState({inCart:!inCart});

        //fires the parent callback to update total price
        this.props.handleItem(this.props.product.price, !inCart); 
    }

    //handles form submission
    handleSubmit = (event) =>{
        event.preventDefault();

        const form = event.target;
        const { inCart } = this.state;

        //if the user removed a product or add or product with a valid form
        if (inCart || form.checkValidity()) {
            this.toggleItem(inCart);
            form.reset(); //rest form
            this.setState({validated:false}); //disable validation on form

        //if the user add product with invalid form 
        }else{
            this.setState({validated:true}); //enable form validate
        }
    }

    render(){
        const { inCart, validated, showDetail, showImg } = this.state;
        const {id, name, price, type, sku, meta_description, modifiers} = this.props.product;
        const {url_standard, description} = this.props.product.primary_image;

        const detailContent = <div dangerouslySetInnerHTML={{__html: this.props.product.description}} />;
        const imgContent = <img src={url_standard} alt={description}/>;

        return(
            <Card className="text-center shadow">
                <div className="overflow">
                    <a href = "#" onClick={this.openModal.bind(this, IMG)}>
                        <Card.Img src={url_standard} alt={description} className="card-img-top"/>
                    </a>
                    <Card.Body className="text-dark">
                        <h4 className="card-title">{name} - ${price}</h4>
                        <p className="card-text text-muted">
                            {type} | {sku}
                        </p>
                        <p className="card-text text-secondary">
                            {meta_description}
                        </p>
                
                        <a href = "#" className="link-primary" onClick={this.openModal.bind(this, DESCR)}>
                            more details
                        </a>
                        <hr/>

                        <Form noValidate validated={validated} onSubmit={this.handleSubmit.bind(this)}>
                                <Col className="mb-3">
                                    {modifiers.filter(m => m.type === 'text').map(m => (
                                        <div key = {`${m.id}_${id}`}>
                                            <TextForm pid = {id} modifier = {m}/>
                                        </div>
                                    ))}
                                    <TextForm pid = {id} modifier = {JSON.parse(recipent_modifier)}/>
                                    <TextForm pid = {id} modifier = {JSON.parse(allergy_modifier)}/>
                                </Col>
                                
                                <Row className="mb-3 d-flex justify-content-center">
                                    {modifiers.filter(m => m.type === 'radio_buttons').map(m => (
                                        <div key = {`${m.id}_${id}`}>
                                            <RadioForm pid = {id} modifier = {m}/>
                                        </div>
                                    ))}
                                </Row>

                                <Button variant={!inCart ? "primary" : "outline-primary"} type="submit">
                                    <i className="fa fa-shopping-cart"></i> {!inCart ? 'Add to cart' : 'Remove from Cart'} - ${price}
                                </Button>    
                            </Form>

                            <CustomModal 
                                title={name} 
                                content={detailContent} 
                                show={showDetail} 
                                closeCallBack = {this.closeModal}
                                type = {DESCR}
                            />
                            
                            <CustomModal 
                                title={name} 
                                content={imgContent} 
                                show={showImg} 
                                closeCallBack = {this.closeModal}
                                type = {IMG}
                            />
                    </Card.Body>
                </div>
            </Card>
        )
    }
}

