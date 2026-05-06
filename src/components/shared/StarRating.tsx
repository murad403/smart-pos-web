import { Star } from "lucide-react";

const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
                <Star
                    key={s}
                    size={15}
                    className={s <= rating ? "text-[#FF9E0C] fill-[#FF9E0C]" : "text-gray-300 fill-gray-300"}
                />
            ))}
        </div>
    )
}

export default StarRating;