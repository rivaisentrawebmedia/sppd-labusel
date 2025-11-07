import type { UseFormReturn } from "react-hook-form";
import type { ProfilPayload } from "../../model";
import SelectInput from "@/components/common/select/SelectBaseForm";
import { convertFromSnakeCase } from "@/utils/helpers";
import {
	useGetPekerjaan,
	useGetPendidikan,
	useGetStatusKawin,
} from "@/layouts/constroller";

export function FormStatusSosial({
	disabled,
	form,
}: {
	form: UseFormReturn<ProfilPayload>;
	disabled: boolean;
}) {
	const { statusKawin, loading: loadingStatusKawin } = useGetStatusKawin();
	const { pendidikan, loading: loadingPendidikan } = useGetPendidikan();
	const { pekerjaan, loading: loadingPekerjaan } = useGetPekerjaan();

	return (
		<>
			<div className="flex flex-col w-full md:w-1/2 gap-3">
				<SelectInput
					name="status_kawin_id"
					isDisabled={disabled || loadingStatusKawin}
					label="Status Kawin"
					placeholder="Pilih Status Kawin"
					isRequired
					isRow
					form={form}
					data={
						statusKawin?.map((item) => {
							return {
								label: item?.nama,
								value: item?.id,
							};
						}) || []
					}
				/>
				<SelectInput
					name="pendidikan_id"
					isDisabled={disabled || loadingPendidikan}
					label="Pendidikan"
					placeholder="Pilih Pendidikan"
					isRequired
					isRow
					form={form}
					data={
						pendidikan?.map((item) => {
							return {
								label: item?.nama,
								value: item?.id,
							};
						}) || []
					}
				/>
				<SelectInput
					name="pekerjaan_id"
					isDisabled={disabled || loadingPekerjaan}
					label="Pekerjaan"
					placeholder="Pilih Pekerjaan"
					isRequired
					isRow
					form={form}
					data={
						pekerjaan?.map((item) => {
							return {
								label: item?.nama,
								value: item?.id,
							};
						}) || []
					}
				/>
				<SelectInput
					name="status_hubungan"
					isDisabled={disabled}
					label="Status Hubungan"
					placeholder="Pilih Status Hubungan"
					isRequired
					isRow
					form={form}
					data={[
						"kepala_keluarga",
						"suami",
						"anak",
						"menantu",
						"cucu",
						"orang_tua",
						"mertua",
						"famili_lain",
						"pembantu",
						"lainnya",
						"istri",
					].map((item) => {
						return {
							label: convertFromSnakeCase(item),
							value: item,
						};
					})}
				/>
			</div>
		</>
	);
}
