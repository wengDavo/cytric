"use client";

import { useState } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import Image from "next/image";
import cube from "@/public/images/cube.svg";
import contractABI from "@/utils/abiFile.json";
import MintSuccessful from "../MintSuccessful";

const CONTRACT_ADDRESS = "0x743f49311a82fe72eb474c44e78da2a6e0ae951c";
const API_BASE_URL = `https://cytric-t79d.onrender.com/api/v1/nfts`;
const DEFAULT_IMAGE_URL = "/images/bored.jpg";

function MintForm() {
	const { address: walletAddress } = useAccount();
	const [nftName, setNftName] = useState("");
	const [description, setDescription] = useState("");
	const [imageURL, setImageURL] = useState("");
	const [isMinting, setIsMinting] = useState(false);
	const [isMinted, setIsMinted] = useState(false);
	const [mintedNft, setMintedNft] = useState(null);

	// Read contract to check if an ID exists
	const { refetch } = useReadContract({
		address: CONTRACT_ADDRESS,
		abi: contractABI,
		functionName: "checkId",
		args: [BigInt(0)],
		query: { enabled: false },
	});

	const { writeContract } = useWriteContract();

	const generateUniqueId = async () => {
		let id;
		let exists = true;

		while (exists) {
			id = Math.floor(Math.random() * 1000000);
			const result = await refetch({ args: [BigInt(id)] });
			console.log("result", result)
			exists = !result?.data;
		}

		return id;
	};

	// Store NFT metadata in the API
	const storeNftMetadata = async (id) => {
		if (!walletAddress) return null;

		const finalImageURL = imageURL.trim() || DEFAULT_IMAGE_URL;

		try {
			const response = await fetch(API_BASE_URL, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					nft_id: id,
					nft_name: nftName,
					nft_description: description,
					nft_logo_url: finalImageURL,
					user_wallet_address: walletAddress,
				}),
			});

			const data = await response.json();
			if (!response.ok) {
				alert(data.message || "Failed to store NFT metadata")
				return
			}

			return data;
		} catch (error) {
			console.error("Error storing NFT metadata:", error);
			return null;
		}
	};

	// Mint NFT function
	const handleMint = async (e) => {
		e.preventDefault();
		setIsMinting(true);

		if (!walletAddress) {
			alert("Please connect your wallet before minting.");
			setIsMinting(false);
			return;
		}

		const id = await generateUniqueId();
		const storedNft = await storeNftMetadata(id);

		if (!storedNft) {
			alert("Failed to store NFT metadata.");
			setIsMinting(false);
			return;
		}

		const metadataUrl = `${API_BASE_URL}/${id}`;

		try {
			writeContract({
				address: CONTRACT_ADDRESS,
				abi: contractABI,
				functionName: "mint",
				args: [BigInt(id), metadataUrl],
			});

			alert(`NFT with ID ${id} minted successfully!`);

			setMintedNft({
				name: nftName,
				description,
				id,
				image: imageURL || DEFAULT_IMAGE_URL,
			});
			setIsMinted(true);

			// Reset form fields
			setNftName("");
			setDescription("");
			setImageURL("");
		} catch (error) {
			console.error("Error minting NFT:", error);
			alert("Failed to mint NFT.");
		}

		setIsMinting(false);
	};

	// If minting was successful, show success screen
	if (isMinted && mintedNft) {
		return <MintSuccessful nft={mintedNft} onMintAnother={() => setIsMinted(false)} />;
	}

	return (
		<form onSubmit={handleMint} className="bg-[#11182780] border border-[#1F2937] p-4 md:p-6 grid gap-y-5 rounded-2xl md:mx-auto md:w-[578px]">
			<h3 className="font-bold text-2xl leading-7 flex rounded-2xl">Mint Your NFT</h3>
			<article className="grid gap-y-4">
				<div className="grid gap-y-1">
					<label className="p-[2px] text-[#9CA3AF] text-sm">NFT Name</label>
					<input type="text" className="border border-[#374151] outline-none bg-[#1F2937] p-2 rounded-[8px]" value={nftName} onChange={(e) => setNftName(e.target.value)} required />
				</div>
				<div className="grid gap-y-1">
					<label className="p-[2px] text-[#9CA3AF] text-sm">Description</label>
					<textarea rows={3} className="border border-[#374151] outline-none bg-[#1F2937] p-2 rounded-[8px] resize-none" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
				</div>
				<div className="grid gap-y-1">
					<label className="p-[2px] text-[#9CA3AF] text-sm">Image URL</label>
					<input type="text" className="border border-[#374151] outline-none bg-[#1F2937] p-2 rounded-[8px]" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
				</div>
			</article>
			<button type="submit" className="bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] rounded-lg flex text-[#E5E7EB] p-3 items-center justify-center gap-x-2" disabled={isMinting}>
				<Image src={cube} alt="cube icon" width={16} height={16} />
				{isMinting ? "Minting..." : "Mint NFT"}
			</button>
		</form>
	);
}

export default MintForm;

