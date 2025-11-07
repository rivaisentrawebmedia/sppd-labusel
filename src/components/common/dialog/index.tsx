import clsx from "clsx";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { createPortal } from "react-dom";

interface Props {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	title: string | React.ReactNode;
	description?: string | React.ReactNode;
	classname?: string;
	children: React.ReactNode;
	isNotFleksibel?: boolean;
}

export const DialogCustom = ({
	open,
	setOpen,
	description,
	title,
	classname,
	children,
	isNotFleksibel = true,
}: Props) => {
	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [open]);

	if (!open) return null;

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			setOpen(false);
		}
	};

	const dialog = (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center"
			onClick={handleBackdropClick}
		>
			{/* Backdrop */}
			<div className="fixed inset-0 bg-black/50" />

			{/* Dialog */}
			<div
				className={clsx(
					"relative bg-white rounded-lg shadow-lg mx-4",
					{
						"max-w-md": isNotFleksibel,
						"max-w-full w-[60%] h-[80%] overflow-auto": !isNotFleksibel,
					},
					{
						classname,
					}
				)}
			>
				<div className="p-6">
					<h2 className="text-lg font-semibold mb-2">{title}</h2>
					{description && (
						<div className="text-sm text-gray-600 mb-4">{description}</div>
					)}
					{children}
				</div>

				{/* Close button */}
				<button
					onClick={() => setOpen(false)}
					className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
				>
					✕
				</button>
			</div>
		</div>
	);

	return createPortal(dialog, document.body);
};
