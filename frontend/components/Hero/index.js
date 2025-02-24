import Image from "next/image";
import rocket from "@/public/images/rocket.png";
import play from "@/public/images/play.png";

function Hero() {
	return (
		<section className="text-center grid gap-y-5 md:gap-y-10">
			<h3 className="inline-grid text-2xl font-bold md:text-6xl md:leading-[60px]">
				<span>Discover & Collect</span>
				<span>Extraordinary NFTs</span>
			</h3>
			<p className="text-[#D1D5DB] text-sm md:text-xl">
				Enter the world of digital art and collectibles. Explore unique NFTs created by artists worldwide.
			</p>
			<div className="flex items-center justify-center gap-2">
				<button className="flex items-center justify-center p-2 md:p-4 bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] rounded-xl gap-2 transition transform active:scale-90">
					<Image src={rocket} alt="rocket icon" width={16} height={16} />
					<p>Start Creating</p>
				</button>
				<button className="flex items-center justify-center p-2 md:p-4 border border-[#374151] bg-[#1F293780] rounded-xl gap-2 transition transform active:scale-90">
					<Image src={play} alt="play icon" width={16} height={16} />
					<p>Watch Demo</p>
				</button>
			</div>
		</section>
	);
}

export default Hero;

