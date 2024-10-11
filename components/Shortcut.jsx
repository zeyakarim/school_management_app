import { shortcutBgColor } from "@/lib/data";
import Link from "next/link";

const Shortcut = ({ shortcutItems, id }) => {
    return (
        <div className="shadow-small bg-white rounded-md p-4">
            <p className="font-semibold">Shortcuts</p>
            <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
                {shortcutItems?.map((shortcut, index) => (
                    <Link
                        className={shortcut?.classes}
                        style={{ backgroundColor: shortcutBgColor[(index + 1)]}}
                        href={`${shortcut?.url}=${id}`}
                        key={shortcut?.title}
                    >
                        {shortcut?.title}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Shortcut;