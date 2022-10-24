function helper(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;
    console.log(email);
    return res.status(200).json({ message: "Successfully !" });
  }
}

export default helper;
