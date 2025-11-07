import type { UseFormReturn } from "react-hook-form";
import type { SignUpPayload } from "../../model";
import clsx from "clsx";
import { FaCheck, FaTimes } from "react-icons/fa";
import type { ChangeEvent } from "react";

interface SignUpCheckNIKProps {
	form: UseFormReturn<SignUpPayload>;
	disabled: boolean;
	isDuplicate: boolean | null;
	message: string | undefined;
}

export function CheckNIK({
	form,
	disabled,
	isDuplicate,
	message,
}: SignUpCheckNIKProps) {
	const nikValue = form.watch("nik") || "";
	const nikLength = nikValue.length;

	// ✅ Hanya izinkan angka
	const handleNIKChange = (e: ChangeEvent<HTMLInputElement>) => {
		const onlyNumbers = e.target.value.replace(/\D/g, ""); // hilangkan non-digit
		form.setValue("nik", onlyNumbers);
	};

	const showInvalidLength = nikLength > 0 && nikLength !== 16;

	return (
		<div className="flex flex-col gap-2 relative">
			<p className="text-neutral font-normal">NIK</p>
			<div className="relative w-full">
				<input
					type="text"
					value={nikValue}
					onChange={handleNIKChange}
					disabled={disabled}
					maxLength={16}
					placeholder="Nomor Induk Kependudukan"
					className={clsx(
						"w-full border rounded-md px-3 py-2 outline-none transition-all",
						{
							"border-green-500": isDuplicate === false && !showInvalidLength,
							"border-red-500": isDuplicate === true || showInvalidLength,
							"border-gray-300": isDuplicate === null && !showInvalidLength,
						}
					)}
				/>
				{/* ✅ Icon status */}
				{isDuplicate === false && !showInvalidLength && (
					<FaCheck className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5" />
				)}
				{(isDuplicate === true || showInvalidLength) && (
					<FaTimes className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 w-5 h-5" />
				)}
			</div>

			{/* 🟢 atau 🔴 Pesan */}
			{showInvalidLength ? (
				<p className="text-sm text-red-600">NIK harus 16 karakter</p>
			) : (
				message && (
					<p
						className={clsx("text-sm", {
							"text-green-600": message.includes("Belum Digunakan"),
							"text-red-600": message.includes("SUDAH DIGUNAKAN"),
						})}
					>
						{message}
					</p>
				)
			)}
		</div>
	);
}
