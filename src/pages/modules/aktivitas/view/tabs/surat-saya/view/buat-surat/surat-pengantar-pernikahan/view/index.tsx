import { DialogCustom } from "@/components/common/dialog";
import { usePostSurat } from "../controller";
import { Form } from "@/components/ui/form";
import { FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import { useState } from "react";
import clsx from "clsx";
import { MoveLeft, MoveRight } from "lucide-react";
import { FormInformasiAyahSuami } from "./FormInformasiAyahSuami";
import { FormInformasiIbuSuami } from "./FormInformasiIbuSuami";
import { FormInformasiAyahIstri } from "./FormInformasiAyahIstri";
import { FormInformasiIbuIstri } from "./FormInformasiIbuIstri";
import { FormInformasiPernikahan } from "./FormInformasiPernikahan";
import { FormInformasiCalonSuami } from "./FormInformasiCalonSuami";
import { FormWargaDesa } from "../../FormWargaDesa";
import { FormInformasiCalonIstri } from "./FormInformasiCalonIstri";

export function FormSuratPengantarPenikahan() {
	const { form, handleSave, isShow, loading, setIsShow } = usePostSurat();

	const disabled = loading;

	const onSubmit = async () => {
		const isValid = await form.trigger();
		if (isValid) setIsShow(true);
	};

	const listMenu = [
		"Informasi Calon Suami",
		"Informasi Orang Tua Calon Suami",
		"Informasi Calon Istri",
		"Informasi Orang Tua Calon Istri",
		"Informasi Rencana Pernikahan",
	];
	const [menu, setMenu] = useState<string>(listMenu?.[0]);

	const konten = () => {
		switch (menu) {
			case listMenu?.[0]:
				return (
					<div className="flex flex-col gap-4 w-full ">
						<FormWargaDesa form={form} disabled={disabled} />
						<FormInformasiCalonSuami form={form} disabled={disabled} />
						<div className="flex items-center justify-end gap-3">
							<button
								type="button"
								onClick={() => {
									setMenu(listMenu?.[1]);
								}}
								className="flex items-center justify-center w-full md:w-fit gap-2 cursor-pointer py-1.5 px-4 rounded-md bg-primary hover:bg-primary/80 text-nowrap duration-300 transition-colors text-white"
							>
								Selanjutnya
								<MoveRight />
							</button>
						</div>
					</div>
				);
			case listMenu?.[1]:
				return (
					<div className="flex flex-col gap-4 w-full ">
						<FormInformasiAyahSuami form={form} disabled={disabled} />
						<FormInformasiIbuSuami form={form} disabled={disabled} />
						<div className="flex items-center justify-end gap-3">
							<button
								type="button"
								onClick={() => {
									setMenu(listMenu?.[0]);
								}}
								className="flex items-center justify-center w-full md:w-fit gap-2 cursor-pointer py-1.5 px-4 rounded-md bg-primary hover:bg-primary/80 text-nowrap duration-300 transition-colors text-white"
							>
								<MoveLeft />
								Sebelumnya
							</button>
							<button
								type="button"
								onClick={() => {
									setMenu(listMenu?.[2]);
								}}
								className="flex items-center justify-center w-full md:w-fit gap-2 cursor-pointer py-1.5 px-4 rounded-md bg-primary hover:bg-primary/80 text-nowrap duration-300 transition-colors text-white"
							>
								Selanjutnya
								<MoveRight />
							</button>
						</div>
					</div>
				);
			case listMenu?.[2]:
				return (
					<div className="flex flex-col gap-4 w-full ">
						<FormInformasiCalonIstri form={form} disabled={disabled} />
						<div className="flex items-center justify-end gap-3">
							<button
								type="button"
								onClick={() => {
									setMenu(listMenu?.[1]);
								}}
								className="flex items-center justify-center w-full md:w-fit gap-2 cursor-pointer py-1.5 px-4 rounded-md bg-primary hover:bg-primary/80 text-nowrap duration-300 transition-colors text-white"
							>
								<MoveLeft />
								Sebelumnya
							</button>
							<button
								type="button"
								onClick={() => {
									setMenu(listMenu?.[3]);
								}}
								className="flex items-center justify-center w-full md:w-fit gap-2 cursor-pointer py-1.5 px-4 rounded-md bg-primary hover:bg-primary/80 text-nowrap duration-300 transition-colors text-white"
							>
								Selanjutnya
								<MoveRight />
							</button>
						</div>
					</div>
				);
			case listMenu?.[3]:
				return (
					<div className="flex flex-col gap-4 w-full ">
						<FormInformasiAyahIstri form={form} disabled={disabled} />
						<FormInformasiIbuIstri form={form} disabled={disabled} />
						<div className="flex items-center justify-end gap-3">
							<button
								type="button"
								onClick={() => {
									setMenu(listMenu?.[2]);
								}}
								className="flex items-center justify-center w-full md:w-fit gap-2 cursor-pointer py-1.5 px-4 rounded-md bg-primary hover:bg-primary/80 text-nowrap duration-300 transition-colors text-white"
							>
								<MoveLeft />
								Sebelumnya
							</button>
							<button
								type="button"
								onClick={() => {
									setMenu(listMenu?.[4]);
								}}
								className="flex items-center justify-center w-full md:w-fit gap-2 cursor-pointer py-1.5 px-4 rounded-md bg-primary hover:bg-primary/80 text-nowrap duration-300 transition-colors text-white"
							>
								Selanjutnya
								<MoveRight />
							</button>
						</div>
					</div>
				);

			case listMenu?.[4]:
				return (
					<div className="flex flex-col gap-4 w-full ">
						<FormInformasiPernikahan form={form} disabled={disabled} />
						<div className="flex items-center justify-end gap-3">
							<button
								type="button"
								onClick={() => {
									setMenu(listMenu?.[3]);
								}}
								className="flex items-center justify-center w-full md:w-fit gap-2 cursor-pointer py-1.5 px-4 rounded-md bg-primary hover:bg-primary/80 text-nowrap duration-300 transition-colors text-white"
							>
								<MoveLeft />
								Sebelumnya
							</button>
							<button
								type="submit"
								onClick={async () => {
									const isValid = await form.trigger();
									if (!isValid) {
										const invalidFields = Object.entries(
											form.formState.errors
										).map(([field, error]) => ({
											field,
											error: error?.message,
										}));
										return toast.error(invalidFields?.[0]?.error?.toString());
									}
								}}
								className="flex items-center justify-center w-full md:w-fit gap-2 cursor-pointer py-1.5 px-4 rounded-md bg-primary hover:bg-primary/80 text-nowrap duration-300 transition-colors text-white"
							>
								<FaSave /> Simpan Perubahan
							</button>
						</div>
					</div>
				);
			default:
				return <></>;
		}
	};

	return (
		<>
			<Form {...form}>
				<form
					className="flex flex-col gap-4"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<div className="flex flex-col gap-4 md:flex-row md:w-full md:gap-4">
						<div className="flex flex-col h-fit gap-1 font-light bg-white border-primary border p-4 rounded-md">
							{listMenu?.map((item, idx) => {
								const isActive = menu === item;
								return (
									<div
										onClick={() => {
											setMenu(item);
										}}
										className={clsx(
											"flex border-r duration-300 transition-colors cursor-pointer rounded p-2 items-center gap-2",
											{
												"bg-[#eef2ff] border-r-primary": isActive,
												"border-transparent": !isActive,
											}
										)}
										key={idx}
									>
										{item}
									</div>
								);
							})}
						</div>
						<div className="flex w-full flex-1">{konten()}</div>
					</div>
				</form>
			</Form>
			<DialogCustom
				open={isShow}
				setOpen={setIsShow}
				title={
					<p className="text-xl font-semibold text-primary">
						Konfirmasi Buat Surat
					</p>
				}
				description={
					<p className="text-gray-600 text-sm">
						Apakah Anda yakin ingin menyimpan surat ini? Pastikan seluruh data
						sudah benar sebelum melanjutkan.
					</p>
				}
				children={
					<div className="flex flex-col gap-4 w-full mt-2">
						<div className="flex items-center justify-end gap-3">
							<button
								type="button"
								onClick={() => setIsShow(false)}
								disabled={disabled}
								className="py-1.5 px-4 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition"
							>
								Batal
							</button>
							<button
								type="button"
								onClick={() => handleSave()}
								disabled={disabled}
								className="py-1.5 px-4 rounded-md bg-primary hover:bg-primary/90 text-white text-sm font-medium transition disabled:opacity-50"
							>
								Simpan Surat
							</button>
						</div>
					</div>
				}
			/>
		</>
	);
}
