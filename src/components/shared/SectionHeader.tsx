import { Section } from "@/type/all.type";
import { Plus } from "lucide-react";


const SectionHeader = ({ section, onAddItem }: { section: Section; onAddItem: () => void }) => {
    return (
        <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
            <h3 className="text-base md:text-lg font-bold text-gray-900">
                {section.title} | Layout Type: {section.layoutType}
            </h3>
            <div className="flex items-center gap-2">
                <button
                    onClick={onAddItem}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-all whitespace-nowrap"
                >
                    <Plus size={12} />
                    Add Item
                </button>
            </div>
        </div>
    )
}
export default SectionHeader;