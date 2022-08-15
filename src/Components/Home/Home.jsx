import { deleteObject, getDownloadURL, ref } from "firebase/storage";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { storage } from "../../Firebase";
import Searchicon from "../../Assets/magnifying-glass.svg";
import { listAll } from "firebase/storage";
import Addimages from "../Home/Addimages/Addimages.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./Home.css";
import "../../Assets/bootstrap.min.css";
import "../../Assets/animate.min.css";
import Image from "./image";
import { ThemeContext } from "../../Container/App";
export const HomeContext = createContext();

function Home() {
  const [imageurl, setImageurl] = useState([]);
  const [addNew, setAddnew] = useState(false);
  const [viewImg, setviewImg] = useState(true);
  const [search, setSearch] = useState(false);
  const [match, setMatch] = useState([]);
  const [confirm, setConfirm] = useState(false);
  const [theme, toggleTheme] = useContext(ThemeContext);
  const [colType, setcolType] = useState("grid");
  const searchRef = useRef();
  var imgPreviewer = document.getElementById("imagePreviewer");
  var imgViewer = document.getElementById("imgViewer");
  var firstImg = document.getElementsByClassName("galleryImg")[0];

  useEffect(() => {
    listPics();
    setFirst();
  }, []);

  const toggleView = () => {
    setviewImg(!viewImg);
    viewImg
      ? (imgPreviewer.style.display = "flex")
      : (imgPreviewer.style.display = "none");
  };

  const listPics = () => {
    const thisRef = ref(storage, "Images");
    setImageurl([]);
    listAll(thisRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageurl((prev) => [...prev, { url: url, name: item.name }]);
        });
      });
    });
  };

  const setFirst = () => {
    firstImg !== undefined && firstImg.classList.add("active");
  };

  const setActive = (e) => {
    var thisImg = e.target;
    toggleView();
    var list = document.getElementsByClassName("galleryImg");
    for (let i = 0; i < list.length; i++) {
      const element = list[i];
      element.classList.remove("active");
    }
    thisImg.classList.add("active");
    imgViewer.src = thisImg.src;
    imgViewer.name = thisImg.name;
  };

  const Images = !search ? (
    imageurl.map((url, index) => {
      return (
        <Image
          clicked={setActive}
          name={url.name}
          src={url.url}
          key={index}
          colType={colType}
          className="gallery"
        />
      );
    })
  ) : (
    <div className="d-flex row justify-content-center">
      <h4 className="text-warning text-center resultText mb-3">
        {`${match.length} ${match.length > 1 ? "Results" : "Result"} Found`}
      </h4>
      <br />
      {match.map((url, index) => {
        if (match.length > 0 && url.url !== null) {
          return (
            <Image
              name={url.name}
              Imgname={url.name}
              clicked={setActive}
              src={url.url}
              key={index}
              colType={colType}
              className="ResultBox"
            />
          );
        }
      })}
    </div>
  );

  const addImage = () => {
    setAddnew(!addNew);
  };

  const deleteImage = () => {
    let thisRef = ref(storage, `Images/${imgViewer.name}`);
    deleteObject(thisRef)
      .then(() => {
        setConfirm(false);
        toggleView();
        setSearch(false);
        searchRef.current.value = "";
        listPics();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const searchHandler = () => {
    var text = searchRef.current.value.toLowerCase();
    setSearch(text.length > 0 ? true : false);
    let matches = imageurl.filter((item) => {
      return item.name.toLowerCase().includes(text);
    });
    setMatch(matches);
  };

  const toggleConfirm = () => {
    setConfirm(!confirm);
  };

  const toggleCol = () => {
    setcolType((curr) => (curr === "grid" ? "cols" : "grid"));
  };

  return (
    <HomeContext.Provider value={[addNew, setAddnew, listPics]}>
      <div className="Home" id={theme}>
        <div className="addNew"> {addNew && <Addimages />} </div>

        <div
          className="imagePreviewer align-content-center"
          id="imagePreviewer"
        >
          <div className="imageBox">
            <div className="cursors d-flex">
              <span className="delete cursor" onClick={toggleConfirm}>
                <FontAwesomeIcon icon={faTrashCan} size="lg" color="red" />
              </span>

              <span className="close text-danger" onClick={toggleView}>
                <FontAwesomeIcon icon={faTimes} size="lg" color="red" />
              </span>
            </div>
            <div className="img">
              <img className="w-100" id="imgViewer" />
            </div>
            <p className="text-center viewerText">
              {imgViewer && imgViewer.name}
            </p>
          </div>
        </div>

        {confirm && (
          <div className="confirmBack">
            <div className="confirmDelete">
              <p>Are You Sure You Want to Delete</p>
              <div className="row">
                <div className="col-5 mx-2">
                  <button
                    onClick={(e) => deleteImage(e)}
                    className="btn btn-outline-success w-100 mr-2"
                  >
                    Yes
                  </button>
                </div>

                <div className="col-5">
                  <button
                    className="btn btn-outline-danger w-100"
                    onClick={toggleConfirm}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="homeContent">
          <button className="addButton" onClick={addImage}>
            +
          </button>

          <div className="searchBar d-flex justify-content-center py-2">
            <form>
              <input
                type="text"
                name="search"
                placeholder="Search...."
                ref={searchRef}
                onChange={searchHandler}
              />
              <button className="searchBtn">
                <img src={Searchicon} alt="image" />
              </button>
            </form>
          </div>

          <div className="switch">
            <label id="switch" className="switch">
              <input type="checkbox" onChange={toggleTheme} id="slider" />
              <span className="slider round"></span>
            </label>
          </div>

          <div className="gridContainer">
            <span
              className={
                colType === "grid"
                  ? "gridToggler cursor"
                  : "bg-success gridToggler cursor"
              }
              onClick={toggleCol}
            >
              &#9638;
            </span>
          </div>

          <div className="image-Container row">{Images}</div>
        </div>
      </div>
    </HomeContext.Provider>
  );
}

export default Home;
