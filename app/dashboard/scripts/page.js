import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import Scripts from "./scripts";

export default function ScriptsPage() {
    // Get cookies on the server
    const cookieStore = cookies();
    const token = cookieStore.get("bstreams")?.value;

    if (!token) {
        // Redirect if no token exists
        redirect("/login");
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        redirect("/login");
    }

    // Pass user data to the client component
    return <Scripts user={decoded} />;
}
