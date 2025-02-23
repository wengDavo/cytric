export const docsOptions = {
	definition: {
		openapi: "3.1.0",
		info: {
			title: "Cytric NFT API",
			version: "1.0.0",
			description:
				"Cytric is an NFT minting platform that allows users to create, list, and trade NFTs on the Ethereum blockchain.",
			license: {
				name: "MIT",
				url: "https://spdx.org/licenses/MIT.html",
			}
		},
		servers: [
			{
				url: `http://localhost:${process.env.PORT}`,
				description: "Local development server",
			}
		],
	},
	apis: ["./routes/*.js"],
};
