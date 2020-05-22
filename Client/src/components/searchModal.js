import React from "react"
import { Modal, Button } from "react-bootstrap"
import { connect } from "react-redux"


class SearchModal extends React.Component {


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
                        Search results

                        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.data.length != 0 ? this.props.data.map(item => (

                        <div className="modalCard">
                            <div className="taskNameM">
                                <p>{item.name}</p>
                            </div>
                            <div className="taskStatusM">
                                <p>{item.status}</p>
                            </div>
                            <div className="taskCategoryM">
                                <p>{item.category ? item.category.name : "Not Assigned"}</p>
                            </div>
                        </div>)) :

                        <div style={{"textAlign":"center"}}>
                            <h2>No Results Found</h2>
                        </div>



                    }



                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}



export default SearchModal;