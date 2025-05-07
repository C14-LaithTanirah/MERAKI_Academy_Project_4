import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { categoryIdFun } from "../../redux/slices/categoryIdSlice";

const Category = () => {
  const token = localStorage.getItem("token");
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const categoryId = useSelector((state) => {
    return state.categoryIdReducer.categoryId;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:5000/category", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((reselt) => {
        setCategory(reselt.data.category);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div>
      <div
        className="text-center py-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(55, 53, 53, 0.5), rgba(255, 255, 255, 0.5))",
          marginBottom: "20px",
        }}
      >
        <h1 className="display-4" style={{ fontWeight: "bold" }}>
          Welcome to E-Shop
        </h1>
        <p className="lead" style={{ fontWeight: "bold" }}>
          Style meets simplicity
        </p>
        <button
          className="btn btn-dark px-4"
          onClick={() => {
            navigate("/login");
          }}
        >
          Shop Now
        </button>
      </div>
      <div className="container py-4 text-large fw-bold">
        <div className="row">
          {category.map((cat, i) => (
            <div className="col-md-4 text-center" key={i}>
              <div
                className="p-4 border"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(132, 131, 131, 0.5), rgba(0, 0, 0, 0.5))",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  color: "white",
                  height: "200px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "10px",
                  marginBottom: "20px",
                }}
              >
                <div></div>
                <div
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(106, 105, 105, 0.8), rgba(0, 0, 0, 0.5))",
                  }}
                  className="bg-dark bg-opacity-50 px-3 py-2 rounded"
                >
                  <h3 className="text-white m-0">{cat.categoryName}</h3>
                  <button
                    id={cat._id}
                    onClick={(e) => {
                      dispatch(categoryIdFun(e.target.id));
                    }}
                    className="btn btn-light mt-2 slide-hover"
                  >
                    Explore
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
