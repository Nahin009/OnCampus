"use server";
import { getAccessToken, getIdToken } from "@/utils/sessionTokenAccessor";

export default async function POST_custom(path: string, body: any) {
    "use server";
    const token = await getAccessToken();
    if (!token) {
        return null;
    }
    try {
        const res = await fetch(`http://localhost:5000/api/${path}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                authorization: token ? token : "",
            },
            body: JSON.stringify(body),
            cache: "no-store",
        })
        if (res.status == 500) {
            console.log(await res.json());
            const data = await res.json();
            return {
                message: data.message,
                success: false
            };
        }
        if (res.status != 200) {
            console.log(await res.json());
            return null;
        }
        const data = await res.json();
        console.log(data);
        return data;
    }
    catch (err) {
        console.log(err);
        return null;
    };
}
