import { convertFromSnakeCase } from "@/utils/helpers";
import type { Profil } from "../../model";
import { LabelProfil } from "./ProfilStatusKependudukan";

export function ProfilStatusSosial({ data }: { data: Profil | undefined }) {
	return (
		<div className="flex flex-col gap-3">
			<LabelProfil label="Status Kawin" value={data?.status_kawin || "-"} />
			<LabelProfil label="Pendidikan" value={data?.pendidikan || "-"} />
			<LabelProfil label="Pekerjaan" value={data?.pekerjaan || "-"} />
			<LabelProfil
				label="Status Hubungan"
				value={
					data?.status_hubungan
						? convertFromSnakeCase(data?.status_hubungan)
						: "-"
				}
			/>
		</div>
	);
}
