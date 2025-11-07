import { Skeleton } from "@/components/ui/skeleton";
import { useGetProfil } from "../../profil/controller";
import {
	BerandaAktivitas,
	BerandaBlog,
	BerandaMenu,
	BerandaPengumuman,
	BerandaProduk,
	BerandaSurat,
} from "./components";
import { TitleComponent } from "@/components/common/title/TitleComponent";

export function BerandaPage() {
	const { loading, data: profil } = useGetProfil();

	return (
		<>
			<div className="flex flex-col gap-4">
				<TitleComponent
					title="Selamat Datang di Portal Desa,"
					deskripsi={
						<div className="text-primary text-2xl  font-medium">
							{loading ? (
								<Skeleton className="h-8 w-[30rem]" />
							) : (
								<>{profil?.nama_warga || "Indosistem"}</>
							)}
						</div>
					}
				/>
				<BerandaMenu />
				<BerandaSurat />
				<div className="grid grid-cols-1 gap-4 md:gap-4 md:grid-cols-2">
					<div className="flex flex-col gap-4">
						<BerandaBlog />
						<BerandaProduk />
					</div>
					<div className="flex flex-col gap-4">
						<BerandaPengumuman />
						<BerandaAktivitas />
					</div>
				</div>
			</div>
		</>
	);
}
