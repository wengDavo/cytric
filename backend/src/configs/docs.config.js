import swaggerJSDoc from "swagger-jsdoc";

export const docsOptions = {
	definition: {
		openapi: "3.1.0",
		info: {
			title: "Cytric NFT API",
			version: "1.0.0",
			description:
				"Cytric is an NFT minting platform",
			license: {
				name: "MIT",
			}
		},
		servers: [
			{
				url: `http://localhost:${process.env.PORT ||3000}`,
				description: "Local development server",
			}
		],
	},

	apis: ["src/routes/*.routes.js"],
};

export const docsSpec = swaggerJSDoc(docsOptions)
