import type { Metadata } from "next";
import Auth from "./auth";

export const metadata = {
    title: "Oncampus",
    description: "Once a Buetian, always a Buetian",
};


export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {


    return (
        <>
            <Auth>
                {children}
            </Auth>
        </>
    )
}
