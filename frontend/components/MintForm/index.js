import cube from "@/public/images/cube.svg";
import Image from "next/image";

function MintForm() {
	return (
		<form className="bg-[#11182780] border border-[#1F2937] p-4 md:p-6 grid gap-y-5 rounded-2xl md:mx-auto md:w-[578px]">
			<h3 className="font-bold text-2xl leading-7 flex rounded-2xl">Mint Your NFT</h3>
			<article className="grid gap-y-4">
				<div className="grid gap-y-1">
					<label className="p-[2px] text-[#9CA3AF] text-sm">NFT Name</label>
					<input type="text" className="border border-[#374151] outline-none bg-[#1F2937] p-2 rounded-[8px] placeholder:text-[#ADAEBC]" name="nft_name" placeholder="Enter NFT name" required />
				</div>
				<div className="grid gap-y-1">
					<label className="p-[2px] text-[#9CA3AF] text-sm">Desciption</label>
					<textarea
						rows={3}
						className="border border-[#374151] outline-none bg-[#1F2937] p-2 rounded-[8px] placeholder:text-[#ADAEBC] resize-none"
						name="nft_name"
						placeholder="Describe your NFT"
						required
					></textarea>
				</div>
				<div className="grid gapy-y-1">
					<label className="p-[2px] text-[#9CA3AF] text-sm">Image URL</label>
					<input type="text" className="border border-[#374151] outline-none bg-[#1F2937] p-2 rounded-[8px] placeholder:text-[#ADAEBC]" name="nft_image_url" placeholder="Enter image URL" required />
				</div>
			</article>
			<button
				type="submit"
				className="bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] hover:opacity-80 rounded-lg flex text-[#E5E7EB] p-3 items-center justify-center gap-x-2 transition transform active:scale-90">
				<Image
					src={cube}
					alt="cube icon"
					width={16}
					height={16}
					className="text-[#E5E7EB]"
				/>
				<span>Mint NFT</span>
			</button>

		</form>
	)
};
export default MintForm;
