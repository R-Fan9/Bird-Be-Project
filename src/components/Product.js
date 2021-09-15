import "../utils/constants.js";
import '../css/components/product.css';
import { recipent_modifier, allergy_modifier } from "../utils/constants.js";
import { Component } from "react";
import { Card, Button, Form, Col, Row, Modal } from 'react-bootstrap';
import { TextForm } from "../widgets/forms/TextForm";
import { RadioForm } from "../widgets/forms/RadioForm";
import { CustomModal } from "../widgets/Modal.js";

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

    openDetailModal = () => {
        this.setState({showDetail:true});
    }

    closeDetailModal = () => {
        this.setState({showDetail:false});
    }

    openImgModal = () => {
        this.setState({showImg:true});
    }

    closeImgModal = () => {
        this.setState({showImg:false});
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
        const { inCart, validated, showDetail, showImg } = this.state;
        const {id, name, price, type, sku, meta_description, modifiers} = this.props.product;
        const {url_standard, description} = this.props.product.primary_image;

        const detailContent = <div dangerouslySetInnerHTML={{__html: this.props.product.description}} />;
        const imgContent = <img src={url_standard} alt={description}/>;

        return(
            <Card className="text-center shadow">
                <div className="overflow">
                    <a href = "#" onClick={this.openImgModal.bind(this)}>
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
                
                        <a href = "#" className="link-primary" onClick={this.openDetailModal.bind(this)}>more details</a>
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
                                    {!inCart ? 'Add to cart' : 'Remove from Cart'}
                                </Button>    
                            </Form>

                            <CustomModal 
                                title={name} 
                                content={detailContent} 
                                show={showDetail} 
                                closeCallback = {this.closeDetailModal}
                            />
                            
                            <CustomModal 
                                title={name} 
                                content={imgContent} 
                                show={showImg} 
                                closeCallback = {this.closeImgModal}
                            />
                    </Card.Body>
                </div>
            </Card>

        )
    }
}

