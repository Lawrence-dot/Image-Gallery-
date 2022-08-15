import React, { useContext, useRef, useState } from "react";
import { storageRef } from "../../../Firebase";
import { ref, uploadBytes } from "firebase/storage";
import "./Addimages.css";
import { HomeContext } from "../Home";
import Dummy from "../../../Assets/file-export.svg";

function Addimages() {
  const fileRef = useRef();
  const [addNew, setAddnew, listPics] = useContext(HomeContext);
  const [loading, setLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    const file = fileRef.current.files[0];
    const thisRef = ref(storageRef, `Images/${file.name}`);
    setLoading(true);
    file &&
      uploadBytes(thisRef, file)
        .then(() => {
          addImage();
          listPics();
        })
        .finally(() => {
          setLoading(false);
        })
        .catch((error) => {
          alert(error);
        });
  };

  const addImage = () => {
    setAddnew(!addNew);
  };

  const loadImage = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src);
    };
  };

  return (
    <div className="addImages d-flex justify-content-center align-content-center">
      <div className="card my-5">
        <span onClick={addImage} className="cancel text-rignt">
          {" "}
          x{" "}
        </span>
        <label htmlFor="upload">
          <img
            className="my-3 uploadImg"
            height="120"
            width="140"
            src={Dummy}
            alt=""
            id="output"
          />
        </label>

        <form action="">
          <div className="form-body">
            <input
              className="bg-outline-success"
              hidden
              id="upload"
              ref={fileRef}
              onChange={(e) => loadImage(e)}
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              name="Image"
            />
            <br />
            <button
              className="btn submitBtn btn-outline-success"
              onClick={submitHandler}
            >
              {loading ? (
                <div class="spinner-border" role="status"></div>
              ) : (
                <span className="submitSpan">Add</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Addimages;
