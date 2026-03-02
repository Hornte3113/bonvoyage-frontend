import React from "react";
import { motion } from "motion/react";



type Props = {
    data: any;
};

const item = {
    hidden: {
        y: "100%",
         transition: {ease: [0.455, 0.03, 0.515, 0.955] as [number, number, number, number], duration: 0.85},
         },
         visible: {
            y: 0,
            transition: {ease: [0.455, 0.03, 0.515, 0.955] as [number, number, number, number], duration: 0.75},
         },

    
};

const AnimatedText = ({
    data, className, id,
 }: {
    data?: string;
    className?: string;
    id: string;
    }) => {
    return (
        <span
        style={{
            overflow: "hidden",
            display: "inline-block",
        }}
        >
            <motion.p className={` ${className}`} variants={item} key={id + (data ?? "")}>
                {data}
            </motion.p>
        </span>
);
};

function OtherInfo({ data }: Props) {
return(
    <motion.div initial="hidden" animate={"visible"} className=" flex flex-col">
        <AnimatedText
        id="location"
        className=" spacing overflow-hidden text-[#D5D5D6]"
        data={data?.location}
        />
        <AnimatedText
        id="description"
        className= "text-xs text-[#D5D5D6]"
        data={data?.description}
        />
    </motion.div>
);
}

export default OtherInfo;