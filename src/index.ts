import app from "./server";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server is listening at http://localhost:${PORT}`);
});
