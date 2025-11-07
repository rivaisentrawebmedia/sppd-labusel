import type { UseFormReturn } from "react-hook-form";
import clsx from "clsx";
import type { ChangeEvent } from "react";
import { FaUpload } from "react-icons/fa";

export function FormUploadFile({
	form,
	handleUpload,
	fields,
	disabled,
	label,
}: {
	form: UseFormReturn<any>;
	handleUpload: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
	fields: string;
	disabled: boolean;
	label: string;
}) {
	return (
		<div className="flex flex-col w-full md:items-center gap-2 md:flex-row md:gap-4">
			<div
				className={clsx(
					"whitespace-nowrap w-full md:grid md:grid-cols-[12rem_1fr] md:flex-row md:items-center md:gap-5 flex flex-col gap-4"
				)}
			>
				<p className="text-neutral font-normal">{label}</p>
				<div className="flex items-center gap-4 w-full ">
					<label
						className={clsx(
							"relative w-full inline-flex items-center justify-between px-3 py-2 text-sm font-medium  rounded-md cursor-pointer ",
							{
								"bg-green-50 text-green-500 border border-green-500 hover:bg-green-50/80":
									form.watch(fields),
								"bg-[#F5F5FF] text-[#272CCD] border border-[#272CCD] hover:bg-[#F5F5FF]/80":
									!form.watch(fields),
							}
						)}
					>
						Pilih File
						<input
							type="file"
							accept="image/*,.pdf"
							className="hidden"
							onChange={handleUpload}
							disabled={disabled}
						/>
						<span className="ml-2">
							<FaUpload />
						</span>
					</label>
				</div>
			</div>
			<p className="text-sm w-full italic text-gray-500">
				{form.watch(fields) ? form.watch(fields) : "Belum ada file"}
			</p>
		</div>
	);
}
