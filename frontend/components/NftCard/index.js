import Image from "next/image";

function NftCard({ nft_image_url, nft_name, nft_description }) {
	return (
		<figure className="border border-[#1F2937] bg-[#11182780] rounded-xl flex-shrink-0 w-96">
			<div>
				<Image
					src={nft_image_url}
					layout="responsive"
					alt="NFT image"
					width={16}
					height={16}
					className="rounded-t-xl object-cover"
				/>
			</div>
			<figcaption className="p-4">
				<p className="font-bold text-white">{nft_name}</p>
				<p className="text-sm text-gray-400 leading-tight">
					{nft_description}
				</p>
			</figcaption>
		</figure>
	);
}

export default NftCard;

