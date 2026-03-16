import { Barlow_Condensed } from "next/font/google";
import { motion } from "motion/react";

const barlow = Barlow_Condensed({ subsets: ["latin"], weight: ["700"] });

type Props = {
    data: any;
};

const item = {
    hidden: {
        y: "100%",
        transition: { ease: [0.455, 0.03, 0.515, 0.955] as [number, number, number, number], duration: 0.85 },
    },
    visible: {
        y: 0,
        transition: { ease: [0.455, 0.03, 0.515, 0.955] as [number, number, number, number], duration: 0.75 },
    },
};

const AnimatedText = ({
    data,
    className,
    id,
}: {
    data?: string;
    className?: string;
    id: string;
}) => {
    return (
        <span style={{ overflow: "hidden", display: "inline-block" }}>
            <motion.p className={className} variants={item} key={id + (data ?? "")}>
                {data}
            </motion.p>
        </span>
    );
};

function OtherInfo({ data }: Props) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.08 }}
            className="flex flex-col"
        >
            {/* Categoría / región */}
            <AnimatedText
                id="category"
                className="mb-3 text-xs font-medium uppercase tracking-[3px] text-white/80"
                data={data?.category ?? data?.location}
            />
            {/* Título principal — fuente condensada bold */}
            <AnimatedText
                id="title"
                className={`${barlow.className} text-[4.5rem] font-bold uppercase leading-[0.88] tracking-tight text-white md:text-[6rem] lg:text-[7.5rem]`}
                data={data?.title}
            />
            {/* Descripción */}
            <AnimatedText
                id="description"
                className="mt-4 max-w-xs text-sm leading-relaxed text-white/70"
                data={data?.description}
            />
        </motion.div>
    );
}

export default OtherInfo;
