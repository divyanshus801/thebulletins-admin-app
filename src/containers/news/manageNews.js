import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../auth/helper/index';
import Base from '../../core/Base';
import { deleteNews, getNews } from '../helper/apicall';


const ManageNews = () => {

  const [newses, setNewses] = useState([])

  const {user, token} = isAuthenticated();


  const preload = () => {
      getNews().then(data => {
          if(data.error){
              console.log(data.error);
          }else{
              setNewses(data)
              
          }

      });
  };

  useEffect(() => {
      preload();
  }, []);

  const deleteThisNews = newsId => {
    deleteNews(newsId, user._id, token)
    .then(data => {
        if(data.error){
            console.log(data.error);
        }else{
            preload();
            
        }
    })
  };


    return (
        <Base tittle="Welcome admin" description="Manage products here">
             <Link className="btn btn-success mb-4" to={`/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <h2 className="mb-4">All news:</h2>
     
      <div className="row">
        <div className="col-12">
          <h2 className="text-center  my-3">Total {newses.length} News</h2>

          {newses.map((news, index) => {
              return (
              <div key={index} className="row text-center mb-2 ">
              <div className="col-4">
                <h6 className=" text-left">{news.title}</h6>
              </div>
              <div className="col-4">
                <Link
                  className="btn btn-primary"
                  to={`/admin/product/update/${news._id}`}
                >
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button onClick={() => {
                    deleteThisNews(news._id);
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
    );
};

export default ManageNews;
