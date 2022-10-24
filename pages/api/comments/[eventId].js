import { addComment, getComments } from "../../../helpers/api-util";
async function handler(req, res) {
  const { eventId } = req.query;
  if (req.method === "GET") {
    const comments = getComments(eventId);
    res.status(200).json({ comments });
  }
  if (req.method === "POST") {
    const { name, email, text } = req.body;
    console.log(await addComment(eventId, { name, email, text }));
    res.status(201).json({ message: "success" });
  }
}

export default handler;
