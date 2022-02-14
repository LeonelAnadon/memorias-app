import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import deleteImg from "../img/delete.svg";
import editImg from "../img/edit.svg";
import save from "../img/save.svg";
import DateTag from "./DateTag";
import LoadingBar from "./LoadingBar";

const Cards = ({ value, deleteData, editData, response }) => {
  const btnSubmit = useRef(null);
  const [readOnly, setReadOnly] = useState(false);
  const [isLoadingSpinner, setIsLoadingSpinner] = useState(false);
  const [isLoadingSpinnerDelete, setIsLoadingSpinnerDelete] = useState(false);
  const { register, handleSubmit, setFocus } = useForm({
    defaultValues: {
      title: value.title ? value.title : "",
      desc: value.desc ? value.desc : "",
    },
  });
  const url = value.img64;
  const images = {
    backgroundImage: `url(${url})`,
  };

  useEffect(() => {
    if (readOnly) {
      setFocus("title");
    }
  }, [readOnly]);

  useEffect(() => {
    if (response?.data?.saved === "edited" && response?.status === 200) {
      setIsLoadingSpinner(false);
    }
  }, [response]);

  useEffect(() => {
    if (response?.data?.deletedCount === 1 && response?.status === 200) {
      setIsLoadingSpinnerDelete(false);
    }
  }, [response]);

  useEffect(() => {
    console.log(isLoadingSpinner);
  }, [isLoadingSpinner]);

  const handleEdit = (evt) => {
    if (evt.target.id === "edit") {
      setReadOnly((edit) => setReadOnly(!edit));
      console.log("%cEDIT ", " color: #21f0ea");
    } else if (evt.target.id === "save") {
      setReadOnly((edit) => setReadOnly(!edit));
      setIsLoadingSpinner(true);
      btnSubmit.current.click();
      console.log("%cSAVE ", "color: #e2c5fd");
    }
  };

  const handleDelete = () => {
    deleteData(value._id);
    setIsLoadingSpinnerDelete(true)
  };

  const submitPost = (data) => {
    editData({
      data: data,
      id: value._id,
      createdAt: new Date(),
    });
  };

  return (
    <div className="card">
      <div style={images} className="card_image" />
      <div className="card_info">
        <form onSubmit={handleSubmit(submitPost)}>
          <TextareaAutosize
            {...register("title")}
            className={readOnly ? "editable" : ""}
            readOnly={!readOnly}
            name="title"
            maxLength="38"
            spellCheck={false}
          />
          <TextareaAutosize
            {...register("desc")}
            className={readOnly ? "editable" : ""}
            readOnly={!readOnly}
            name="desc"
            maxLength="130"
            spellCheck={false}
          />
          <button ref={btnSubmit} style={{ display: "none" }}></button>
        </form>
        <div>
          <DateTag createdAt={value.createdAt} />
          {!isLoadingSpinnerDelete ? (
            <img onClick={handleDelete} src={deleteImg} />
          ) : null}
            {isLoadingSpinnerDelete ? (
              <>
            <img style={{visibility: "hidden"}} onClick={handleDelete} src={deleteImg} />
            <LoadingBar type={"spinner-delete"} />
              </>
          ) : null}


          {!isLoadingSpinner ? (
            <>
              <img
                onClick={handleEdit}
                id="edit"
                src={editImg}
                style={readOnly ? { display: "none" } : { display: "block" }}
              />
              <img
                id="save"
                src={save}
                onClick={handleEdit}
                style={!readOnly ? { display: "none" } : { display: "block" }}
              />
            </>
          ) : null}
          {isLoadingSpinner ? <LoadingBar type={"spinner"} /> : null}
        </div>

        {/* <button onClick={() => setIsLoadingSpinner((state) => !state)}>CHANGE</button> */}
      </div>
    </div>
  );
};

export default Cards;
