import { storeNftService, getNftByIdService, getNftByWalletAddressService } from "../services/nfts.services.js";

export async function storeNft(req, res) {
	const { nft_id, nft_name, nft_description, nft_logo_url, user_wallet_address } = req.body;

	if (!nft_id || !nft_name || !nft_description || !nft_logo_url || !user_wallet_address) {
		return res.status(400).json({ message: "All fields are required" });
	}

	try {
		const nft = await storeNftService({ nft_id, nft_name, nft_description, nft_logo_url, user_wallet_address });
		return res.status(201).json({ message: "NFT created successfully", nft: nft });

	} catch (error) {
		if (error.message === "NFT EXISTS") {
			return res.status(409).json({ message: error.message });
		}
		console.error("Error:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
}

export async function getNft(req, res) {
	const { nft_id } = req.params;

	if (!nft_id) {
		return res.status(400).json({ message: "NFT ID is required" });
	}
	if (!Number.isInteger(+nft_id)) {
		return res.status(400).json({ message: "NFT ID is not a valid integer" });
	}

	try {
		const nft = await getNftByIdService(nft_id);
		return res.status(200).json({ message: "NFT FOUND", nft: nft });

	} catch (error) {
		if (error.message === "NFT DOES NOT EXIST") {
			return res.status(404).json({ message: error.message });
		}
		console.error("Error:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
}


export async function getNftGallery(req, res) {
	const { user_wallet_address } = req.query;

	if (!user_wallet_address) {
		return res.status(400).json({ message: "NFT WALLET is required" });
	}

	try {
		const nft = await getNftByWalletAddressService(user_wallet_address);
		return res.status(200).json({ message: "GALLERY FOUND", nfts: nft });

	} catch (error) {
		if (error.message === "NFT WALLET DOES NOT EXIST") {
			return res.status(404).json({ message: error.message });
		}
		console.error("Error:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
}

