const form = document.getElementById("#commentForm");
const input1 = document.getElementById("#commentInput1");
const input2 = document.getElementById("#commentInput2");
const inputSend = document.getElementById("#commentSend");

const handleSubmit = async (event) => {
  event.preventDefault();
  const username = input1.value;
  const text = input2.value;

  if (username === "") {
    return;
  }
  const response = await fetch("/textQuery", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, text }),
  });
};

form.addEventListener("submit", handleSubmit);
