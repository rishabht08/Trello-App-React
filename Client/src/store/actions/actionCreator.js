import * as Api from "../../api/api"



const formatData = (type, data) => {
    return {
        type,
        payLoad: data
    }
}



export const getAllCategories = (page) =>{
    return dispatch => {
        return Api.getAllCategories(page).then(res=>{
            dispatch(formatData("addCategories" , res.data))
            return res.data;
        })
    }
}


export const createCategory = (data) =>{
    return dispatch => {
        return Api.createCategory(data).then(res=>{
          
            return res;
        })
    }
}

export const createTask = (data) =>{
    return dispatch => {
        return Api.createTask(data).then(res=>{
          
            return res;
        })
    }
}

export const updateTaskPosition = (id,position) =>{
    return dispatch => {
        return Api.updateTaskPosition(id,position).then(res=>{
            return res;
        })
    }
}

export const updateTask = (id,data)=>{
    return dispatch =>{
        return Api.updateTask(id,data).then(res=>{
            return res
        })
    }
}

export const deleteTask = (id)=>{
    return dispatch =>{
        return Api.deleteTask(id).then(res=>{
            return res
        })
    }
}

export const updateCategory = (id , data) => {
    return dispatch =>{
        return Api.updateCategory(id , data).then(res=>{
            return res;

        } )
    }
}

export const deleteCategory = (id) => {
    return dispatch => {
        return Api.deleteCategory(id).then(res=>{
            return res
        })
    }
}

export const searchTasks = (query) =>{
    return dispatch =>{
        return Api.searchTasks(query).then(res=>{
            return res;
        })
    }
}

export const updateCategoryPosition = (id,position) =>{
    return dispatch =>{
        return Api.updateCategoryPosition(id,position).then(res=>{
            return res
        })
    }
}



