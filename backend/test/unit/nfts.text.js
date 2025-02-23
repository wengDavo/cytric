import { expect } from "chai";
import app from "../../src/index.js";
import supertest from "supertest";

const requestWithSupertest = supertest(app);

// this test actually saves the data to the database
describe.skip("NFT API", () => {
	describe("POST /api/v1/nfts", function () {
		it("should create a new NFT and return 201 status", async function () {
			const nftData = {
				nft_name: "Testing",
				nft_description: "This is a test NFT",
				nft_logo_url: "https://example.com/logo.png",
				user_wallet_address: "0x1234567890abcdef1234567890abcdef12345678"
			};

			const response = await requestWithSupertest.post("/api/v1/nfts").send(nftData);

			expect(response.status).to.equal(201);
			expect(response.body).to.have.property("message", "NFT created successfully");
			expect(response.body).to.have.property("nft");
			expect(response.body.nft).to.include(nftData);
		});

		it("should return 400 if required fields are missing", async function () {
			const incompleteData = {
				nft_name: "Missing Fields NFT"
			};

			const response = await requestWithSupertest.post("/api/v1/nfts").send(incompleteData);

			expect(response.status).to.equal(400);
			expect(response.body).to.have.property("message", "All fields are required");
		});

		it("should return 409 if NFT already exists", async function () {
			const duplicateNft = {
				nft_name: "Test NFT",
				nft_description: "This is a test NFT",
				nft_logo_url: "https://example.com/logo.png",
				user_wallet_address: "0x1234567890abcdef1234567890abcdef12345678"
			};

			await requestWithSupertest.post("/api/v1/nft").send(duplicateNft);
			const response = await requestWithSupertest.post("/api/v1/nfts").send(duplicateNft);

			expect(response.status).to.equal(409);
			expect(response.body).to.have.property("message", "NFT EXISTS");
		});
	});
});

