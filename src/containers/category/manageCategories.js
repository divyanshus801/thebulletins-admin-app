import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../auth/helper/index';
import Base from '../../core/Base';
import { deleteCategory, getCategories } from '../helper/apicall';


const ManageCategories = () => {

    const [categories, setCategories] = useState([])

    const {user, token} = isAuthenticated();
  
  
    const preload = () => {
        getCategories().then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                setCategories(data)
                
            }
  
        });
    };
  
    useEffect(() => {
        preload();
    }, []);

    const deleteThisCategory = categoryId => {
        deleteCategory(categoryId, user._id, token)
        .then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                preload();
                
            }
        })
      };



    return (
        <Base tittle="Welcome admin" description="Manage Categories here">
           <Link className="btn btn-success mb-4" to={`/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <h2 className="mb-4">All Categories:</h2>
     
      <div className="row">
        <div className="col-12">
          <h2 className="text-center  my-3">Total {categories.length} Categories</h2>

          {categories.map((category, index) => {
              return (
              <div key={index} className="row text-center mb-2 ">
              <div className="col-4">
                <h3 className=" text-left">{category.name}</h3>
              </div>
              <div className="col-4">
                <Link
                  className="btn btn-primary"
                  to={`/category/update/${category._id}`}
                >
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button onClick={() => {
                    deleteThisCategory(category._id);
                }} className="btn btn-danger">
                  Delete
                </button>
              </div>
              </div>
          );
          })}
          
        </div>
      </div>
        </Base>
    )
}

export default ManageCategories;
