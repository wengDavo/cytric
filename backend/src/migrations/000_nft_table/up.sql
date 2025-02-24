CREATE TABLE nft (
    id SERIAL PRIMARY KEY,
    nft_id INT UNIQUE NOT NULL,
    nft_name VARCHAR(255) NOT NULL,
    nft_description TEXT NOT NULL,
    nft_logo_url TEXT NOT NULL,
    user_wallet_address VARCHAR(255) NOT NULL
);
