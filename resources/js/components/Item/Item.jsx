import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom/client';
import axios from "axios";
import Swal from 'sweetalert2';
import { Oval } from "react-loader-spinner";

function Item() {
    const [items, setItems] = useState([])
    const [categoriesList, setCategoriesList] = useState([])
    const [unitsList, setUnitsList] = useState([])
    const [itemVariationsList, setItemVariationsList] = useState([])
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [sellable, setSellable] = useState(false)
    const [delivable, setDelivable] = useState(false)
    const [hasVariations, setHasVariations] = useState(false)
    const [categoriesArr, setCategoriesArr] = useState([])
    const [unitsArr, setUnitsArr] = useState([])
    const [itemVariationsArr, setItemVariationsArr] = useState([])
    const [next, setNext] = useState(null)
    const [prev, setPrev] = useState(null)
    const [errors,setErrors] = useState({})
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        getItemsData() 
        getCategoriesList()
        getUnitsList()
        getItemVariationsList()
    },[])

    const getCategoriesList = async (id = null) => {
        let req_url = '/get-categories-list';

        if(id != null){
            req_url = req_url+'?id='+id;
        }

        await axios.get(req_url).then(({data})=>{
            setCategoriesList(data.items)
        })
    }

    const getUnitsList = async (id = null) => {
        let req_url = '/get-units-list';

        if(id != null){
            req_url = req_url+'?id='+id;
        }

        await axios.get(req_url).then(({data})=>{
            setUnitsList(data.units)
        })
    }

    const getItemVariationsList = async (id = null) => {
        let req_url = '/get-item-variations-list';

        if(id != null){
            req_url = req_url+'?id='+id;
        }

        await axios.get(req_url).then(({data})=>{
            setItemVariationsList(data.item_variations)
        })
    }

    const getItemsData = async (url = null) => {
        let req_url = '/get-all-items';

        if(url != null){
            let url_string = new URL(url);
            req_url = req_url+'?page='+url_string.searchParams.get("page");
        }

        await axios.get(req_url).then(({data})=>{
            setItems(data.items.data)
            setNext(data.items.next_page_url)
            setPrev(data.items.prev_page_url)
        })
    }

    const createItem = async (e) => {
        e.preventDefault();
        setLoading(true)
    
        const formData = new FormData()
        formData.append('title', title)
        formData.append('sellable', sellable)
        formData.append('delivable', delivable)
        formData.append('has_variations', hasVariations)

        await axios.post(`/create-item`, formData).then(({data})=>{
            setItems(data.items.data)
            setTitle('')
            setDelivable(false)
            setSellable(false)
            setHasVariations(false)
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

    const updateItem = async (e) => {
        e.preventDefault();
        setLoading(true)
    
        const formData = new FormData()
        formData.append('id', id)
        formData.append('title', title)
        formData.append('sellable', sellable)
        formData.append('delivable', delivable)
        formData.append('has_variations', hasVariations)
    
        await axios.post(`/update-item`, formData).then(({data})=>{
            setItems(data.items.data)
            setId('')
            setTitle('')
            setDelivable(false)
            setSellable(false)
            setHasVariations(false)
            
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

    const deleteItem = async (id) => {  
        setLoading(true)  
        const formData = new FormData()
        formData.append('id', id)
    
        await axios.post(`/delete-item`, formData).then(({data})=>{
            setItems(data.items.data)
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
                deleteItem(id);
            }
        })
    }

    const editItem = (v) => {
        let s_val = v.sellable == 1 ? true : false
        let d_val = v.delivable == 1 ? true : false
        let h_val = v.has_variations == 1 ? true : false

        setId(v.id)
        setTitle(v.title)
        setDelivable(d_val)
        setSellable(s_val)
        setHasVariations(h_val)
    }

    const resetState = (v) => {
        setId('')
        setTitle('')
        setDelivable(false)
        setSellable(false)
        setHasVariations(false)
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
                    <button type="button" className="btn btn-outline-primary waves-effect mv-right" onClick={() => resetState()} data-bs-toggle="modal" data-bs-target="#addItemModal">
                    <span className="tf-icons mdi mdi-checkbox-marked-circle-outline me-1"></span>Add New
                    </button>
                </h5>
                <div className="table-responsive text-nowrap">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th className="text-center">Title</th>
                                <th className="text-center">Sellable</th>
                                <th className="text-center">Delivable</th>
                                <th className="text-center">Has Variations</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">
                            {items.map((item, index) => ( 
                                <tr data-index={index}>
                                    <td className="text-center">{item.title}</td>
                                    <td className="text-center">
                                        {item.sellable == true && <span className="badge rounded-pill bg-label-success me-1">Yes</span>}
                                        {item.sellable == false && <span className="badge rounded-pill bg-label-danger me-1">No</span>}
                                    </td>
                                    <td className="text-center">
                                        {item.delivable == true && <span className="badge rounded-pill bg-label-success me-1">Yes</span>}
                                        {item.delivable == false && <span className="badge rounded-pill bg-label-danger me-1">No</span>}
                                    </td>
                                    <td className="text-center">
                                        {item.has_variations == true && <span className="badge rounded-pill bg-label-success me-1">Yes</span>}
                                        {item.has_variations == false && <span className="badge rounded-pill bg-label-danger me-1">No</span>}
                                    </td>
                                    <td className="text-center">
                                        <button type="button" onClick={() => editItem(item)} className="btn btn-sm btn-primary waves-effect mr-5" data-bs-toggle="modal" data-bs-target=".editItemModal">
                                            <span className="tf-icons mdi mdi-pencil-circle-outline me-1"></span>Edit
                                        </button>
                                        <button type="button" onClick={() => showAlertConfirm(item.id)} className="btn btn-sm btn-danger waves-effect">
                                            <span className="tf-icons mdi mdi-trash-can-outline me-1"></span>Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {items.length <= 0 && <div className="text-center">
                        <i className="mdi mdi-magnify no-data mdi-48px"></i>
                        <h5 className="mt-2 no-data">Sorry! No Data Found</h5>
                    </div>}

                    {items.length > 0 && <div className="text-center py-5">
                        <button type="button" disabled={next == null} onClick={() => getItemsData(next)} className="btn btn-sm btn-outline-primary waves-effect mr-5">
                            <span className="tf-icons mdi mdi-arrow-left-drop-circle-outline me-1"></span>Prev
                        </button>
                        <button type="button" disabled={prev == null} onClick={() => getItemsData(prev)} className="btn btn-sm btn-outline-primary waves-effect">
                            Next<span className="tf-icons mdi mdi-arrow-right-drop-circle-outline me-1"></span>
                        </button>
                    </div>}

                </div>
            </div>

            <div className="modal fade" id="addItemModal" tabindex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered1 modal-simple modal-add-new-cc">
                    <div className="modal-content p-3 p-md-5">
                        <div className="modal-body p-md-0">
                            <button type="button" className="btn-close" id="close" data-bs-dismiss="modal" aria-label="Close"></button>
                            <div className="text-center mb-4">
                                <h3 className="mb-2 pb-1">Add New Item</h3>
                            </div>
                            <form id="addNewItemForm" className="row g-4" onSubmit={createItem}>
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

                                <div class="col-md-6">
                                    <div class="form-floating form-floating-outline">
                                        <div class="select2-primary">
                                            <select id="select2Primary" class="select2 form-select" multiple>
                                            {unitsList.map((unt,i) => (
                                                <option value={unt.id}>{unt.title}</option>
                                            ))}
                                            </select>
                                        </div>
                                        <label for="select2Primary">Units</label>
                                    </div>
                                </div>

                                {/* <div class="col-md-6">
                                    <div class="form-floating form-floating-outline">
                                        <div class="select2-primary">
                                            <select id="select2Primary" class="select2 form-select" multiple>
                                            {categoriesList.map((cat,i) => (
                                                <option value={cat.id}>{cat.title}</option>
                                            ))}
                                            </select>
                                        </div>
                                        <label for="select2Primary">Categories</label>
                                    </div>
                                </div> */}

                                <div className="col-6">
                                    <label className="switch">
                                        <input type="checkbox" className="switch-input" value={sellable} onChange={(event)=>{
                                            setSellable(!sellable)
                                        }}/>
                                        <span className="switch-toggle-slider">
                                        <span className="switch-on"></span>
                                        <span className="switch-off"></span>
                                        </span>
                                        <span className="switch-label">Sellable</span>
                                    </label>
                                </div>

                                <div className="col-6">
                                    <label className="switch">
                                        <input type="checkbox" className="switch-input" value={delivable} onChange={(event)=>{
                                            setDelivable(!delivable)
                                        }}/>
                                        <span className="switch-toggle-slider">
                                        <span className="switch-on"></span>
                                        <span className="switch-off"></span>
                                        </span>
                                        <span className="switch-label">Delivable</span>
                                    </label>
                                </div>

                                <div className="col-6">
                                    <label className="switch">
                                        <input type="checkbox" className="switch-input" value={hasVariations} onChange={(event)=>{
                                            setHasVariations(!hasVariations)
                                        }}/>
                                        <span className="switch-toggle-slider">
                                        <span className="switch-on"></span>
                                        <span className="switch-off"></span>
                                        </span>
                                        <span className="switch-label">Has Variations</span>
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

            <div className="modal fade editItemModal" tabindex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered1 modal-simple modal-add-new-cc">
                    <div className="modal-content p-3 p-md-5">
                        <div className="modal-body p-md-0">
                            <button type="button" className="btn-close" id="close-update" data-bs-dismiss="modal" aria-label="Close"></button>
                            <div className="text-center mb-4">
                                <h3 className="mb-2 pb-1">Update Item</h3>
                            </div>
                            <form id="editNewForm" className="row g-4" onSubmit={updateItem}>
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

                                <div class="col-md-6">
                                    <div class="form-floating form-floating-outline">
                                        <div class="select2-primary">
                                            <select id="select2Primary" class="select2 form-select" multiple>
                                            {unitsList.map((unt,i) => (
                                                <option value={unt.id}>{unt.title}</option>
                                            ))}
                                            </select>
                                        </div>
                                        <label for="select2Primary">Units</label>
                                    </div>
                                </div>

                                {/* <div class="col-md-6">
                                    <div class="form-floating form-floating-outline">
                                        <div class="select2-primary">
                                            <select id="select2Primary" class="select2 form-select" multiple>
                                            {categoriesList.map((cat,i) => (
                                                <option value={cat.id}>{cat.title}</option>
                                            ))}
                                            </select>
                                        </div>
                                        <label for="select2Primary">Categories</label>
                                    </div>
                                </div> */}

                                <div className="col-6">
                                    <label className="switch">
                                        <input type="checkbox" className="switch-input" checked={sellable} value={sellable} onChange={(event)=>{
                                            setSellable(!sellable)
                                        }}/>
                                        <span className="switch-toggle-slider">
                                        <span className="switch-on"></span>
                                        <span className="switch-off"></span>
                                        </span>
                                        <span className="switch-label">Sellable</span>
                                    </label>
                                </div>

                                <div className="col-6">
                                    <label className="switch">
                                        <input type="checkbox" className="switch-input" checked={delivable} value={delivable} onChange={(event)=>{
                                            setDelivable(!delivable)
                                        }}/>
                                        <span className="switch-toggle-slider">
                                        <span className="switch-on"></span>
                                        <span className="switch-off"></span>
                                        </span>
                                        <span className="switch-label">Delivable</span>
                                    </label>
                                </div>

                                <div className="col-6">
                                    <label className="switch">
                                        <input type="checkbox" className="switch-input" checked={hasVariations} value={hasVariations} onChange={(event)=>{
                                            setHasVariations(!hasVariations)
                                        }}/>
                                        <span className="switch-toggle-slider">
                                        <span className="switch-on"></span>
                                        <span className="switch-off"></span>
                                        </span>
                                        <span className="switch-label">Has Variations</span>
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

export default Item;

if (document.getElementById('item-component')) {
    const Index = ReactDOM.createRoot(document.getElementById("item-component"));

    Index.render(
        <React.StrictMode>
            <Item/>
        </React.StrictMode>
    )
}
