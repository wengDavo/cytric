"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import NftCard from "../NftCard";

const API_BASE_URL = "http://localhost:8080/api/v1/nfts";

function NftGallery() {
	const { address: walletAddress, isConnected } = useAccount();
	const [nfts, setNfts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!walletAddress) return;

		const fetchNfts = async () => {
			try {
				const response = await fetch(`${API_BASE_URL}?user_wallet_address=${walletAddress}`);
				const data = await response.json();
				if (!response.ok) console.log(data.message || "Failed to fetch NFTs");
				setNfts(data.nfts || []);
			} catch (error) {
				console.error("Error fetching NFTs:", error);
				setNfts([]);
			} finally {
				setLoading(false);
			}
		};

		fetchNfts();
	}, [walletAddress]);

	return (
		<section className="space-y-4 py-2 px-4 md:py-4 md:px-[104px] md:mt-14">
			<h3 className="font-bold text-2xl leading-6">Your NFT Gallery</h3>

			{loading ? (
				<p className="text-gray-400">Loading NFTs...</p>
			) : !isConnected ? (
				<p className="text-gray-400">Please connect your wallet to view NFTs.</p>
			) : nfts.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
					{nfts.map((nft, idx) => (
						<NftCard
							key={idx}
							nft_image_url={nft.nft_logo_url || "/images/default_nft.png"}
							nft_name={nft.nft_name}
							nft_description={nft.nft_description}
						/>
					))}
				</div>
			) : (
				<p className="text-gray-400">No NFTs found, please mint your first one using the widget above.</p>
			)}
		</section>
	);
}

export default NftGallery;

