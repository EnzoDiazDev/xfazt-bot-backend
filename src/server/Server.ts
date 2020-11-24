import Lepp from "@lottielabs/lepp";
import ErrorRoutes from "./ErrorRoutes";
import API from "../extensions/API";

const PORT = process.env.PORT as unknown as number || 3000;
const lepp = new Lepp(PORT);

lepp.use_helmet()
    .use_bodyparser()
    .use_morgan("tiny");

lepp.add_extension(API);

lepp.use(ErrorRoutes.error404)
    .use(ErrorRoutes.error500);

export default lepp;
