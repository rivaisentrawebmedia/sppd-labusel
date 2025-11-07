import type { UseFormReturn } from "react-hook-form";
import * as React from "react";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";

interface Props {
	label?: string;
	htmlFor?: string;
	name: string;
	placeholder?: string;
	form: UseFormReturn<any>;
	className?: string;
	inputClassName?: string;
	isRow?: boolean;
	isDisabled?: boolean;
	isRequired?: boolean;
}

const TextAreaInput: React.FC<Props> = ({
	label,
	htmlFor,
	placeholder,
	name,
	form,
	className,
	isDisabled,
	inputClassName,
	isRow = false,
	isRequired,
}: Props) => {
	return (
		<>
			<FormField
				control={form.control}
				name={name}
				render={({ field }) => (
					<FormItem
						className={`
            ${
							isRow
								? "flex flex-col items-start gap-4 lg:grid lg:grid-cols-[12rem_1fr] lg:gap-5"
								: "flex flex-col gap-2"
						} 
        
              whitespace-nowrap
              ${className}`}
					>
						<FormLabel className={"text-neutral font-normal"} htmlFor={htmlFor}>
							{label} {isRequired && <span className={"text-red-500"}>*</span>}
						</FormLabel>
						<FormControl>
							<Textarea
								{...field}
								disabled={isDisabled}
								value={field?.value ?? ""}
								className={`focus-visible:ring-0 ${inputClassName} bg-white`}
								id={htmlFor}
								placeholder={placeholder}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
};
export default TextAreaInput;
