import type { UseFormReturn } from "react-hook-form";
import type { Kuesioner, KuesionerPayload } from "../../../model";
import RadioInputCol from "@/components/common/form-input/RadioInputCol";

export function FormKuantitatif({
	form,
	isDisabled,
	data,
}: {
	form: UseFormReturn<KuesionerPayload>;
	isDisabled: boolean;
	data: Kuesioner;
}) {
	return (
		<div className="flex flex-col gap-6">
			{data?.soal?.length > 0 ? (
				data?.soal?.map((item, idx) => {
					return (
						<div key={item.id} className="flex flex-col gap-3">
							<p className="font-medium">
								{idx + 1}. {item.pertanyaan}
							</p>

							<div className="flex flex-col gap-2 pl-4">
								<RadioInputCol
									name={`jawaban.${idx}.opsi`}
									form={form}
									isDisabled={isDisabled}
									data={[
										{
											label: item?.opsi?.opsi_1 || "",
											value: 1,
										},
										{
											label: item?.opsi?.opsi_2 || "",
											value: 2,
										},
										{
											label: item?.opsi?.opsi_3 || "",
											value: 3,
										},
										{
											label: item?.opsi?.opsi_4 || "",
											value: 4,
										},
										{
											label: item?.opsi?.opsi_5 || "",
											value: 5,
										},
									]}
								/>
								{/* {opsiList.map((opsi, opsiIdx) => {
									const opsiValue = opsiIdx + 1;
									const isSelected = selected === opsiValue;

									return (
										<div
											key={opsiIdx}
											onClick={() =>
												!isDisabled &&
												form.setValue(`jawaban.${idx}.opsi`, opsiValue)
											}
											className={clsx(
												"flex items-center cursor-pointer gap-2 transition-all",
												{ "opacity-50 cursor-not-allowed": isDisabled }
											)}
										>
											<div
												className={clsx(
													"w-[16px] h-[16px] rounded-full border border-[#272CCD] transition-colors",
													{
														"bg-[#272CCD]": isSelected,
														"bg-transparent": !isSelected,
													}
												)}
											/>
											<p>{convertFromSnakeCase(opsi || "")}</p>
										</div>
									);
								})} */}
							</div>
						</div>
					);
				})
			) : (
				<p className="text-[#888]">Tidak ada data</p>
			)}
		</div>
	);
}
