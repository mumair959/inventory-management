import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom/client';
import axios from "axios";
import Swal from 'sweetalert2';
import { Oval } from "react-loader-spinner";

function Recipe() {
    const [recipes, setRecipes] = useState([])
    const [itemsList, setItemsList] = useState([])
    const [usersList, setUsersList] = useState([])
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [itemId, setItemId] = useState('')
    const [userId, setUserId] = useState('')
    const [method, setMethod] = useState('')
    const [next, setNext] = useState(null)
    const [prev, setPrev] = useState(null)
    const [errors,setErrors] = useState({})
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        getRecipesData() 
        getItemsList()
        getUsersList()
    },[])

    const getItemsList = async (id = null) => {
        let req_url = '/get-items-list';

        if(id != null){
            req_url = req_url+'?id='+id;
        }

        await axios.get(req_url).then(({data})=>{
            setItemsList(data.items)
        })
    }

    const getUsersList = async (id = null) => {
        let req_url = '/get-users-list';

        await axios.get(req_url).then(({data})=>{
            setUsersList(data.users)
        })
    }

    const getRecipesData = async (url = null) => {
        let req_url = '/get-all-recipes';

        if(url != null){
            let url_string = new URL(url);
            req_url = req_url+'?page='+url_string.searchParams.get("page");
        }

        await axios.get(req_url).then(({data})=>{
            setRecipes(data.recipes.data)
            setNext(data.recipes.next_page_url)
            setPrev(data.recipes.prev_page_url)
        })
    }

    const createRecipe = async (e) => {
        e.preventDefault();
        setLoading(true)
    
        const formData = new FormData()
        formData.append('title', title)
        formData.append('item_id', itemId)
        formData.append('user_id', userId)
        formData.append('method', method)

        await axios.post(`/create-recipe`, formData).then(({data})=>{
            setRecipes(data.recipes.data)
            setTitle('')
            setItemId('')
            setUserId('')
            setMethod('')
            document.getElementById('close').click()
            Swal.fire({
                icon:"success",
                text:data.msg
            })
        }).catch(({response})=>{
            if(response.status===422){
                setErrors(response.data.errors)
            }else{
                Swal.fire({
                text:response.data.msg,
                icon:"error"
                })
            }
        }).finally(() => setLoading(false))
    }

    const updateRecipe = async (e) => {
        e.preventDefault();
        setLoading(true)
    
        const formData = new FormData()
        formData.append('id', id)
        formData.append('title', title)
        formData.append('user_id', userId)
        formData.append('item_id', itemId)
        formData.append('method', method)
    
        await axios.post(`/update-recipe`, formData).then(({data})=>{
            setRecipes(data.recipes.data)
            setId('')
            setTitle('')
            setUserId('')
            setItemId('')
            setMethod('')
            
            document.getElementById('close-update').click()
            Swal.fire({
                icon:"success",
                text:data.msg
            })
        }).catch(({response})=>{
            if(response.status===422){
                setErrors(response.data.errors)
            }else{
                Swal.fire({
                text:response.data.msg,
                icon:"error"
                })
            }
        }).finally(() => setLoading(false))
    }

    const deleteRecipe = async (id) => {  
        setLoading(true)  
        const formData = new FormData()
        formData.append('id', id)
    
        await axios.post(`/delete-recipe`, formData).then(({data})=>{
            setRecipes(data.recipes.data)
            Swal.fire({
                icon:"success",
                text:data.msg
            })
        }).catch(({response})=>{
            if(response.status===422){
                setErrors(response.data.errors)
            }else{
                Swal.fire({
                text:response.data.msg,
                icon:"error"
                })
            }
        }).finally(() => setLoading(false))
    }

    const showAlertConfirm = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteRecipe(id);
            }
        })
    }

    const editRecipe = (v) => {
        setId(v.id)
        setTitle(v.title)
        setUserId(v.user_id)
        setItemId(v.item_id)
        setMethod(v.method)
    }

    const resetState = (v) => {
        setId('')
        setTitle('')
        setItemId('')
        setUserId('')
        setMethod('')
    }

    return (
        <>
            <Oval
                height={80}
                width={80}
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass="loader-spinner"
                visible={loading}
                ariaLabel='oval-loading'
                secondaryColor="#4fa94d"
                strokeWidth={2}
                strokeWidthSecondary={2}/>

            <div className="card">
                <h5 className="card-header">
                    <button type="button" className="btn btn-outline-primary waves-effect mv-right" onClick={() => resetState()} data-bs-toggle="modal" data-bs-target="#addRecipeModal">
                    <span className="tf-icons mdi mdi-checkbox-marked-circle-outline me-1"></span>Add New
                    </button>
                </h5>
                <div className="table-responsive text-nowrap">
                    <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="text-center">Title</th>
                            <th className="text-center">Item</th>
                            <th className="text-center">User</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                        {recipes.map((recipe, index) => (
                        <tr data-index={index}>
                            <td className="text-center">{recipe.title}</td>
                            <td className="text-center">{recipe.item.title}</td>
                            <td className="text-center">{recipe.user.name}</td>                        
                            <td className="text-center">
                                <button type="button" onClick={() => editRecipe(recipe)} className="btn btn-sm btn-primary waves-effect mr-5" data-bs-toggle="modal" data-bs-target=".editRecipeModal">
                                    <span className="tf-icons mdi mdi-pencil-circle-outline me-1"></span>Edit
                                </button>
                                <button type="button" onClick={() => showAlertConfirm(recipe.id)} className="btn btn-sm btn-danger waves-effect">
                                    <span className="tf-icons mdi mdi-trash-can-outline me-1"></span>Delete
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>

                    {recipes.length <= 0 && <div class="text-center">
                        <i className="mdi mdi-magnify no-data mdi-48px"></i>
                        <h5 class="mt-2 no-data">Sorry! No Data Found</h5>
                    </div>}

                    {recipes.length > 0 && <div className="text-center py-5">
                        <button type="button" disabled={next == null} onClick={() => getRecipesData(next)} className="btn btn-sm btn-outline-primary waves-effect mr-5">
                            <span className="tf-icons mdi mdi-arrow-left-drop-circle-outline me-1"></span>Prev
                        </button>
                        <button type="button" disabled={prev == null} onClick={() => getRecipesData(prev)} className="btn btn-sm btn-outline-primary waves-effect">
                            Next<span className="tf-icons mdi mdi-arrow-right-drop-circle-outline me-1"></span>
                        </button>
                    </div>}
                </div>
            </div>

            <div className="modal fade" id="addRecipeModal" tabindex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered1 modal-simple modal-add-new-cc">
                    <div className="modal-content p-3 p-md-5">
                        <div className="modal-body p-md-0">
                            <button type="button" className="btn-close" id="close" data-bs-dismiss="modal" aria-label="Close"></button>
                            <div className="text-center mb-4">
                                <h3 className="mb-2 pb-1">Add New Recipe</h3>
                            </div>
                            <form id="addNewRecipeForm" className="row g-4" onSubmit={createRecipe}>
                                <div className="col-12">
                                    <div className="input-group input-group-merge">
                                        <div className="form-floating form-floating-outline">
                                            <input name="title" className="form-control" type="text" placeholder="Enter Title" value={title} onChange={(event)=>{
                                                setTitle(event.target.value)
                                            }}/>
                                            <label>Title</label>
                                        </div>
                                    </div>
                                    <span className="error-text-class">{(errors.title == undefined) ? '' : errors.title[0]}</span>
                                </div>

                                <div className="col-6">
                                    <div className="form-floating form-floating-outline">
                                        <select id="item_id" name="item_id" className="form-select" value={itemId} onChange={(event)=>{
                                                setItemId(event.target.value)
                                            }}>
                                            <option selected disabled value="">Item</option>
                                            {itemsList.map((itm,i) => (
                                                <option value={itm.id}>{itm.title}</option>
                                            ))}
                                        </select>
                                        <label for="item_id">Item</label>
                                    </div>
                                    <span className="error-text-class">{(errors.item_id == undefined) ? '' : errors.item_id[0]}</span>
                                </div>

                                <div className="col-6">
                                    <div className="form-floating form-floating-outline">
                                        <select id="item_id" name="item_id" className="form-select" value={userId} onChange={(event)=>{
                                                setUserId(event.target.value)
                                            }}>
                                            <option selected disabled value="">User</option>
                                            {usersList.map((usr,i) => (
                                                <option value={usr.id}>{usr.name}</option>
                                            ))}
                                        </select>
                                        <label for="user_id">User</label>
                                    </div>
                                    <span className="error-text-class">{(errors.user_id == undefined) ? '' : errors.user_id[0]}</span>
                                </div>

                                <div className="col-12">
                                    <div class="form-floating form-floating-outline">
                                        <textarea class="form-control h-px-100" id="methodTxt" placeholder="Write method here..." value={method} onChange={(event)=>{
                                            setMethod(event.target.value)
                                        }}></textarea>
                                        <label for="methodTxt">Method</label>
                                    </div>
                                    <span className="error-text-class">{(errors.method == undefined) ? '' : errors.method[0]}</span>
                                </div>

                                <div className="col-12 text-center">
                                    <button type="submit" className="btn btn-primary me-sm-3 me-1">Submit</button>
                                    <button type="reset" className="btn btn-outline-secondary btn-reset" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade editRecipeModal" tabindex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered1 modal-simple modal-add-new-cc">
                    <div className="modal-content p-3 p-md-5">
                        <div className="modal-body p-md-0">
                            <button type="button" className="btn-close" id="close-update" data-bs-dismiss="modal" aria-label="Close"></button>
                            <div className="text-center mb-4">
                                <h3 className="mb-2 pb-1">Update Recipe</h3>
                            </div>
                            <form id="editNewForm" className="row g-4" onSubmit={updateRecipe}>
                                <div className="col-12">
                                    <input name="id" type="hidden" value={id}/>
                                    <div className="input-group input-group-merge">
                                        <div className="form-floating form-floating-outline">
                                            <input name="title" className="form-control" type="text" placeholder="Enter Title" value={title} onChange={(event)=>{
                                                setTitle(event.target.value)
                                            }}/>
                                            <label>Title</label>
                                        </div>
                                    </div>
                                    <span className="error-text-class">{(errors.title == undefined) ? '' : errors.title[0]}</span>
                                </div> 

                                <div className="col-6">
                                    <div className="form-floating form-floating-outline">
                                        <select id="item_id" name="item_id" className="form-select" value={itemId} onChange={(event)=>{
                                                setItemId(event.target.value)
                                            }}>
                                            <option selected disabled value="">Item</option>
                                            {itemsList.map((itm,i) => (
                                                <option value={itm.id}>{itm.title}</option>
                                            ))}
                                        </select>
                                        <label for="item_id">Item</label>
                                    </div>
                                    <span className="error-text-class">{(errors.item_id == undefined) ? '' : errors.item_id[0]}</span>
                                </div>

                                <div className="col-6">
                                    <div className="form-floating form-floating-outline">
                                        <select id="item_id" name="item_id" className="form-select" value={userId} onChange={(event)=>{
                                                setUserId(event.target.value)
                                            }}>
                                            <option selected disabled value="">User</option>
                                            {usersList.map((usr,i) => (
                                                <option value={usr.id}>{usr.name}</option>
                                            ))}
                                        </select>
                                        <label for="user_id">User</label>
                                    </div>
                                    <span className="error-text-class">{(errors.user_id == undefined) ? '' : errors.user_id[0]}</span>
                                </div>

                                <div className="col-12">
                                    <div class="form-floating form-floating-outline">
                                        <textarea class="form-control h-px-100" id="methodTxt" placeholder="Write method here..." value={method} onChange={(event)=>{
                                            setMethod(event.target.value)
                                        }}></textarea>
                                        <label for="methodTxt">Method</label>
                                    </div>
                                    <span className="error-text-class">{(errors.method == undefined) ? '' : errors.method[0]}</span>
                                </div>

                                <div className="col-12 text-center">
                                    <button type="submit" className="btn btn-primary me-sm-3 me-1">Submit</button>
                                    <button type="reset" className="btn btn-outline-secondary btn-reset" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Recipe;

if (document.getElementById('recipe-component')) {
    const Index = ReactDOM.createRoot(document.getElementById("recipe-component"));

    Index.render(
        <React.StrictMode>
            <Recipe/>
        </React.StrictMode>
    )
}
