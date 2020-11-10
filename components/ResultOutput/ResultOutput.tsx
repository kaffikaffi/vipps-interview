import { time } from "console";
import React, { FC } from "react";
import CountUp from "react-countup";
import styles from "./resultOutput.module.scss";

interface IResultOutput {
  frequency: number;
}
const ResultOutput: FC<IResultOutput> = ({ frequency }) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.count}>
        {frequency !== 0 && (
          <CountUp start={0} end={frequency} duration={2.75} />
        )}
      </h2>
    </div>
  );
};
export default ResultOutput;
