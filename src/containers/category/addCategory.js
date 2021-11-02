import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../auth/helper/index';
import Base from '../../core/Base';
import { createCategory } from '../helper/apicall';


const AddCategory = () => {

//    const [name, setName] = useState("")
//    const [imgLink, setImgLink] = useState("")
//    const [error, setError] = useState(false)
//    const [success, setSuccess] = useState(false)

   const [values, setValues] = useState({
    name: "",
    imgLink: "",
    error: false,
    success: false,
    
  });

  const {name, imgLink, error, success} = values;
   const {user, token} = isAuthenticated();

   const handleChange = name => event => {
    setValues({ ...values, error: "", [name]: event.target.value });
  };

 const onsubmit = (event) => {
   event.preventDefault();
  setValues({...values,error: false, success: false})
   //backend request fired
   createCategory(user._id, token, {name, imgLink})
   .then(data => {
       if(data.error){
        setValues({...values,error: true, success: false})
           
       }else{
        setValues({...values,
            name: "",
            imgLink: "",
            error: false,
             success: true
        })
       }
   })

 };

 const successMessage = () => {
     if(success){
         return <h4 className="text-success alert alert-success text-center ">Category created successfully</h4>
     }
 };

 const errorMessage = () => {
    if(error){
        return <h4 className="text-danger alert alert-danger text-center ">Failed to create category</h4>
    }
 };
   

   const myCategoryForm = () => {
      return (
         <div className="row">
          <div className="col-4 ml-4">
          <img src="../../category.svg " className="img-fluid" />
          </div>
          <div className="col-8">
          <form>
           <div className="form-group">
            <p className="lead">Enter the category</p>
            <input type="text"
            className="form-control my-3"
            onChange={handleChange}
            value={name}
            autoFocus
            required
            placeholder="For Ex. Summer " />
            <p className="lead">Enter Image Link</p>
            <input type="text"
            className="form-control my-3"
            onChange={handleChange}
            value={imgLink}
            autoFocus
            required
            placeholder="" />
            <button className="btn btn-outline-success" 
            onClick={onsubmit}>
             Create Category
            </button>
           </div>
       </form>
       <div className="mt-5 ">
        <Link className="btn btn-sm btn-success mb-3"
         to="/dashboard">
        Admin home
        </Link>
     </div>
          </div>
         </div>
       )
   };

    return (
        <Base tittle="Create category here"
         description="Add new category for tshirts"
         className="container  p-4">
        {successMessage()}
        {errorMessage()}
         {myCategoryForm()} 
        </Base>
    )
}

export default AddCategory;
