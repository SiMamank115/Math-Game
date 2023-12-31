import Layout from "@/components/layout";
import { useAppContext } from "@/context/AppContext";
import colors from "@/data/primary-colors.json";
import updateColor from "@/utilities/primary";
import { capitalize } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Tooltip } from "react-tooltip";
import uniqolor from "uniqolor";
export default function Home() {
    const { lang } = useAppContext();
    const router = useRouter();
    useEffect(() => {
        if (localStorage.primary && (localStorage.primary.startsWith("#") || document.querySelector(`#primary-${localStorage.primary}`))) {
            document.querySelector(`#primary-${localStorage.primary.startsWith("#") ? "rainbow" : localStorage.primary}`).checked = true;
        } else {
            document.querySelector("#primary-folly").checked = true;
        }
        if (localStorage.theme == "dark" && document.querySelector(`[value="dark"]`)) {
            document.querySelector(`[value="dark"]`).checked = true;
        } else {
            document.querySelector(`[value="light"]`).checked = true;
        }
        let radios = document.querySelectorAll('input[type=radio][name="primary-color"]');
        let themes = document.querySelectorAll('input[type=radio][name="theme-color"]');

        function changeHandler(event) {
            if (event.target.id == "primary-rainbow") return event.preventDefault();
            localStorage.primary = this.value;
            updateColor();
        }
        function randomize() {
            localStorage.primary = uniqolor.random({ saturation: 90, lightness: [40,50] }).color;
            updateColor();
        }
        function changeHandler2(event) {
            localStorage.theme = this.value;
            updateColor();
        }
        document.querySelector("#primary-rainbow").addEventListener("click",randomize)
        Array.prototype.forEach.call(radios, function (radio) {
            radio.addEventListener("change", changeHandler);
        });
        Array.prototype.forEach.call(themes, function (radio) {
            radio.addEventListener("change", changeHandler2);
        });
    }, []);
    return (
        <Layout>
            <div className="flex flex-col gap-y-6 items-center p-[--margin]">
                <div className="w-full text-center text-xl sm:text-2xl font-medium pt-8 text-onyx dark:text-anti-flash">
                    {lang?.settings?.[0] ?? "Primary Color :"}
                </div>
                <div className="flex w-full flex-wrap justify-center max-sm:gap-3 max-md:gap-5 gap-10">
                    {Object.keys(colors.data).map((e) => (
                        <input
                            data-tooltip-id="tooltip"
                            data-tooltip-content={capitalize(e.replaceAll("-", " "))}
                            value={e}
                            key={colors.data[e]}
                            id={"primary-" + e}
                            name="primary-color"
                            className={`picker`}
                            style={{ "--picker-color": colors.data[e] }}
                            type="radio"
                        />
                    ))}
                    <input
                        data-tooltip-id="tooltip"
                        data-tooltip-content="Randomize!"
                        key={"primary-rainbow"}
                        id={"primary-rainbow"}
                        name="primary-color"
                        className={`picker-rainbow`}
                        type="radio"
                    />
                    <Tooltip id="tooltip" />
                </div>
                <div className="w-full text-center text-xl sm:text-2xl font-medium pt-8 text-onyx dark:text-anti-flash">{lang?.settings?.[1] ?? "Theme :"}</div>
                <div className="flex w-full flex-wrap justify-center max-sm:gap-3 max-md:gap-5 gap-10">
                    <input value={"light"} name="theme-color" className={`theme-picker bg-anti-flash`} type="radio" />
                    <input value={"dark"} name="theme-color" className={`theme-picker bg-onyx`} type="radio" />
                </div>
                <div className="w-full text-center text-xl sm:text-2xl font-medium pt-8 text-onyx dark:text-anti-flash">
                    {lang?.settings?.[2] ?? "Language :"}
                </div>
                <div className="flex w-full flex-wrap justify-center max-sm:gap-3 max-md:gap-5 gap-10">
                    {router.locales.map((e) => (
                        <Link
                            href={"/settings"}
                            locale={e}
                            key={"locale-" + e}
                            className={`text-anti-flash dark:text-onyx bg-[--primary] dark:bg-[--primary-light] rounded-md button`}
                            type="radio"
                        >
                            {e}
                        </Link>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
