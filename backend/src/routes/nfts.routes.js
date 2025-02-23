import { Router } from "express";
import { storeNft, getNft, getNftGallery } from "../controllers/nfts.controllers.js";
const router = Router();

/**
 * @swagger
 * tags:
 *   name: NFT
 *   description: NFT management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NFT:
 *       type: object
 *       required:
 *         - nft_name
 *         - nft_description
 *         - nft_logo_url
 *         - user_wallet_address
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique ID of the NFT
 *           example: 1
 *         nft_name:
 *           type: string
 *           description: Name of the NFT
 *           example: "CryptoPunk #123"
 *         nft_description:
 *           type: string
 *           description: Description of the NFT
 *           example: "A unique CryptoPunk NFT"
 *         nft_logo_url:
 *           type: string
 *           description: URL of the NFT logo
 *           example: "https://example.com/nft.png"
 *         user_wallet_address:
 *           type: string
 *           description: Wallet address of the NFT owner
 *           example: "0x123456789abcdef"
 */

/**
 * @swagger
 * /nft:
 *   post:
 *     summary: Create a new NFT
 *     tags: [NFT]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NFT'
 *     responses:
 *       201:
 *         description: NFT created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "NFT created successfully"
 *                 nft:
 *                   $ref: '#/components/schemas/NFT'
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All fields are required"
 *       409:
 *         description: NFT already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "NFT already exists"
 *       500:
 *         description: Internal server error
 */
router.post("/", storeNft);
router.get("/", getNftGallery)
router.get("/:nft_id", getNft)

export default router;

