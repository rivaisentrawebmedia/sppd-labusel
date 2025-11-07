import type { UseFormReturn } from "react-hook-form";
import type { Kuesioner, KuesionerPayload } from "../../../model";
import TextAreaInput from "@/components/common/form-input/TextAreaInput";

export function FormKualitatif({
	form,
	isDisabled,
	data,
}: {
	form: UseFormReturn<KuesionerPayload>;
	isDisabled: boolean;
	data: Kuesioner;
}) {
	return (
		<>
			<div className="flex flex-col gap-6">
				{data?.soal?.length > 0 ? (
					data.soal.map((item, idx) => {
						return (
							<div key={item.id} className="flex flex-col gap-2">
								<p className="font-medium">
									{idx + 1}. {item.pertanyaan}
								</p>

								<div className="flex flex-col gap-2">
									<TextAreaInput
										form={form}
										name={`jawaban.${idx}.jawaban`}
										placeholder="Tuliskan jawaban disini"
										isDisabled={isDisabled}
										inputClassName="bg-[#F9F9F9] border border-[#E3E3E3] placeholder:text-[#9C9C9C]"
									/>
								</div>
							</div>
						);
					})
				) : (
					<p className="text-[#888]">Tidak ada data</p>
				)}
			</div>
		</>
	);
}
