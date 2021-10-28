import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth/helper/index";
import Base from "../../core/Base";
import { createaNews, getCategories } from "../helper/apicall";


const AddNews = () => {

  const {user, token} = isAuthenticated();

  const [values, setValues] = useState({
    title: "",
    description: "",
    author: "",
    publisher: "",
    link: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdNews: "",
    getRedirect: "",
    formData: "",
  });

  const {
    title,
    description,
    author,
    publisher,
    link,
    photo,
    categories,
    category,
    loading,
    error,
    createdNews,
    getRedirect,
    formData,
  } = values;

  const preload = () => {
    getCategories().then(data => {
        //console.log(data);
        if(data.error){
            setValues({...values, error: data.error})
        }else{
            setValues({...values, categories: data, formData: new FormData() })
                 
        }
    });
  };

 useEffect(() => {
     preload();
 }, [])

  const handleChange = (name) => (event) => {
    const value = name ==="photo" ? event.target.files[0] : event.target.value;
      formData.set(name, value);
      setValues({...values, [name]: value });
};

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error: "",loading: true})
    createaNews(user._id, token, formData)
    .then(data => {
        if(data.error){
            setValues({...values, error: data.error})
        }else{
            setValues({
                ...values,
                title: "",
                description: "",
                publisher: "",
                link: "",
                photo: "",
                loading: false,
                createdNews: data.title

            });
            
        }
    })
    
  };

  const successMessage = () => (
     <div className="alert alert-success mt-3 text-center"
     style={{display: createdNews ? "" : "none"}}>
       <h4>{createdNews} published successfully</h4>
     </div>
  );

  const errorMessage = () => (
    <div className="alert alert-danger mt-3 text-center"
    style={{display: error ? "" : "none"}}>
      <h4>{error},Pleae try again! </h4>
    </div>
 );

  const createProductForm = () => (
    <div className="row">
      <div className="col-4">
        <img src="../../category.svg " className="img-fluid" />
      </div>
      <div className="col-8">
        <form>
          <span>Post photo</span>
          <div className="form-group mb-2">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group mb-2">
            <input
              onChange={handleChange("title")}
              name="title"
              className="form-control"
              placeholder="Title"
              value={title}
              required
            />
          </div>

          { <div className="form-group mb-2">
            <select
              onChange={handleChange("author")}
              className="form-control"
              placeholder="author"
              required
            >
              <option  > Select author</option>
              <option  value={user._id} > {user.name}</option>
            </select>
          </div> }

          <div className="form-group mb-2">
            <textarea
              onChange={handleChange("description")}
              name="description"
              className="form-control"
              placeholder="Description in 60 words"
              value={description}
            />
          </div>
          
          <div className="form-group mb-2">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
              required
            >
              <option>Select</option>
              {categories && 
              categories.map((cate, index) => (
                <option key={cate.index} value={cate._id}>{cate.name}</option>
              ))}
              
            </select>
          </div>

          <div className="form-group mb-2">
            <input
              onChange={handleChange("link")}
              name="link"
              className="form-control"
              placeholder="Publisher link"
              value={link}
            />
          </div>

          <div className="form-group mb-2">
            <input
              onChange={handleChange("publisher")}
              name="publisher"
              className="form-control"
              placeholder="Publisher"
              value={publisher}
            />
          </div>
          

          <button
            type="submit"
            onClick={onSubmit}
            className="mx-2 btn btn-outline-success"
            required
          >
            Create Product
          </button>

          <Link to="/dashboard" className="btn  btn-success mx-2">
            Admin Home
          </Link>
        </form>
      </div>
    </div>
  );

  return (
    <Base
      tittle="Publish a news here!"
      description="Welcome to news publish section"
      className="container p-4"
    >
        {errorMessage()}
       {successMessage()}
      {createProductForm()}
    </Base>
  );
};

export default AddNews;
