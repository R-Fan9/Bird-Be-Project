import { Form } from 'react-bootstrap';
import "../../css/form.css";

export const TextForm = ({ pid, modifier }) => {
    const { id, name, display_name, required, config } = modifier
    const { text_characters_limited, text_min_length, text_max_length } = config

    return(
        <Form.Group className="mb-3" controlId={`form-${pid}_${id}`}>
            <Form.Label className="d-flex justify-content-start"><strong>{display_name}<span className="asterisk">{required ? "*" : ""}</span></strong></Form.Label>
            <Form.Control 
                    type="text" 
                    name="input"
                    placeholder={`${name} ${!required ? "(Optional)" : ""}`}
                    defaultValue={config.default_value}
                    required={required}
                    maxLength={text_characters_limited ? text_max_length : ''}
                    minLength={text_characters_limited ? text_min_length : ''}
            />
            <Form.Control.Feedback type="invalid">{`Please provide a valid ${name}`}</Form.Control.Feedback>
        </Form.Group>
    )
}