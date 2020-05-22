import axios from "axios";


export const getAllCategories = async (page) => {
    return axios.get(`http://localhost:6060/getcategories/?pageSize=4&page=${page}`).then(res => {
        return res;

    })

}

export const createCategory = async (data)=>{
    return axios.post(`http://localhost:6060/createcategory` , data).then(res => {
        return res;
    })
}

export const createTask = async (data)=>{
    return axios.post(`http://localhost:6060/createtask` , data).then(res => {
        return res;
    })
}

export const updateTaskPosition = async (id,position) =>{
    return axios.put(`http://localhost:6060/task/updateposition/${id}` , {position}).then(res=>{
        return res;
    })
}

export const updateTask = (id,data) =>{
    return axios.put(`http://localhost:6060/updatetask/${id}` , data).then(res=>{
        return res;
    })
}

export const deleteTask = (id) => {
    return axios.delete(`http://localhost:6060/deletetask/${id}`).then(res=>{
        return res;
    })
}

export const updateCategory = (id , data) => {
    return axios.put(`http://localhost:6060/updatecategory/${id}` , data).then(res=>{
        return res;
    })
}

export const deleteCategory = (id) => {
    return axios.delete(`http://localhost:6060/deletecategory/${id}`).then(res=>{
        return res;
    })
}

export const searchTasks = (query) =>{
    return axios.post(`http://localhost:6060/findfromquery` , query).then(res=>{
        return res;
    })
}

export const updateCategoryPosition = (id,position) =>{

    return axios.put(`http://localhost:6060/category/updateposition/${id}` , {position}).then(res=>{
        return res;
    })

}





