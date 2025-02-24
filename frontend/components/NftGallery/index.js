import NftCard from "../NftCard";

function NftGallery() {
	const nftCardData = [
		{
			nft_image_url: "/images/nft_1.png",
			nft_name: "Cosmic Dreams #001",
			nft_description: "A journey through digital dimensions"
		},
		{
			nft_image_url: "/images/nft_2.png",
			nft_name: "Neo Genesis #002",
			nft_description: "Digital evolution manifested"
		},
		{
			nft_image_url: "/images/nft_3.png",
			nft_name: "Digital Horizon #003",
			nft_description: "Where reality meets digital art"
		},
	];

	return (
		<section className="space-y-4 py-2 px-4 md:py-4 md:px-[104px] md:mt-14">
			<h3 className="font-bold text-2xl leading-6">Your NFT Gallery</h3>
			<article className="flex gap-4 overflow-x-auto p-2">
				{nftCardData.map((nft_card, idx) => (
					<NftCard key={idx} {...nft_card} />
				))}
			</article>
		</section>
	);
}

export default NftGallery;

