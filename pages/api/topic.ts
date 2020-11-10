import { NextApiRequest, NextApiResponse } from "next";

const API_URL =
  "https://en.wikipedia.org/w/api.php?action=parse&section=0&prop=text&format=json&page=";

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  const searchWord = _req.body;
  fetch(API_URL + searchWord)
    .then((response) => {
      if (!response.ok) {
        res.status(400);
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      validateData(data);
      const text = data.parse.text["*"];
      const pattern = new RegExp(searchWord, "gi");
      const matches = text.match(pattern);
      res.status(200);
      res.end(
        JSON.stringify(
          matches !== null
            ? matches.length
            : "The word is never used in the article"
        )
      );
    })
    .catch((e) => {
      res.end(JSON.stringify(e.message));
    });
};
const validateData = (data: any) => {
  if (data.error) throw new Error(data.error.info);
};

export default handler;
