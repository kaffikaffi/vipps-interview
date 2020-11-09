import Link from "next/link";
import { useState } from "react";
import Layout from "../components/Layout";

const IndexPage = () => {
  const [searchWord, setSearchWord] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const postSearchWord = () => {
    fetch("/api/topic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchWord),
    })
      .then((response) => response.json())
      .then((data) => setResult(data));
  };

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Next.js 👋</h1>
      <input
        type="text"
        name=""
        id=""
        onChange={(e) => setSearchWord(e.target.value)}
      />
      <button onClick={postSearchWord}>CLICK</button>
      <h2>result: {result}</h2>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </Layout>
  );
};

export default IndexPage;
