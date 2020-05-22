import initialState from "../state"


export function reducer(state = initialState, action) {

    let stateCopy = { ...state }
    switch (action.type) {

        case "addCategories":
            stateCopy.categories = action.payLoad.data;
            stateCopy.totalCategories = action.payLoad.count
            return stateCopy

        case "savingTask":
            stateCopy.taskShow = action.payLoad.taskShow;
            stateCopy.taskName = action.payLoad.taskName;
          
                stateCopy.id = action.payLoad.id
 
            return stateCopy;

        case "statusChange":
            stateCopy.status = action.payLoad    
            return stateCopy

        case "updateCategory":
            stateCopy.categoryEdit = action.payLoad;
            return stateCopy;
        case "addCategoryField"  :
            stateCopy.categoryEdit = action.payLoad.categoryEdit;
            stateCopy.id = action.payLoad.id     
            return stateCopy 


        default:
            return stateCopy;
    }
}