import React from "react";
import "./Home.css";

function Image(props) {
  var grid = [
    "col-12",
    "col-sm-12",
    "col-md-4",
    "col-lg-3",
    "m-3",
    "cards",
    `${props.className}`,
  ];
  var col = [
    "col-5",
    "col-sm-5",
    "col-md-3",
    "col-lg-2",
    "cards",
    "col-cards",
    `${props.className}`,
  ];
  return (
    <div
      className={
        props.colType === "grid" && props.className === "gallery"
          ? grid.join(" ")
          : props.colType === "cols" && props.className === "gallery"
          ? col.join(" ")
          : "ResultBox col-10 col-md-4 col-lg-3 col-cards cards"
      }
    >
      <img
        className="h-100 galleryImg border-dash"
        name={props.name}
        onClick={props.clicked}
        src={props.src}
        alt={props.Imgname}
      />

      {props.Imgname && (
        <p className="text-center bg-dark shownText" id="shownText">
          {props.name}
        </p>
      )}
    </div>
  );
}

export default Image;
