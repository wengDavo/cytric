import { pool } from "../configs/db.config.js";

export async function storeNftModel({ nft_name, nft_description, nft_logo_url, user_wallet_address }) {
	const query = `
			INSERT INTO nft (nft_name, nft_description, nft_logo_url, user_wallet_address) 
			VALUES ($1, $2, $3, $4) RETURNING *
	`;
	const { rows: newNft } = await pool.query(query, [
		nft_name,
		nft_description,
		nft_logo_url,
		user_wallet_address,
	]);
	return newNft[0];
};

export async function getNftByNameModel(nft_name) {
	const query = `SELECT nft_name FROM nft WHERE LOWER(nft_name) = LOWER($1)`;
	const { rows: nft } = await pool.query(query, [nft_name]);
	return nft[0];
};

export async function getNftByIdModel(nft_id) {
	const query = `SELECT * FROM nft WHERE nft_id = $1`;
	const { rows: nft } = await pool.query(query, [nft_id]);
	return nft[0];
}

export async function getNftByWalletAddressModel(user_wallet_address){
	const query = `SELECT * FROM nft WHERE user_wallet_address = $1`;
	const { rows: nfts } = await pool.query(query, [user_wallet_address]);
	return nfts;
}
