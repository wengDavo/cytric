import { getNftByNameModel, storeNftModel, getNftByIdModel, getNftByWalletAddressModel } from "../models/nfts.models.js";

export async function storeNftService(nftData) {
	try {
		const existingNft = await getNftByNameModel(nftData.nft_name);

		if (existingNft) {
			throw new Error("NFT EXISTS");
		}

		const newNft = await storeNftModel(nftData);
		return newNft;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("DATABASE_ERROR");
	}
}

export async function getNftByIdService(nft_id) {
	const nft = await getNftByIdModel(nft_id);

	if (!nft) {
		throw new Error("NFT DOES NOT EXIST");
	}

	return nft;
}

export async function getNftByWalletAddressService(user_wallet_address) {
	const nfts = await getNftByWalletAddressModel(user_wallet_address);
	console.log("empty", nfts);

	if (!nfts || nfts.length === 0) {
		throw new Error("NFT WALLET DOES NOT EXIST");
	}

	return nfts;
}
