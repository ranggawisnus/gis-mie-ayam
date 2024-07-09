import React from "react";
import { FaStar } from "react-icons/fa";

const RatingStar = ({ rating }) => {
    const stars = [1, 2, 3, 4, 5];
    const renderStars = () => {
        const ratingString = rating.toFixed(1);
        const ratingParts = ratingString.split(".");
        const fullStars = parseInt(ratingParts[0]);
        const fraction = parseInt(ratingParts[1]);
        const starIcons = [];
        for (let i = 0; i < stars.length; i++) {
            if (stars[i] <= fullStars) {
                starIcons.push(
                    <FaStar key={stars[i]} size={18} color="#ffc107" />
                );
            } else if (stars[i] === fullStars + 1 && fraction > 0) {
                starIcons.push(
                    <div key={stars[i]} style={{ position: "relative" }}>
                        <FaStar size={18} color="#e4e5e9" />
                        <FaStar
                            size={18}
                            color="#ffc107"
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                clipPath: `polygon(0 0, ${fraction}0% 0, ${fraction}0% 100%, 0% 100%)`,
                            }}
                        />
                    </div>
                );
            } else {
                starIcons.push(
                    <FaStar key={stars[i]} size={18} color="#e4e5e9" />
                );
            }
        }
        return starIcons;
    };
    return (
        <div className="flex justify-center items-center">
            <p className="mt-1 mr-2">{rating}</p>
            <div className="flex">{renderStars()}</div>
        </div>
    );
};

export default RatingStar;
