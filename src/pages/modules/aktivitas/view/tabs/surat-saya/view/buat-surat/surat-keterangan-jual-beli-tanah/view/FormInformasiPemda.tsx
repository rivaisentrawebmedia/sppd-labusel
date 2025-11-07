import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import { FormSaksiPemda } from "./FormSaksiPemda";

export function FormInformasiPemda({
	disabled,
	form,
}: {
	form: UseFormReturn<SuratPayload>;
	disabled: boolean;
}) {
	return (
		<>
			<div className="flex flex-col gap-4  border shadow  bg-white rounded-md p-4">
				<p className="font-light uppercase underline underline-offset-4 text-primary">
					Saksi Pemerintah Desa
				</p>
				<FormSaksiPemda form={form} isLoading={disabled} />
			</div>
		</>
	);
}
