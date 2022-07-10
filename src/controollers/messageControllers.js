export const handleHome = (req, res) => {
  const fakeMessages = [
    { userName: "minho", text: "how are u?" },
    { userName: "bot", text: "No andswer" },
  ];

  return res.render("home", { pageTitle: "Home", fakeMessages });
};

export const getMessage = (req, res) => {
  res.send("getMessage~");
};
export const postMessage = (req, res) => {
  res.send("postMessage~");
};
