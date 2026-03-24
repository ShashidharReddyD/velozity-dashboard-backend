import "dotenv/config";
import app from "./app";

const PORT = 5000;

console.log(process.env.JWT_SECRET); // now should work

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});