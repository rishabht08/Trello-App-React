import React from "react"
import { Modal, Button } from "react-bootstrap"
import { connect } from "react-redux"


class UpdateCategoryModal extends React.Component {

    state={
        categoryIdM:null,
        category:this.props.category
    }

    onChange = (e)=>{
        let id = null;
        for(let i=0 ; i<this.props.categories.length ; i++){
            if(e.target.value==this.props.categories[i].name){
                console.log("found ID" , this.props.categories[i].id )
                id = this.props.categories[i].id
                break;
            }
        }
        this.setState({
            categoryIdM:id,
            category:e.target.value
        })
    }
    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Change Task Category

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>

                        <div class="form-group row">
                            <label for="staticEmail" class="col-sm-2 col-form-label">Category</label>
                            <div class="col-sm-10">
                                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={this.props.category} />
                            </div>
                        </div>


                        <div class="form-group">
                            <label for="exampleFormControlSelect1">Select Category</label>
                            <select class="form-control" id="exampleFormControlSelect1" onChange={(e) => this.onChange(e)} value={this.state.category}>
                                {this.props.categories.map(item => (

                                    <option>{item.name}</option>


                                ))}



                            </select>
                        </div>


                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.props.onTaskSave(this.state.categoryIdM)}>Save Task</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}



export default UpdateCategoryModal;