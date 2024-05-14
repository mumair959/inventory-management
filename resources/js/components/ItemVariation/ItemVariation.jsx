import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom/client';
import axios from "axios";
import Swal from 'sweetalert2';
import { Oval } from "react-loader-spinner";

function ItemVariation() {
    const [variations, setVariations] = useState([])
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [next, setNext] = useState(null)
    const [prev, setPrev] = useState(null)
    const [errors,setErrors] = useState({})
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        getVariationsData() 
    },[])

    const getVariationsData = async (url = null) => {
        let req_url = '/get-all-item-variations';

        if(url != null){
            let url_string = new URL(url);
            req_url = req_url+'?page='+url_string.searchParams.get("page");
        }

        await axios.get(req_url).then(({data})=>{
            setVariations(data.item_variations.data)
            setNext(data.item_variations.next_page_url)
            setPrev(data.item_variations.prev_page_url)
        })
    }

    const createItemVariation = async (e) => {
        e.preventDefault();
        setLoading(true)
    
        const formData = new FormData()
        formData.append('title', title)
    
        await axios.post(`/create-item-variation`, formData).then(({data})=>{
            setVariations(data.item_variations.data)
            setTitle('')
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

    const updateItemVariation = async (e) => {
        e.preventDefault();
        setLoading(true)
    
        const formData = new FormData()
        formData.append('id', id)
        formData.append('title', title)
    
        await axios.post(`/update-item-variation`, formData).then(({data})=>{
            setVariations(data.item_variations.data)
            setId('')
            setTitle('')
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

    const deleteItemVariation = async (id) => {  
        setLoading(true)  
        const formData = new FormData()
        formData.append('id', id)
    
        await axios.post(`/delete-item-variation`, formData).then(({data})=>{
            setVariations(data.item_variations.data)
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
                deleteItemVariation(id);
            }
        })
    }

    const editItemVariation = (v) => {
        setId(v.id)
        setTitle(v.title)
    }

    const resetState = (v) => {
        setId('')
        setTitle('')
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
                    <button type="button" className="btn btn-outline-primary waves-effect mv-right" onClick={() => resetState()} data-bs-toggle="modal" data-bs-target="#addVariationModal">
                        <span className="tf-icons mdi mdi-checkbox-marked-circle-outline me-1"></span>Add New
                    </button>
                </h5>
                <div className="table-responsive text-nowrap">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th className="text-center">Title</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">
                            {variations.map((variation, index) => (
                            <tr data-index={index}>
                                <td className="text-center">{variation.title}</td>
                                <td className="text-center">
                                    <button type="button" onClick={() => editItemVariation(variation)} className="btn btn-sm btn-primary waves-effect mr-5" data-bs-toggle="modal" data-bs-target=".editVariationModal">
                                        <span className="tf-icons mdi mdi-pencil-circle-outline me-1"></span>Edit
                                    </button>
                                    <button type="button" onClick={() => showAlertConfirm(variation.id)} className="btn btn-sm btn-danger waves-effect">
                                        <span className="tf-icons mdi mdi-trash-can-outline me-1"></span>Delete
                                    </button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>

                    {variations.length <= 0 && <div className="text-center">
                        <i className="mdi mdi-magnify no-data mdi-48px"></i>
                        <h5 className="mt-2 no-data">Sorry! No Data Found</h5>
                    </div>}

                    {variations.length > 0 && <div className="text-center py-5">
                        <button type="button" disabled={next == null} onClick={() => getVariationsData(next)} className="btn btn-sm btn-outline-primary waves-effect mr-5">
                            <span className="tf-icons mdi mdi-arrow-left-drop-circle-outline me-1"></span>Prev
                        </button>
                        <button type="button" disabled={prev == null} onClick={() => getVariationsData(prev)} className="btn btn-sm btn-outline-primary waves-effect">
                            Next<span className="tf-icons mdi mdi-arrow-right-drop-circle-outline me-1"></span>
                        </button>
                    </div>}
                </div>
            </div>

            <div className="modal fade" id="addVariationModal" tabindex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered1 modal-simple modal-add-new-cc">
                    <div className="modal-content p-3 p-md-5">
                        <div className="modal-body p-md-0">
                            <button type="button" className="btn-close" id="close" data-bs-dismiss="modal" aria-label="Close"></button>
                            <div className="text-center mb-4">
                                <h3 className="mb-2 pb-1">Add New Item Variation</h3>
                            </div>
                            <form id="addNewVariationForm" className="row g-4" onSubmit={createItemVariation}>
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
                                <div className="col-12 text-center">
                                    <button type="submit" className="btn btn-primary me-sm-3 me-1">Submit</button>
                                    <button type="reset" className="btn btn-outline-secondary btn-reset" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade editVariationModal" tabindex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered1 modal-simple modal-add-new-cc">
                    <div className="modal-content p-3 p-md-5">
                        <div className="modal-body p-md-0">
                            <button type="button" className="btn-close" id="close-update" data-bs-dismiss="modal" aria-label="Close"></button>
                            <div className="text-center mb-4">
                                <h3 className="mb-2 pb-1">Update Item Variation</h3>
                            </div>
                            <form id="editNewVariationForm" className="row g-4" onSubmit={updateItemVariation}>
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

export default ItemVariation;

if (document.getElementById('item-variation-component')) {
    const Index = ReactDOM.createRoot(document.getElementById("item-variation-component"));

    Index.render(
        <React.StrictMode>
            <ItemVariation/>
        </React.StrictMode>
    )
}
