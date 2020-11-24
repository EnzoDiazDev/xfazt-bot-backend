// eslint-disable-next-line @typescript-eslint/no-var-requires
if(process.env.NODE_ENV === "development") require("dotenv").config();
import lepp from "./server/Server";

class Main {
    public static main():void {
        lepp.run();
    }
}

Main.main();
