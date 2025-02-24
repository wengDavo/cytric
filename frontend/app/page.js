import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MintForm from "@/components/MintForm";
import NftGallery from "@/components/NftGallery";

export default function Home() {
	return (
		<section className="grid gap-y-10 bg-gradient-to-r from-black to-[#111827]">
			<Header />
			<article className="grid gap-6 mx-6 md:mt-24 md:gap-y-36">
				<Hero />
				<MintForm />
			</article>
			<NftGallery />
		</section>
	);
}
