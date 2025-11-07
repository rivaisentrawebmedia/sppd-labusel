import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar, LucideEye, Timer } from "lucide-react";
import { type ReactNode, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { useMobile } from "@/utils/useMobile";
import clsx from "clsx";
interface Props<T extends FieldValues> {
	label?: string | ReactNode;
	type?:
		| "text"
		| "password"
		| "email"
		| "url"
		| "date"
		| "number"
		| "tel"
		| "file"
		| "time";
	htmlFor?: string;
	name: Path<T>; // ✅ FIX DISINI, pakai Path<T> bukan string biasa
	placeholder?: string;
	form: UseFormReturn<T>;
	className?: string;
	inputClassName?: string;
	isRow?: boolean;
	accept?: string;
	isDisabled?: boolean;
	isRequired?: boolean;
	isNumber?: boolean;
	min?: number;
	max?: number;
}

function TextInput<T extends FieldValues>({
	label,
	type = "text",
	htmlFor,
	placeholder,
	name,
	min,
	max,
	form,
	className,
	isRequired,
	accept,
	inputClassName,
	isNumber,
	isDisabled,
	isRow = false,
}: Props<T>) {
	const [showPassword, setShowPassword] = useState(false);
	const isPassword = type === "password";
	const { isMobile } = useMobile();

	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem
					className={clsx(
						"whitespace-nowrap",
						className,
						isRow
							? clsx(
									isMobile
										? "flex flex-col gap-4"
										: "grid grid-cols-[12rem_1fr] flex-row items-center gap-5"
							  )
							: "flex flex-col gap-2"
					)}
				>
					<FormLabel className={"text-neutral font-normal"} htmlFor={htmlFor}>
						{label} {isRequired && <span className={"text-red-500"}>*</span>}
					</FormLabel>
					<FormControl>
						<div className="relative w-full">
							<Input
								id={htmlFor}
								min={min}
								onWheel={(e) => (e.target as HTMLElement).blur()}
								max={max}
								accept={accept}
								disabled={isDisabled}
								type={isPassword ? (showPassword ? "text" : "password") : type}
								placeholder={placeholder}
								className={`w-full placeholder:text-[#9C9C9C] focus-visible:ring-0 rounded ${inputClassName} focus:outline-none focus:ring-2 focus:ring-green-500`}
								value={
									field.value !== undefined && field.value !== null
										? String(field.value)
										: ""
								}
								onChange={(e) => {
									let value = e.target.value;

									if (isNumber) {
										value = value.replace(/[^0-9]/g, "");
									}

									field.onChange(value);

									field.onChange(value?.toString());
								}}
							/>
							{isPassword && (
								<button
									type="button"
									onClick={() => setShowPassword((prev) => !prev)}
									className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 z-10"
								>
									{!showPassword ? (
										<LucideEye className="w-5 h-5" />
									) : (
										<FaRegEyeSlash className="w-5 h-5" />
									)}
								</button>
							)}

							{type === "date" && (
								<Calendar className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
							)}

							{type === "time" && (
								<Timer className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
							)}
						</div>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

export default TextInput;
