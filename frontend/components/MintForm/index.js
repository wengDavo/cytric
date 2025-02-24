"use client";

import { useState } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import Image from "next/image";
import cube from "@/public/images/cube.svg";
import contractABI from "@/utils/abiFile.json";

const CONTRACT_ADDRESS = "0x743f49311a82fe72eb474c44e78da2a6e0ae951c";
const API_BASE_URL = `https://cytric-t79d.onrender.com/api/v1/nfts`;
const DEFAULT_IMAGE_URL = "/images/bored.jpg";

function MintForm() {
	const { address: walletAddress } = useAccount();
	const [nftName, setNftName] = useState("");
	const [description, setDescription] = useState("");
	const [imageURL, setImageURL] = useState("");
	const [isMinting, setIsMinting] = useState(false);
	const [nftId, setNftId] = useState(null);

	const { data: exists } = useReadContract({
		abi: contractABI,
		address: CONTRACT_ADDRESS,
		functionName: "checkId",
		args: [BigInt(1)],
		query: { enabled: !!walletAddress },
	});

	const { writeContract } = useWriteContract();

	const generateRandomId = () => Math.floor(Math.random() * 1000000);

	const storeNftMetadata = async (id) => {
		if (!walletAddress) {
			console.error("No wallet connected");
			return null;
		}

		const finalImageURL = imageURL.trim() || DEFAULT_IMAGE_URL; // Use default if empty

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
			if (!response.ok) throw new Error(data.message || "Failed to store NFT metadata");

			console.log("NFT metadata stored successfully:", data);
			return data;
		} catch (error) {
			console.error("Error storing NFT metadata:", error);
			return null;
		}
	};

	const handleMint = async (e) => {
		e.preventDefault();
		setIsMinting(true);

		if (!walletAddress) {
			alert("Please connect your wallet before minting.");
			setIsMinting(false);
			return;
		}

		let id = generateRandomId();
		setNftId(id);
		console.log("Generated unique NFT ID:", id);

		const storedNft = await storeNftMetadata(id);
		if (!storedNft) {
			alert("Failed to store NFT metadata. Please try again.");
			setIsMinting(false);
			return;
		}

		const metadataUrl = `${API_BASE_URL}/${id}`;
		try {
			const response = await fetch(metadataUrl);
			if (!response.ok) throw new Error("Failed to fetch metadata URL");

			console.log("Fetched Metadata URL:", metadataUrl);

			writeContract({
				address: CONTRACT_ADDRESS,
				abi: contractABI,
				functionName: "mint",
				args: [BigInt(id), metadataUrl],
			});

			console.log("NFT minted successfully! waiting for approval");
			alert(`NFT with ID ${id} minted successfully!`);

			// Reset form after successful mint
			setNftName("");
			setDescription("");
			setImageURL("");
		} catch (error) {
			console.error("Error minting NFT:", error);
			alert("Failed to mint NFT. Check the console for details.");
		}

		setIsMinting(false);
	};

	return (
		<form
			onSubmit={handleMint}
			className="bg-[#11182780] border border-[#1F2937] p-4 md:p-6 grid gap-y-5 rounded-2xl md:mx-auto md:w-[578px]"
		>
			<h3 className="font-bold text-2xl leading-7 flex rounded-2xl">Mint Your NFT</h3>
			<article className="grid gap-y-4">
				<div className="grid gap-y-1">
					<label className="p-[2px] text-[#9CA3AF] text-sm">NFT Name</label>
					<input
						type="text"
						className="border border-[#374151] outline-none bg-[#1F2937] p-2 rounded-[8px] placeholder:text-[#ADAEBC]"
						name="nft_name"
						placeholder="Enter NFT name"
						value={nftName}
						onChange={(e) => setNftName(e.target.value)}
						required
					/>
				</div>
				<div className="grid gap-y-1">
					<label className="p-[2px] text-[#9CA3AF] text-sm">Description</label>
					<textarea
						rows={3}
						className="border border-[#374151] outline-none bg-[#1F2937] p-2 rounded-[8px] placeholder:text-[#ADAEBC] resize-none"
						name="nft_description"
						placeholder="Describe your NFT"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
					></textarea>
				</div>
				<div className="grid gap-y-1">
					<label className="p-[2px] text-[#9CA3AF] text-sm">Image URL</label>
					<input
						type="text"
						className="border border-[#374151] outline-none bg-[#1F2937] p-2 rounded-[8px] placeholder:text-[#ADAEBC]"
						name="nft_image_url"
						placeholder="Enter image URL (optional)"
						value={imageURL}
						onChange={(e) => setImageURL(e.target.value)}
					/>
				</div>
				<div className="grid gap-y-1">
					<label className="p-[2px] text-[#9CA3AF] text-sm">Wallet Address</label>
					<input
						type="text"
						className="border border-[#374151] outline-none bg-[#1F2937] p-2 rounded-[8px] placeholder:text-[#ADAEBC]"
						value={walletAddress || "Connect wallet to fetch address"}
						readOnly
						disabled
					/>
				</div>
			</article>
			<button
				type="submit"
				className="bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] hover:opacity-80 rounded-lg flex text-[#E5E7EB] p-3 items-center justify-center gap-x-2 transition transform active:scale-90"
				disabled={isMinting}
			>
				<Image src={cube} alt="cube icon" width={16} height={16} className="text-[#E5E7EB]" />
				{isMinting ? "Minting..." : "Mint NFT"}
			</button>
		</form>
	);
}

export default MintForm;

