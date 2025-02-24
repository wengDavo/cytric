import correct from "@/public/images/correct.png";
import share from "@/public/images/share.svg";
import cube from "@/public/images/cube.svg";
import Image from "next/image";

function MintSuccessful({ nft, onMintAnother }) {
	return (
		<article className="bg-[#11182780] border border-[#10B981] p-4 md:p-6 grid gap-y-5 rounded-2xl md:mx-auto md:w-[578px]">
			<figure className="grid place-content-center gap-y-3">
				<Image src={correct} alt="cube icon" width={80} height={80} className="mx-auto" />
				<figcaption className="text-center grid gap-y-3">
					<p className="font-bold text-2xl text-[#10B981]">NFT Minted Successfully!</p>
					<p className="text-[#9CA3AF]">Your NFT has been created and added to your collection</p>
				</figcaption>
			</figure>
			<figure className="bg-[#1F293780] p-4 rounded-xl grid gap-y-3">
				<Image src={nft.image} layout="responsive" alt="NFT image" width={80} height={80} className="rounded-t-xl object-cover" />
				<figcaption>
					<p className="text-[#E5E7EB]">NFT Name</p>
					<p className="font-bold">{nft.name}</p>
				</figcaption>
				<figcaption>
					<p className="text-[#E5E7EB]">Description</p>
					<p className="font-bold">{nft.description}</p>
				</figcaption>
				<figcaption>
					<p className="text-[#E5E7EB]">NFT ID</p>
					<p className="text-[#8B5CF6]">#{nft.id}</p>
				</figcaption>
			</figure>
			<div className="p-4 grid grid-cols-2 gap-x-2 md:gap-x-4">
				<button className="bg-[#1F2937] hover:opacity-80 rounded-lg flex text-[#E5E7EB] p-2 items-center justify-center gap-x-2 transition transform active:scale-90">
					<Image src={share} alt="share icon" width={16} height={16} className="text-[#E5E7EB]" />
					<span>Share</span>
				</button>
				<button onClick={onMintAnother} className="bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] hover:opacity-80 rounded-lg flex text-[#E5E7EB] p-2 items-center justify-center gap-x-2 transition transform active:scale-90">
					<Image src={cube} alt="cube icon" width={16} height={16} className="text-[#E5E7EB]" />
					<span>Mint Another</span>
				</button>
			</div>
		</article>
	);
}

export default MintSuccessful;

