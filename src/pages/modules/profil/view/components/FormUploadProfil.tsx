import type { UseFormReturn } from "react-hook-form";
import type { ProfilPayload } from "../../model";
import clsx from "clsx";
import { FaPencilAlt, FaUpload } from "react-icons/fa";
import { usePostUploadFile } from "@/layouts/constroller";
import { Image } from "@/components/common/image/getImage";

export function FormUploadPhoto({
	disabled,
	form,
}: {
	form: UseFormReturn<ProfilPayload>;
	disabled: boolean;
}) {
	const { loading: loadingUpload, onSubmitUploadFile } = usePostUploadFile();

	const loading = disabled || loadingUpload;

	const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		await onSubmitUploadFile({ form, fields: "photo", file });
	};

	return (
		<>
			<div className="flex flex-col items-center justify-center">
				<div className={clsx("whitespace-nowrap flex flex-col gap-2")}>
					<label
						className={clsx(
							"flex items-center justify-center flex-col gap-4 rounded-md"
						)}
					>
						{form.watch("photo") ? (
							<div className="flex flex-col gap-3">
								<Image
									alt={form.watch("photo") || "Photo"}
									src={form.watch("photo") || ""}
									classNameImage="w-[11rem] h-[14rem] rounded-md border border-primary/20 object-cover"
									classNamePlaceHolder=""
								/>
								<div className="flex items-center gap-1 text-[#272CCD] justify-center">
									<FaPencilAlt size={12} />
									<p className="underline underline-offset-4 text-sm">
										Ganti Foto
									</p>
								</div>
							</div>
						) : (
							<div className="flex items-center w-[11rem] h-[14rem] bg-[#f5f5ff] text-primary/50 rounded-md border border-primary/20 justify-center gap-2 flex-col">
								<span className="ml-2">
									<FaUpload size={40} />
								</span>
								<p className="text-sm">Pilih File</p>
							</div>
						)}

						<input
							type="file"
							accept="image/*,.pdf"
							className="hidden"
							onChange={handleUpload}
							disabled={loading}
						/>
					</label>
				</div>
			</div>
		</>
	);
}
