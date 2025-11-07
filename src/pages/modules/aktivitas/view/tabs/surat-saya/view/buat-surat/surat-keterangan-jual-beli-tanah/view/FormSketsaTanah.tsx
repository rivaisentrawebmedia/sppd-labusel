import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";
import FormPolygon from "./FormPolygon";

export function FormSketsaTanah({
	form,
	isLoading,
}: {
	form: UseFormReturn<SuratPayload>;
	isLoading: boolean;
}) {
	const handleSavePolygon = async (data: any) => {
		const owo = data ? JSON.stringify(data) : null;
		form.setValue("sketch", owo || "");
		form.setValue("luas_tanah", data?.area?.toString());
		form.setValue("keliling", data?.perimeter?.toString());
	};
	return (
		<>
			<div className="flex flex-col gap-4  border shadow  bg-white rounded-md p-4">
				<div className="flex flex-col gap-1">
					<p className="font-bold">Sketsa Tanah</p>
					<p className="italic text-[#0070E4]">
						Silahkan gambarkan sketsa tanah yang dijual
					</p>
				</div>

				<FormPolygon
					initialPoints={[]}
					onSave={handleSavePolygon}
					autoSave={true}
					autoSaveDelay={3000}
				/>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextInput
						form={form}
						name="luas_tanah"
						isDisabled={isLoading}
						isRequired
						isRow
						label="Luas Tanah (m2)"
						placeholder="Masukkan luas"
						isNumber
					/>
					<TextInput
						form={form}
						name="keliling"
						isDisabled={isLoading}
						isRequired
						isRow
						label="Keliling (m2)"
						placeholder="Masukkan keliling"
						isNumber
					/>
				</div>
			</div>
		</>
	);
}
