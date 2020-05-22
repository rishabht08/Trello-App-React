import React from "react"
import { connect } from "react-redux"
import * as actionGenerator from "../store/actions/actionCreator"
import { Modal, Button } from "react-bootstrap"
import swal from 'sweetalert'
import UpdateCategotyModal from "./updateCategoryModal"




class TaskList extends React.Component {

    state = {
        taskShow: false,
        taskName: "",
        id: null,
        status: "Incomplete",
        categoryShow:false,
        taskUpdateId:null,
        taskUpdateName:null,
        taskUpdateStatus:null
    }




    shiftUp = (id, index, type) => {
        if (type == "up") {
            let prePosition = index != 0 ? this.props.data[index - 1].position : this.props.data[index].position
            this.props.updateTaskPosition(id, prePosition - 1).then(res => {
                this.props.refresh()

            })
        }

        else if (type == "down") {
            let prePosition = this.props.data[index + 1].position
            this.props.updateTaskPosition(id, prePosition + 1).then(res => {
                this.props.refresh()

            })

        }
    }
    onStatusChange(e) {
        this.props.dispatch({
            type: "statusChange",
            payLoad: e.target.value
        })
    }

    onTaskSave() {


        if (this.props.state.taskName != "" && this.props.state.id) {
            console.log("sent data", this.props.state.taskName, this.props.state.status)
            const data = {
                name: this.props.state.taskName,
                status: this.props.state.status
            }

            this.props.updateTask(this.props.state.id, data).then(res => {

                this.props.dispatch({
                    type: "savingTask",
                    payLoad: {
                        id: null,
                        taskShow: false,
                        taskName: ""
                    }

                })
                this.props.refresh()
            })

        }

    }
    editTask(index) {
        const id = this.props.data[index].id
        this.props.dispatch({
            type: "savingTask",
            payLoad: {
                id: id,
                taskShow: true,
                taskName: this.props.data[index].name
            }

        })
    }


    onTaskHide() {
        this.props.dispatch({
            type: "savingTask",
            payLoad: {
                id: null,
                taskShow: false,
                taskName: ""
            }

        })

    }

    onTaskChange(e) {
        let id = this.props.state.id
        let taskShow = this.props.state.taskShow
        this.props.dispatch({
            type: "savingTask",
            payLoad: {
                id: id,
                taskShow: taskShow,
                taskName: e.target.value
            }

        })
    }

    onDelete = (id) => {



        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this task!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    this.props.deleteTask(id).then(res => {

                        swal("Poof! Your task has been deleted!", {
                            icon: "success",
                        }).then(res => {
                            this.props.refresh()
                        })

                    })

                }
            });
    }

    onCategoryChange = (id , name , status) =>{
        this.setState({
            categoryShow:true,
            taskUpdateId:id,
            taskUpdateName:name,
            taskUpdateStatus:status

            
        })
    }

    onCategoryHide(){
        this.setState({
            categoryShow:false
          
        })
    }

    updateCategory = (categoryId) =>{

        this.props.deleteTask(this.state.taskUpdateId).then(res=>{
            console.log("ghfgfhgfgh", categoryId)
            let data = {
                name:this.state.taskUpdateName,
                "category_id":categoryId,
                status:this.state.taskUpdateStatus

            }
            this.props.createTask(data).then(res=>{
                this.setState({
                    categoryShow:false,
                    taskUpdateName:null,
                    taskUpdateId:null,
                    taskUpdateStatus:null
                })
                this.props.refresh();
        

            })
            
        })
       
    }




    render() {
        return (

            <div className="task-list">
                   <UpdateCategotyModal show={this.state.categoryShow} onHide = {()=>this.onCategoryHide()} categories={this.props.state.categories} 
                   category={this.props.state.categories[this.props.categoryIndex].name}
                   onTaskSave = {(categoryId)=>this.updateCategory(categoryId)}/>

                <Modal
                    show={this.props.state.taskShow}
                    onHide={() => this.onTaskHide()}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Update Task

                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>


                            <div class="form-group row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Update Task</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="inputPassword" placeholder="Change Task" value={this.props.state.taskName} onChange={(e) => this.onTaskChange(e)} />
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="exampleFormControlSelect1">Select Status</label>
                                <select class="form-control" id="exampleFormControlSelect1" onChange={(e) => this.onStatusChange(e)}>
                                    <option>Incomplete</option>
                                    <option>Complete</option>
                                    <option>Pending</option>
                                    <option>Closed</option>

                                </select>
                            </div>


                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.onTaskSave()}>Update Task</Button>
                    </Modal.Footer>
                </Modal>

                {this.props.data.length != 0 ? this.props.data.map((item, index) => (
                    <div className="taskWrapper">
                        <div className={item.status == "Complete" ? "tasks-g" : "tasks"}>
                            <div className="taskName">
                                <p><b>{item.name}</b></p>
                            </div>
                            <div className="taskStatus">
                                <p>{item.status}</p>
                            </div>
                            <div className="tools">

                                <span onClick={() => this.shiftUp(item.id, index, "up")}><i class="fas fa-chevron-up"></i></span>

                                <span onClick={() => this.editTask(index)}><i class="fas fa-edit"></i></span>
                                <span onClick={() => this.onDelete(item.id)}><i class="fas fa-trash-alt"></i></span>

                                <span onClick={() => this.shiftUp(item.id, index, "down")}><i class="fas fa-chevron-down"></i></span>
                            </div>
                        </div>
                        <div className="changeCategory" onClick={()=>this.onCategoryChange(item.id , item.name , item.status)}>Change Category</div>
                    </div>

                )) : <div>

                        <span>Add Task To see them here !!!</span>

                    </div>
                }



            </div>
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

        updateTaskPosition: (id, position) => dispatch(actionGenerator.updateTaskPosition(id, position)),
        updateTask: (id, data) => dispatch(actionGenerator.updateTask(id, data)),
        deleteTask: (id) => dispatch(actionGenerator.deleteTask(id)),
        createTask: (data) => dispatch(actionGenerator.createTask(data)),
        dispatch

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);