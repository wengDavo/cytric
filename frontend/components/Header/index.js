import Image from "next/image";
import cube from "@/public/images/cube.png";
import CustomRainbowButton from "../CustomRainbowButton";

function Header() {
	return (
		<header className="border-b border-[#1F2937]">
			<nav className="flex justify-between items-center bg-black py-2 px-4 md:py-4 md:px-[104px]" >
				<figure>
					<Image
						src={cube}
						alt="cube icon"
						width={24}
						height={23}
					/>
				</figure>
				<CustomRainbowButton />
			</nav>
		</header>
	)
};

export default Header;
