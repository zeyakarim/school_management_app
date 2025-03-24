"use client";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function useAuth(redirectTo = "/login") {
    const router = useRouter();
    const { authenticated, loading, user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!loading && !authenticated) {
            router.replace(redirectTo); // Use replace to prevent back navigation
        }
    }, [authenticated, loading, router, redirectTo]);

    return { authenticated, loading, user };
}
