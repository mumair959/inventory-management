import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom/client';
import axios from "axios";

function Widget() {
    const [user, setUser] = useState(0)
    const [item, setItem] = useState(0)
    const [category, setCategory] = useState(0)
    const [recipe, setRecipe] = useState(0)

    useEffect(()=>{
        getDashboardData() 
    },[])

    const getDashboardData = async () => {
        await axios.get(`/get-dashboard-data`).then(({data})=>{
            if (data.success == true) {
                setUser(data.users)
                setItem(data.items)
                setCategory(data.categories)
                setRecipe(data.recipes)
            }
        })
    }

    return (
        <div className="row gy-4 mb-4">
            <div className="col-lg-3 col-md-3 col-sm-12">
                <div className="card h-100">
                    <div className="card-body d-flex justify-content-between flex-wrap gap-3">
                        <div className="d-flex gap-3">
                            <div className="avatar p-30">
                                <div className="avatar-initial bg-label-primary rounded">
                                    <i className="mdi mdi-account-outline mdi-48px"></i>
                                </div>
                            </div>
                            <div className="card-info">
                                <h3 className="mb-0">{user}</h3>
                                <p>Users</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="col-lg-3 col-md-3 col-sm-12">
                <div className="card h-100">
                    <div className="card-body d-flex justify-content-between flex-wrap gap-3">
                        <div className="d-flex gap-3">
                            <div className="avatar p-30">
                                <div className="avatar-initial bg-label-warning rounded">
                                    <i className="mdi mdi-archive-check-outline mdi-48px"></i>
                                </div>
                            </div>
                            <div className="card-info">
                                <h3 className="mb-0">{item}</h3>
                                <p>Items</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="col-lg-3 col-md-3 col-sm-12">
                <div className="card h-100">
                    <div className="card-body d-flex justify-content-between flex-wrap gap-3">
                        <div className="d-flex gap-3">
                            <div className="avatar p-30">
                                <div className="avatar-initial bg-label-success rounded">
                                    <i className="mdi mdi-note-edit-outline mdi-48px"></i>
                                </div>
                            </div>
                            <div className="card-info">
                                <h3 className="mb-0">{recipe}</h3>
                                <p>Recipes</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="col-lg-3 col-md-3 col-sm-12">
                <div className="card h-100">
                    <div className="card-body d-flex justify-content-between flex-wrap gap-3">
                        <div className="d-flex gap-3">
                            <div className="avatar p-30">
                                <div className="avatar-initial bg-label-danger rounded">
                                    <i className="mdi mdi-pail-outline mdi-48px"></i>
                                </div>
                            </div>
                            <div className="card-info">
                                <h3 className="mb-0">{category}</h3>
                                <p>Item Categories</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>     
        </div>
    );
}

export default Widget;

if (document.getElementById('widget-component')) {
    const Index = ReactDOM.createRoot(document.getElementById("widget-component"));

    Index.render(
        <React.StrictMode>
            <Widget/>
        </React.StrictMode>
    )
}
