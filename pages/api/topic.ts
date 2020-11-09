import { NextApiRequest, NextApiResponse } from "next";

const API_URL =
  "https://en.wikipedia.org/w/api.php?action=parse&section=0&prop=text&format=json&page=";

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  const searchWord = _req.body;
  fetch(API_URL + searchWord)
    .then((response) => response.json())
    .then((data) => {
      const text = data.parse.text["*"];
      const pattern = new RegExp(searchWord, "gi");
      const matches = text.match(pattern);
      res.end(JSON.stringify(matches.length));
    });
};

export default handler;
