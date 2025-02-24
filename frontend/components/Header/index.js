import Image from "next/image";
import cube from "@/public/images/cube.png";
import wallet from "@/public/images/wallet.png";

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
				<button className="p-1 px-3 md:p-2 md:px-4 text-white flex gap-1 bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] rounded-full transition transform active:scale-90">
					<Image
						src={wallet}
						alt="wallet icon"
						width={16}
						height={16}
					/>
					<p>Connect Wallet</p>
				</button>
			</nav>
		</header>
	)
};

export default Header;
