import React, { useCallback, useEffect, useState } from "react";
import api from "./api/api";
import "./App.css";
import Cards from "./components/Cards";
import InputBase64 from "./components/InputBase64";
import LoadingBar from "./components/LoadingBar";
import TodoForm from "./components/TodoForm";
import uploadImage from "./img/uploadImage.svg";

const ImgHolder = () => {
  return (
    <div>
      <img src={uploadImage} />
    </div>
  );
};

const App = () => {
  const [getInputs, setGetInputs] = useState({});
  const [data, setData] = useState([]);
  const [response, setResponse] = useState({});
  const [isImgLoad, setIsImgLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [done, setDone] = useState("");

  //GET DATA!

  useEffect(() => {
    handleGetData();
    console.log(data);
  }, []);

  useEffect(() => {
    if (
      getInputs?.data?.title &&
      getInputs?.data?.description &&
      getInputs?.img64
    ) {
      saveData();
    }
  }, [getInputs]);

  useEffect(() => {
    if (response.status === 200) {
      setIsLoading(true);
      handleGetData();
      setGetInputs({});
      setIsImgLoad(false);
    }
  }, [response]);

  const handleFiles = (files) => {
    setGetInputs((state) => ({ ...state, img64: files.base64 }));
  };
  const submitHandler = async (data) => {
    setGetInputs((state) => ({ ...state, data }));
    console.log("bucle_submit_data");

    setDone("");
  };

  //GET DATA

  const handleGetData = useCallback(async () => {
    const response = await api.get("/");
    setData(response.data);
    if (response.status === 200) {
      setIsLoading(false);
    }
  });

  //SAVE DATA

  const saveData = async () => {
    console.log("in save");
    try {
      const payload = getInputs;
      const response = await api.post("/", payload);
      setResponse(response);
      console.log(response);
    } catch (err) {
      console.log(err);
    }

    console.log("bucle_save");
  };

  //DELETE DATA

  const deleteData = async (id) => {
    console.log("in delete");
    try {
      const response = await api.delete(`/${id}`);
      setResponse(response);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    console.log("bucle_delete");
  };

  //EDIT DATA

  const editData = async (body) => {
    console.log("in edit");
    try {
      const response = await api.put(`/${body.id}`, {
        body: body
      });
      setResponse(response);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    console.log("bucle_edit");
  };

  return (
    <div className="main">
      <div className="container">
        <h1 onClick={() => console.log(getInputs)}>Memorias</h1>
        {isLoading ? <LoadingBar type={"bar"} /> : null}
        <div className="grid">
          {data?.map((data) => (
            <Cards
              key={data._id}
              value={data}
              deleteData={deleteData}
              editData={editData}
              response={response}
            />
          ))}
        </div>
      </div>
      <div className="container-input">
        <div className="group-img">
          <img
            src={getInputs?.img64}
            alt=""
            onError={(event) => (event.target.style.display = "none")}
            className={
              Object.entries(getInputs).length === 0 ? "" : "imgLoaded"
            }
          />
          {Object.entries(getInputs).length === 0 && !isImgLoad ? (
            <ImgHolder />
          ) : null}

          <InputBase64
            setIsImgLoad={setIsImgLoad}
            onDone={handleFiles}
            multiple={false}
          />
        </div>
        <TodoForm submitHandler={submitHandler} />
      </div>
    </div>
  );
};

export default App;
