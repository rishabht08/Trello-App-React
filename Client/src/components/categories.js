import React from "react"
import { connect } from "react-redux"
import { MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow } from "mdbreact";
import Pagination from "./pagination"
import "../styles/categories.css"
import TaskList from "./taskList"
import * as actionGenerator from "../store/actions/actionCreator"
import { Modal, Button } from "react-bootstrap"
import EditingModal from "./editingModal"
import swal from 'sweetalert'
import SearchModal from "./searchModal"


class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            page: 0,
            category: null,
            taskStatus: "Incomplete",
            categoryId: null,
            taskName: "",
            categoryShow:false,
            query:"",
            searchShow:false,
            searchedResults:[]
        }
    }

    componentDidMount = () => {

        this.loadCatgoriesByPage(this.state.page)

    }



    loadCatgoriesByPage = (page) => {
        this.props.getCategories(page).then(res=>{
            console.log("akdda" )

        })

    }

    addTask = (index) => {
        this.setState({
            taskShow: true,
            category: this.props.state.categories[index].name,
            categoryId: this.props.state.categories[index].id,
            type: "task"
        })

    }

    onTaskHide() {
        this.setState({
            taskShow: false,

        })

    }

    onStatusChenge(e) {
        this.setState({
            taskStatus: e.target.value
        })
    }

    onTaskSave() {
        if(this.state.type=="task"){
        if (this.state.taskName != "" && this.state.categoryId) {
            const data = {
                "category_id": this.state.categoryId,
                name: this.state.taskName,
                status: this.state.taskStatus
            }

            this.props.createTask(data).then(res => {
                this.loadCatgoriesByPage(this.state.page)
                this.setState({
                    taskShow: false,
                    taskName: "",
                    categoryId: null,
                    category: null,
                    type:null
                })
            })

        }
    }

    else if(this.state.type="category"){
        if (this.state.taskName != ""){
            const data = {
              
                name: this.state.taskName,
              
            }

            this.props.createCategory(data).then(res => {
                this.loadCatgoriesByPage(this.state.page)
                this.setState({
                    taskShow: false,
                    taskName: "",
                    categoryId: null,
                    category: null,
                    type:null
                })
            })

        }
    }
    }

    onAddCategory = () => {
        this.setState({
            taskShow: true,
            type: "category"
        })
    }

    onEditCategory(id , name){
        this.props.dispatch({
            type:"addCategoryField",
            payLoad:{
                id:id,
                categoryEdit:name
            }
        })
        this.setState({
            categoryShow:true
        })
    }

    onCategoryHide(){
        this.setState({
            categoryShow:false,
            searchShow:false
        })
    }

    updateCategory = ()=>{
        if(this.props.state.categoryEdit!="" && this.props.state.id){
            this.props.updateCategory(this.props.state.id , {name:this.props.state.categoryEdit}).then(res=>{
                this.props.dispatch({
                    type:"addCategoryField",
                    payLoad:{
                        id:null,
                        categoryEdit:""
                    }
                })
                this.setState({
                    categoryShow:false
                })

                this.loadCatgoriesByPage(this.state.page)

            })
        }
    }

    onCategoryDelete = (id) =>{
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Category!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {

                this.props.deleteCategory(id).then(res=>{

                    swal("Poof! Your Category has been deleted!", {
                        icon: "success",
                      }).then(res=>{
                        this.loadCatgoriesByPage(this.state.page)
                    })

                      })
                
            } 
          });
    }

    updatePage = (page)=>{
        this.setState({
            page:page
        } , ()=>{
            this.loadCatgoriesByPage(page)
        })

     
    }

    onSearchTask = (e) =>{
        this.setState({
            query:e.target.value
        })

    }

    onClickSearch = () =>{
        if(this.state.query!=""){
            let query = {
                query:this.state.query
            }

            this.props.searchTasks(query).then(res=>{
                console.log("searched" , res.data.data)
                this.setState({
                    searchedResults:res.data.data,
                    searchShow:true
                   
                })
            })


        }
    }

    shiftCard(id, index , type){
        if(type=="left"){
            let prePosition = index!=0 ? this.props.state.categories[index-1].position : this.props.state.categories[index].position
            this.props.updateCategoryPosition(id, prePosition - 1).then(res => {
                this.loadCatgoriesByPage(this.state.page)

            })
        }

        else if (type == "right") {
            let prePosition = this.props.state.categories[index+1].position 
            this.props.updateCategoryPosition(id, prePosition + 1).then(res => {
                this.loadCatgoriesByPage(this.state.page)

            })

        }
    }
    




    render() {
        return (
            <div className="mainBody">

                <EditingModal show={this.state.categoryShow} onHide={()=>this.onCategoryHide()} updateCategory = {()=>this.updateCategory()}/>
                <SearchModal show={this.state.searchShow} onHide = {()=>this.onCategoryHide()} data={this.state.searchedResults}/>
             
                <Modal
                    show={this.state.taskShow}
                    onHide={() => this.onTaskHide()}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {this.state.type == "task" ? "Add Task" : "Add Category"}

                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            {this.state.type != "category" &&
                                <div class="form-group row">
                                    <label for="staticEmail" class="col-sm-2 col-form-label">Category</label>
                                    <div class="col-sm-10">
                                        <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={this.state.category} />
                                    </div>
                                </div>}
                            <div class="form-group row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">{this.state.type} Name</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="inputPassword" placeholder={this.state.type + " Name"} onChange={(e) => this.setState({ taskName: e.target.value })} />
                                </div>
                            </div>
                            {this.state.type == "task" &&
                                <div class="form-group">
                                    <label for="exampleFormControlSelect1">Select Status</label>
                                    <select class="form-control" id="exampleFormControlSelect1" onChange={(e) => this.onStatusChenge(e)}>
                                        <option>Incomplete</option>
                                        <option>Complete</option>
                                        <option>Pending</option>
                                        <option>Closed</option>

                                    </select>
                                </div>}


                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.onTaskSave()}>Save Task</Button>
                    </Modal.Footer>
                </Modal>

                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Search Task" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={(e)=>this.onSearchTask(e)} />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={()=>this.onClickSearch()}>Search</button>
                    </div>
                </div>

                <button className="btn btn-warning" type="button" onClick={() => this.onAddCategory()}>Add Category</button>
                <br></br>

                <div className="categoryList">
                    {this.props.state.categories.length != 0 && this.props.state.categories.map((item, index) => (
                        <div className="categoryArea">
                            <div className="categoryEdit">
                                <div className="pContainer">
                                    <p><b>{item.name}</b></p>
                                </div>

                                <div className="category-tools">
                                    {index != 0 &&
                                        <span onClick={()=>this.shiftCard(item.id , index , "left")}><i class="fas fa-chevron-left"></i></span>}
                                    <span onClick={() => this.addTask(index)}><i class="fas fa-plus-square"></i></span>
                                    <span onClick={()=>this.onEditCategory(item.id , item.name)}><i class="fas fa-edit"></i></span>
                                    <span onClick={()=>this.onCategoryDelete(item.id)}><i class="fas fa-trash-alt"></i></span>
                                    {index != 3 &&
                                        <span onClick={()=>this.shiftCard(item.id , index , "right")}><i class="fas fa-chevron-right"></i></span>}
                                </div>
                            </div>
                            <TaskList data={item.tasks} refresh = {()=>this.loadCatgoriesByPage(this.state.page)} categoryIndex={index}/>

                        </div>

                    ))}




                </div>
                <div className="pagn">
                    <Pagination data={this.props.state.totalCategories != 0 && this.props.state.totalCategories} page={this.state.page} updatePage={(page)=>this.updatePage(page)}/>
                </div>


            </div>
        )

    }
}

const mapStateToProps = (state, ownProps) => {
    // console.log("props" , ownProps.match.params.id)

    console.log(state)

    return {
        state: state.reducer

    }
}
const mapDispatchToProps = dispatch => {
    return {
        getCategories: (page) => dispatch(actionGenerator.getAllCategories(page)),
        createTask: (data) => dispatch(actionGenerator.createTask(data)),
        createCategory: (data) => dispatch(actionGenerator.createCategory(data)),
        updateCategory: (id , data) => dispatch(actionGenerator.updateCategory(id , data)),
        deleteCategory:(id) => dispatch(actionGenerator.deleteCategory(id)),
        searchTasks : (query) => dispatch(actionGenerator.searchTasks(query)),
        updateCategoryPosition : (id , position) => dispatch(actionGenerator.updateCategoryPosition(id,position)),
        dispatch

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);