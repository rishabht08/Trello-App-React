import React from "react"
import { connect } from "react-redux"
import { MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow } from "mdbreact";

class Pagination extends React.Component {
    state = {
        data: []
    }

    componentDidMount = () => {

        let arr = []
        for (let i = 1; i <= this.props.data; i++) {
            arr.push(i)

        }

        this.setState({
            data: arr
        })
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.data != this.props.data) {
            let arr = []
            for (let i = 1; i <= Math.floor(nextProps.data/4); i++) {
                arr.push(i)

            }

            if(nextProps.data%4!==0){
                arr.push(Math.floor(nextProps.data/4) + 1)
            }

            this.setState({
                data: arr
            })

        }
    }



    render() {
        return (
            <div>
                <MDBRow>
                    <MDBCol>
          
                        <MDBPagination className="mb-5" color="blue">
                   
                            {this.state.data.length != 0 && this.state.data.map((elem, index) => (
                                <MDBPageItem active={this.props.page == index} style={{cursor:"pointer" , "margin-left":"1rem"}}>
                                    <MDBPageNav onClick={()=>this.props.updatePage(index)}>
                                        {index + 1} 
                                      
                                    </MDBPageNav>
                                </MDBPageItem>
                            ))}


                          
                        </MDBPagination>
                    </MDBCol>
                </MDBRow>

            </div>
        )

    }
}

export default Pagination