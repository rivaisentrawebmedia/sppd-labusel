import { type ReactNode } from "react";
interface Props {
	form: any;
	detail: {
		name: string;
		label: ReactNode;
		element?: ReactNode;
		className?: string;
	}[];
	className?: string;
	isColumn?: boolean;
}
const DetailField = (props: Props) => {
	const { detail, form, className, isColumn } = props;
	return (
		<div
			className={`grid grid-cols-1 gap-y-4 gap-x-16 lg:grid-cols-2 ${className}`}
		>
			{detail.map((row) => (
				<div
					className={`flex w-full items-center ${row.className} ${
						isColumn ? "flex-col" : ""
					}`}
				>
					<div className={`w-full ${isColumn ? "" : "lg:w-1/3"} text-[#888]`}>
						{row.label}
					</div>
					{row.element ? (
						row.element
					) : (
						<div
							className={`whitespace-pre-line w-full font-medium text-[#393939] break-words ${
								isColumn ? "" : "lg:w-2/3"
							}`}
						>
							{form.watch(row.name) ?? "-"}
						</div>
					)}
				</div>
			))}
		</div>
	);
};

export default DetailField;
