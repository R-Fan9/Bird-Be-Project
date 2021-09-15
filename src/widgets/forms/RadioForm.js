import { Component } from "react";
import { Form } from 'react-bootstrap';
import "../../css/widgets/form.css";

export class RadioForm extends Component{

    render(){
        const { pid, modifier } = this.props
        const { name, required, option_values } = modifier
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