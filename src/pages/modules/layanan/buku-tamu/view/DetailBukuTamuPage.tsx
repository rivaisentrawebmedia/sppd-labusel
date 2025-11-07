import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { TitleComponent } from "@/components/common/title/TitleComponent";
import { useGetBukuTamu } from "../controller/useGetBukuTamuByID";
import { LoadingMona } from "@/components/ui/loading";
import {
	DetailInformasiDaftarPertanyaan,
	DetailInformasiPengujung,
} from "./components";

export default function DetailBukuTamuPage() {
	const { bukuTamu, loading } = useGetBukuTamu();
	return (
		<>
			<div className="flex flex-col gap-4">
				<Breadcrumbs
					items={[
						{
							label: "Beranda",
							to: "/modules/dashboard",
						},
						{
							label: "Buku Tamu",
							to: "/modules/layanan/buku-tamu",
						},
						{
							label: "Lihat Kuesioner",
							to: "",
						},
					]}
				/>

				<TitleComponent isBack title="Lihat Kuesioner" deskripsi={<></>} />
				{loading ? (
					<LoadingMona />
				) : (
					<>
						<DetailInformasiPengujung data={bukuTamu} />
						<DetailInformasiDaftarPertanyaan data={bukuTamu} />
					</>
				)}
			</div>
		</>
	);
}
