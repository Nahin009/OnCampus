"use client";

import POST from "@/server_actions/POST";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

import ProfilePage from "@/components/ProfilePage";
import MyProfilePage from "@/components/MyProfilePage";

export default function Profile({ params }: { params: { email: string } }) {
    const { data: session, status } = useSession();

    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState(null);
    const [requestStatus, setRequestStatus] = useState("loading");

    async function getUser() {
        console.log(decodeURIComponent(params.email));
        const user = await POST("user/getUser", { email: decodeURIComponent(params.email) });
        if (!user) {
            setRequestStatus("error");
            return;
        }
        setUser(user);
        setRequestStatus("success");
    }

    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            signOut({ callbackUrl: "/" });
            return;
        }
        if (session?.error === "RefreshAccessTokenError") {
            signOut({ callbackUrl: "/" });
            return;
        }
        console.log(session);
        if (session?.roles.includes("admin")) {
            setIsAdmin(true);
        }

        if (requestStatus === "loading") {
            getUser();
        }
    }, [session, status]);

    if (status === "loading" || requestStatus === "loading") return <div>Loading...</div>;

    if (!session) {
        return (
            <>
                <div className="flex items-center justify-center h-screen">
                    <h1 className="text-3xl">You are not logged in</h1>
                </div>
            </>
        );
    }


    if (!user) {
        return (
            <>
                <div className="flex items-center justify-center h-screen">
                    <h1 className="text-3xl">User not found</h1>
                </div>
            </>
        );
    }

    if (session.user?.email == user.email) {
        return (
            <MyProfilePage user={user} />
        )
    }

    if (!isAdmin) {
        return (
            < ProfilePage user={user} admin={false} />
        );
    } else {
        return (
            < ProfilePage user={user} admin={true} />
        );
    }
}