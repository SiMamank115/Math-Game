import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { MdSignalWifiOff } from "react-icons/md";
import { toast } from "react-toastify";
export default function Account({ className }) {
    const { user, onlineStatus, lang } = useAppContext();
    const router = useRouter();
    return onlineStatus ? (
        user ? (
            <Link href={"/profile"} className={className + " flex cursor-pointer !rounded-full"}>
                <Image
                    priority
                    className={"hover:ring-4 rounded-full active:ring-0 ring-[rgba(var(--primary-rgb),.3)] transition" + (router.route.includes("/profile") ? " ring-4" : "")}
                    src={user?.photoURL ?? "/user.png"}
                    alt="user profile"
                    width={40}
                    height={40}
                />
            </Link>
        ) : (
            <Link href={"/auth/signin"} className={className + " bg-[--primary] nav-link"}>
                <span className="max-lg:hidden">{lang?.auth?.[0] ?? "Login"}</span>
                <FaArrowRightFromBracket className="max-lg:text-xl lg:hidden" />
            </Link>
        )
    ) : (
        <MdSignalWifiOff
            onClick={() => toast("You've been disconnected!", { type: "error", theme: localStorage.theme })}
            className={"dark:text-[--primary-light] text-[--primary] text-4xl transition cursor-pointer duration-500 rounded-full p-1"}
        />
    );
}
