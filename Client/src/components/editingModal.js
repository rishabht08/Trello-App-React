import React from "react"
import { Modal, Button } from "react-bootstrap"
import { connect } from "react-redux"


class EditingModal extends React.Component {

        onChangeCategory = (e) => {
            this.props.dispatch({
                type: "updateCategory",
                payLoad: e.target.value
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
                            Update Category

                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>


                            <div class="form-group row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Category Name</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="inputPassword" placeholder="Category Name" onChange={(e) => this.onChangeCategory(e)} value={this.props.state.categoryEdit} />
                                </div>
                            </div>


                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.props.updateCategory()}>Update Category</Button>
                    </Modal.Footer>
                </Modal>
            )
        }
    }

const mapStateToProps = (state, ownProps) => {
    // console.log("props" , ownProps.match.params.id)



    return {
        state: state.reducer

    }
}
const mapDispatchToProps = dispatch => {
    return {


        dispatch

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(EditingModal);