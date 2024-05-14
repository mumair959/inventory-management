import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom/client';
import axios from "axios";
import Swal from 'sweetalert2';
import { Oval } from "react-loader-spinner";

function ItemModifier() {
    const [modifiers, setModifiers] = useState([])
    const [itemsList, setItemsList] = useState([])
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0.0)
    const [itemId, setItemId] = useState('')
    const [canMultiple, setCanMultiple] = useState(false)
    const [next, setNext] = useState(null)
    const [prev, setPrev] = useState(null)
    const [errors,setErrors] = useState({})
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        getModifiersData() 
        getItemsList()
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

    const getModifiersData = async (url = null) => {
        let req_url = '/get-all-item-modifiers';

        if(url != null){
            let url_string = new URL(url);
            req_url = req_url+'?page='+url_string.searchParams.get("page");
        }

        await axios.get(req_url).then(({data})=>{
            setModifiers(data.item_modifiers.data)
            setNext(data.item_modifiers.next_page_url)
            setPrev(data.item_modifiers.prev_page_url)
        })
    }

    const createModifier = async (e) => {
        e.preventDefault();
        setLoading(true)
    
        const formData = new FormData()
        formData.append('title', title)
        formData.append('price', price)
        formData.append('item_id', itemId)
        formData.append('can_multiple', canMultiple)

        await axios.post(`/create-item-modifier`, formData).then(({data})=>{
            setModifiers(data.item_modifiers.data)
            setTitle('')
            setPrice(0.0)
            setItemId('')
            setCanMultiple(false)
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

    const updateModifer = async (e) => {
        e.preventDefault();
        setLoading(true)
    
        const formData = new FormData()
        formData.append('id', id)
        formData.append('title', title)
        formData.append('price', price)
        formData.append('item_id', itemId)
        formData.append('can_multiple', canMultiple)
    
        await axios.post(`/update-item-modifier`, formData).then(({data})=>{
            setModifiers(data.item_modifiers.data)
            setId('')
            setTitle('')
            setPrice(0.0)
            setItemId('')
            setCanMultiple(false)
            
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

    const deleteModifier = async (id) => {  
        setLoading(true)  
        const formData = new FormData()
        formData.append('id', id)
    
        await axios.post(`/delete-item-modifier`, formData).then(({data})=>{
            setModifiers(data.item_modifiers.data)
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
                deleteModifier(id);
            }
        })
    }

    const editItem = (v) => {
        let c_val = v.can_multiple == 1 ? true : false

        setId(v.id)
        setTitle(v.title)
        setPrice(v.price)
        setItemId(v.item_id)
        setCanMultiple(c_val)
    }

    const resetState = (v) => {
        setId('')
        setTitle('')
        setPrice(0.0)
        setItemId('')
        setCanMultiple(false)
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
                    <button type="button" className="btn btn-outline-primary waves-effect mv-right" onClick={() => resetState()} data-bs-toggle="modal" data-bs-target="#addModifierModal">
                    <span className="tf-icons mdi mdi-checkbox-marked-circle-outline me-1"></span>Add New
                    </button>
                </h5>
                <div className="table-responsive text-nowrap">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th className="text-center">Title</th>
                                <th className="text-center">Item</th>
                                <th className="text-center">Price</th>
                                <th className="text-center">Can Multiple</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">
                            {modifiers.map((modifier, index) => (
                            <tr data-index={index}>
                                <td className="text-center">{modifier.title}</td>
                                <td className="text-center">{modifier.item.title}</td>
                                <td className="text-center">{modifier.price}</td>
                                <td className="text-center">
                                    {modifier.can_multiple == true && <span className="badge rounded-pill bg-label-success me-1">Yes</span>}
                                    {modifier.can_multiple == false && <span className="badge rounded-pill bg-label-danger me-1">No</span>}
                                </td>
                                <td className="text-center">
                                    <button type="button" onClick={() => editItem(modifier)} className="btn btn-sm btn-primary waves-effect mr-5" data-bs-toggle="modal" data-bs-target=".editModifierModal">
                                        <span className="tf-icons mdi mdi-pencil-circle-outline me-1"></span>Edit
                                    </button>
                                    <button type="button" onClick={() => showAlertConfirm(modifier.id)} className="btn btn-sm btn-danger waves-effect">
                                        <span className="tf-icons mdi mdi-trash-can-outline me-1"></span>Delete
                                    </button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>

                    {modifiers.length <= 0 && <div class="text-center">
                        <i className="mdi mdi-magnify no-data mdi-48px"></i>
                        <h5 class="mt-2 no-data">Sorry! No Data Found</h5>
                    </div>}

                    {modifiers.length > 0 && <div className="text-center py-5">
                        <button type="button" disabled={next == null} onClick={() => getModifiersData(next)} className="btn btn-sm btn-outline-primary waves-effect mr-5">
                            <span className="tf-icons mdi mdi-arrow-left-drop-circle-outline me-1"></span>Prev
                        </button>
                        <button type="button" disabled={prev == null} onClick={() => getModifiersData(prev)} className="btn btn-sm btn-outline-primary waves-effect">
                            Next<span className="tf-icons mdi mdi-arrow-right-drop-circle-outline me-1"></span>
                        </button>
                    </div>}
                </div>
            </div>

            <div className="modal fade" id="addModifierModal" tabindex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered1 modal-simple modal-add-new-cc">
                    <div className="modal-content p-3 p-md-5">
                        <div className="modal-body p-md-0">
                            <button type="button" className="btn-close" id="close" data-bs-dismiss="modal" aria-label="Close"></button>
                            <div className="text-center mb-4">
                                <h3 className="mb-2 pb-1">Add New Modifier</h3>
                            </div>
                            <form id="addNewModifierForm" className="row g-4" onSubmit={createModifier}>
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

                                <div className="col-12">
                                    <div className="input-group input-group-merge">
                                        <div className="form-floating form-floating-outline">
                                            <input name="price" className="form-control" type="number" placeholder="Enter Price" value={price} onChange={(event)=>{
                                                setPrice(event.target.value)
                                            }}/>
                                            <label>Price</label>
                                        </div>
                                    </div>
                                    <span className="error-text-class">{(errors.price == undefined) ? '' : errors.price[0]}</span>
                                </div> 

                                <div className="col-12">
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
                                    <label className="switch">
                                        <input type="checkbox" className="switch-input" value={canMultiple} onChange={(event)=>{
                                            setCanMultiple(!canMultiple)
                                        }}/>
                                        <span className="switch-toggle-slider">
                                        <span className="switch-on"></span>
                                        <span className="switch-off"></span>
                                        </span>
                                        <span className="switch-label">Can Multiple</span>
                                    </label>
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

            <div className="modal fade editModifierModal" tabindex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered1 modal-simple modal-add-new-cc">
                    <div className="modal-content p-3 p-md-5">
                        <div className="modal-body p-md-0">
                            <button type="button" className="btn-close" id="close-update" data-bs-dismiss="modal" aria-label="Close"></button>
                            <div className="text-center mb-4">
                                <h3 className="mb-2 pb-1">Update Modifier</h3>
                            </div>
                            <form id="editNewForm" className="row g-4" onSubmit={updateModifer}>
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

                                <div className="col-12">
                                    <div className="input-group input-group-merge">
                                        <div className="form-floating form-floating-outline">
                                            <input name="price" className="form-control" type="number" placeholder="Enter Price" value={price} onChange={(event)=>{
                                                setPrice(event.target.value)
                                            }}/>
                                            <label>Price</label>
                                        </div>
                                    </div>
                                    <span className="error-text-class">{(errors.price == undefined) ? '' : errors.price[0]}</span>
                                </div>  

                                <div className="col-12">
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
                                    <label className="switch">
                                        <input type="checkbox" className="switch-input" checked={canMultiple} value={canMultiple} onChange={(event)=>{
                                            setCanMultiple(!canMultiple)
                                        }}/>
                                        <span className="switch-toggle-slider">
                                        <span className="switch-on"></span>
                                        <span className="switch-off"></span>
                                        </span>
                                        <span className="switch-label">Can Multiple</span>
                                    </label>
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

export default ItemModifier;

if (document.getElementById('item-modifier-component')) {
    const Index = ReactDOM.createRoot(document.getElementById("item-modifier-component"));

    Index.render(
        <React.StrictMode>
            <ItemModifier/>
        </React.StrictMode>
    )
}
