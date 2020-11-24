// eslint-disable-next-line @typescript-eslint/no-var-requires
if(process.env.NODE_ENV === "development") require("dotenv").config();
import Lepp from "@lottielabs/lepp";
import ErrorRoutes from "./utils/ErrorRoutes";
import API from "./extensions/API";


class Main {
    private static PORT = process.env.PORT as unknown as number || 3000
    private static lepp = new Lepp(Main.PORT)

    public static main():void {
        this.lepp.use_helmet()
            .use_bodyparser()
            .use_morgan("tiny");

        this.lepp.add_extension(API);

        this.lepp.use(ErrorRoutes.error404)
            .use(ErrorRoutes.error500);

        this.lepp.run();
    }
}

Main.main();
