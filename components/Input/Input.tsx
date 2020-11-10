import React, { FC, useState, KeyboardEvent } from "react";
import { toast } from "react-toastify";
import styles from "./input.module.scss";

interface IInput {
  handleSearchInput: (input: string) => void;
}
const Input: FC<IInput> = ({ handleSearchInput }) => {
  const [input, setInput] = useState<string>("");

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleInput(input);
    }
  };
  const handleInput = (input: string) => {
    try {
      validateInput(input);
      handleSearchInput(input);
    } catch (e) {
      toast.error(e.message);
    }
  };
  const validateInput = (input: string) => {
    if (input.length === 0) throw new Error("Input cannot be empty!");
  };

  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
        className={styles.mainInput}
        placeholder="Search wikipedia"
      />
      <button onClick={() => handleInput(input)} className={styles.mainBtn}>
        Next
      </button>
    </div>
  );
};
export default Input;
