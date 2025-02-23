CREATE TABLE nft (
	nft_id SERIAL PRIMARY KEY,
	nft_name VARCHAR(255) NOT NULL,
	nft_description TEXT NOT NULL,
	nft_logo_url TEXT NOT NULL,
	user_wallet_address VARCHAR(255) NOT NULL
);
