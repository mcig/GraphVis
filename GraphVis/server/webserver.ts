import * as denoexpress from "https://raw.githubusercontent.com/NMathar/deno-express/master/mod.ts";

const testport = 3000;
const app = new denoexpress.App();

app.use(denoexpress.static_("../public"));
app.listen(testport);
console.log("My server is running :)))");
