import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Input from "../components/Input/Input";
import "react-toastify/dist/ReactToastify.css";
import ResultOutput from "../components/ResultOutput/ResultOutput";
import styles from "./indexPage.module.scss";

const IndexPage = () => {
  const [searchWord, setSearchWord] = useState<string>("");
  const [result, setResult] = useState<number>(0);
  const isFirstRun = useRef(true);

  const postSearchWord = () => {
    fetch("/api/topic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchWord),
    })
      .then((response) => response.json())
      .then((data) => {
        validateData(data);
        setResult(data);
      })
      .catch((e) => {
        toast.error(e.message);
        setResult(0);
      });
  };

  const validateData = (data: number | string) => {
    if (typeof data === "string") throw new Error(data);
  };
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    postSearchWord();
  }, [searchWord]);

  const handleSearchInput = (input: string) => {
    setSearchWord(input);
  };

  return (
    <div className={styles.wrapper}>
      <ResultOutput frequency={result} />
      <Input handleSearchInput={handleSearchInput} />
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default IndexPage;
