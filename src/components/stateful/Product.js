import "../../utils/constants.js";
import '../../css/product.css';
import { FORM, DESCR, IMG } from "../../utils/constants.js";
import { Component } from "react";
import { Card, Button } from 'react-bootstrap';
import { CustomModal } from "../stateless/CustomModal.js";
import { AddForm } from "./AddForm.js";

export class Product extends Component{

    constructor(){
        super();
        this.state = {
          inCart:false,
          showForm:false,
          showDetail:false,
          showImg:false,
        }
    }

    //opens modal to display content
    openModal = (contentType) =>{
        switch(contentType){
            case "FORM": //form content
                this.setState({showForm:true});
                break;
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
            case "FORM":
                this.setState({showForm:false});
                break;
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

    render(){
        const { inCart, showForm, showDetail, showImg } = this.state;
        const {id, name, price, type, sku, meta_description, modifiers} = this.props.product;
        const {url_standard, description} = this.props.product.primary_image;

        const detailContent = <div dangerouslySetInnerHTML={{__html: this.props.product.description}} />;
        const imgContent = <img src={url_standard} alt={description}/>;

        return(
            <Card className="text-center shadow overflow">
                <Card.Img src={url_standard} alt={description} onClick={this.openModal.bind(this, IMG)}/>
                <Card.Body className="text-dark">
                    <h4 className="card-title">{name} - ${price}</h4>
                    <p className="card-text text-muted">{type} | {sku}</p>
                    <p className="card-text text-secondary">{meta_description}</p>
            
                    <a href = "#!" className="link-primary" onClick={this.openModal.bind(this, DESCR)}>more details</a>
                    <hr/>

                    <Button variant="outline-light" onClick={
                        !inCart ? this.openModal.bind(this, FORM) : this.toggleItem.bind(this, inCart)}>
                            {!inCart ? <i className="fa text-dark">&#xf067;</i> : <i className="fa text-dark">&#xf068;</i>} 
                    </Button>

                    <CustomModal 
                            title={name} 
                            content={
                            <AddForm 
                                pid = {id} 
                                price = {price} 
                                modifiers = {modifiers} 
                                inCart = {inCart}
                                toggleItem={this.toggleItem}/>
                            } 
                            show={showForm} 
                            closeCallBack = {this.closeModal}
                            type = {FORM}
                        />

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
                            align = {"d-flex justify-content-center"}
                        />
                </Card.Body>
            </Card>
        )
    }
}

