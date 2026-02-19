import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express() ; 

app.use(cors({
    origin : process.env.CROSS_ORIGIN,
    credentials : true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true , limit :"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// routes import
import userRouter from "./routes/user.routes.js"

// routes declaration
app.use("/api/v1/users" , userRouter) // https://localhost:8000/api/v1/users

export {app}

// Why {router1} Didn't Work + Export Differences
// The router1 Problem:

// In user.routes.js, you had:

// The issue: router.route() returns a Route object (for that one route), not the Router instance. When you mount a Route instead of a Router in app.js, Express can't properly handle it—it expects the full router object.

// Named vs. Default Export
// export { user } (Named Export)
// Exports an item by name
// Must be imported with the same name in curly braces
// You can have multiple named exports in one file
// Import syntax:
// export default user (Default Export)
// Exports one default value per file
// Imported without curly braces and can use any name
// Cleaner for single main exports (like a router)
// Import syntax:
// Mismatch in Your Original Code
// user.routes.js had:

// app.js tried:

// But router1 was not the router—it was a Route object! So even though the names matched, the object type was wrong.

// The Fix
// user.routes.js now has:

// app.js now has:

// Now the actual Router object is exported and mounted correctly. Test it:

// Then in another terminal:

// You should see: {"message":"ok"}