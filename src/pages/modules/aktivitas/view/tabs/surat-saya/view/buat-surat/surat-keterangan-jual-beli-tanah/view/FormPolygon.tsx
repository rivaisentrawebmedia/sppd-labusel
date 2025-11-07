import React, { useRef, useEffect, useState } from "react";
import Konva from "konva";

interface Point {
	x: number;
	y: number;
}

interface SaveData {
	points: Point[];
	area: number;
	perimeter: number;
}

interface FormPolygonProps {
	initialPoints?: Point[];
	onSave?: (data: SaveData) => Promise<void> | void;
	autoSave?: boolean;
	autoSaveDelay?: number;
}

const FormPolygon: React.FC<FormPolygonProps> = ({
	initialPoints = [],
	onSave,
	autoSave = false,
	autoSaveDelay = 2000,
}) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const stageRef = useRef<Konva.Stage | null>(null);
	const layerRef = useRef<Konva.Layer | null>(null);
	const polygonRef = useRef<Konva.Line | null>(null);
	const handlesRef = useRef<Konva.Circle[]>([]);
	const distLabelsRef = useRef<Konva.Text[]>([]);
	const pointsRef = useRef<Point[]>([]);
	const historyRef = useRef<string[]>(["[]"]);
	const historyIndexRef = useRef<number>(0);
	const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);

	const [_points, setPoints] = useState<Point[]>(initialPoints);
	const [area, setArea] = useState<number>(0);
	const [perimeter, setPerimeter] = useState<number>(0);
	const [canUndo, setCanUndo] = useState<boolean>(false);
	const [canRedo, setCanRedo] = useState<boolean>(false);
	const [isSaving, setIsSaving] = useState<boolean>(false);
	const [lastSaved, setLastSaved] = useState<Date | null>(null);

	// Load initial points
	useEffect(() => {
		if (initialPoints.length > 0) {
			pointsRef.current = initialPoints;
			setPoints(initialPoints);
			historyRef.current = [JSON.stringify(initialPoints)];
			historyIndexRef.current = 0;
		}
	}, [initialPoints]);

	const flattenPoints = (pts: Point[]) => pts.flatMap((p) => [p.x, p.y]);

	const calculateArea = (pts: Point[]): number => {
		if (pts.length < 3) return 0;
		let sum = 0;
		for (let i = 0; i < pts.length; i++) {
			const j = (i + 1) % pts.length;
			sum += pts[i].x * pts[j].y - pts[j].x * pts[i].y;
		}
		return Math.abs(sum / 2);
	};

	const calculatePerimeter = (pts: Point[]): number => {
		if (pts.length < 2) return 0;
		let total = 0;
		for (let i = 0; i < pts.length; i++) {
			const j = (i + 1) % pts.length;
			const dx = pts[j].x - pts[i].x;
			const dy = pts[j].y - pts[i].y;
			total += Math.sqrt(dx * dx + dy * dy);
		}
		return total;
	};

	const distance = (p1: Point, p2: Point): number => {
		const dx = p2.x - p1.x;
		const dy = p2.y - p1.y;
		return Math.sqrt(dx * dx + dy * dy);
	};

	const midpoint = (p1: Point, p2: Point): Point => ({
		x: (p1.x + p2.x) / 2,
		y: (p1.y + p2.y) / 2,
	});

	const updateUndoRedoButtons = () => {
		setCanUndo(historyIndexRef.current > 0);
		setCanRedo(historyIndexRef.current < historyRef.current.length - 1);
	};

	const pushHistory = () => {
		historyRef.current.splice(historyIndexRef.current + 1);
		historyRef.current.push(JSON.stringify(pointsRef.current));
		historyIndexRef.current++;
		updateUndoRedoButtons();

		if (autoSave && onSave) {
			if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
			autoSaveTimerRef.current = setTimeout(() => {
				handleSave();
			}, autoSaveDelay);
		}
	};

	const updateInfo = () => {
		setArea(calculateArea(pointsRef.current));
		setPerimeter(calculatePerimeter(pointsRef.current));
	};

	const clearDistanceLabels = () => {
		distLabelsRef.current.forEach((d) => d.destroy());
		distLabelsRef.current = [];
	};

	const updateDistances = () => {
		if (!layerRef.current) return;
		clearDistanceLabels();
		const pts = pointsRef.current;
		if (pts.length < 2) return;

		for (let i = 0; i < pts.length; i++) {
			const p1 = pts[i];
			const p2 = pts[(i + 1) % pts.length];
			const d = Math.round(distance(p1, p2));
			const mid = midpoint(p1, p2);

			const label = new Konva.Text({
				x: mid.x - 10,
				y: mid.y - 14,
				text: `${d}m`,
				fontSize: 12,
				fill: "#555",
			});

			distLabelsRef.current.push(label);
			layerRef.current?.add(label);
		}
	};

	const drawPolygon = () => {
		if (!layerRef.current) return;
		polygonRef.current?.destroy();
		polygonRef.current = null;

		const pts = pointsRef.current;
		if (pts.length < 3) return;

		const polygon = new Konva.Line({
			points: flattenPoints(pts),
			closed: true,
			fill: "rgba(110,90,240,0.12)",
			stroke: "#6e5af0",
			strokeWidth: 2,
			lineJoin: "round",
		});

		layerRef.current?.add(polygon);
		polygonRef.current = polygon;
	};

	const updateHandles = () => {
		if (!layerRef.current) return;
		handlesRef.current.forEach((h) => h.destroy());
		handlesRef.current = [];

		const pts = pointsRef.current;

		pts.forEach((p, i) => {
			const circle = new Konva.Circle({
				x: p.x,
				y: p.y,
				radius: 5,
				fill: "#6e5af0",
				stroke: "white",
				strokeWidth: 2,
				draggable: true,
			});

			circle.on("dragmove", () => {
				pointsRef.current[i] = { x: circle.x(), y: circle.y() };
				polygonRef.current?.points(flattenPoints(pointsRef.current));
				updateDistances();
				updateInfo();
				layerRef.current?.batchDraw();
			});

			circle.on("dragend", () => pushHistory());

			circle.on("dblclick", () => {
				pointsRef.current.splice(i, 1);
				setPoints([...pointsRef.current]);
				drawPolygon();
				updateHandles();
				updateDistances();
				updateInfo();
				pushHistory();
			});

			handlesRef.current.push(circle);
			layerRef.current?.add(circle);
		});
	};

	const handleSave = async () => {
		if (!onSave) return;
		setIsSaving(true);
		try {
			const data: SaveData = {
				points: pointsRef.current,
				area: calculateArea(pointsRef.current),
				perimeter: calculatePerimeter(pointsRef.current),
			};
			await onSave(data);
			setLastSaved(new Date());
		} catch (error) {
			console.error("Failed to save:", error);
		} finally {
			setIsSaving(false);
		}
	};

	const drawCompass = (stage: Konva.Stage, _layer: Konva.Layer) => {
		const oldLayer = stage.findOne(".compass-layer");
		if (oldLayer) oldLayer.destroy();

		const width = stage.width();
		const height = stage.height();
		const centerX = width / 2;
		const centerY = height / 2;

		const compassLayer = new Konva.Layer({ name: "compass-layer" });

		const horizontalLine = new Konva.Line({
			points: [0, centerY, width, centerY],
			stroke: "#ccc",
			strokeWidth: 1,
			dash: [5, 5],
		});

		const verticalLine = new Konva.Line({
			points: [centerX, 0, centerX, height],
			stroke: "#ccc",
			strokeWidth: 1,
			dash: [5, 5],
		});

		const labels = [
			{ text: "U", x: centerX - 4, y: 10 },
			{ text: "S", x: centerX - 4, y: height - 20 },
			{ text: "B", x: 10, y: centerY - 6 },
			{ text: "T", x: width - 20, y: centerY - 6 },
		];

		labels.forEach((label) => {
			const text = new Konva.Text({
				...label,
				fontSize: 14,
				fill: "#888",
				fontStyle: "bold",
			});
			compassLayer.add(text);
		});

		compassLayer.add(horizontalLine);
		compassLayer.add(verticalLine);
		stage.add(compassLayer);
		compassLayer.moveToBottom();
	};

	useEffect(() => {
		if (!containerRef.current) return;
		const container = containerRef.current;
		const width = container.offsetWidth;
		const height = 480;

		const stage = new Konva.Stage({ container, width, height });
		const layer = new Konva.Layer();
		stage.add(layer);

		stageRef.current = stage;
		layerRef.current = layer;

		drawCompass(stage, layer);

		if (pointsRef.current.length > 0) {
			drawPolygon();
			updateHandles();
			updateDistances();
			updateInfo();
		}

		const handleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
			if (e.target.getClassName() === "Circle") return;
			const pos = stage.getPointerPosition();
			if (!pos) return;
			pointsRef.current.push({ x: pos.x, y: pos.y });
			setPoints([...pointsRef.current]);
			drawPolygon();
			updateHandles();
			updateDistances();
			updateInfo();
			pushHistory();
		};

		stage.on("click", handleClick);
		updateUndoRedoButtons();

		const handleResize = () => {
			const newWidth = container.offsetWidth;
			stage.width(newWidth);
			stage.height(height);
			stage.batchDraw();
			drawCompass(stage, layer);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			stage.off("click", handleClick);
			window.removeEventListener("resize", handleResize);
			stage.destroy();
			if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
		};
	}, []);

	const undo = () => {
		if (historyIndexRef.current > 0) {
			historyIndexRef.current--;
			const newPoints = JSON.parse(
				historyRef.current[historyIndexRef.current]
			) as Point[];
			pointsRef.current = newPoints;
			setPoints(newPoints);
			updateUndoRedoButtons();
		}
	};

	const redo = () => {
		if (historyIndexRef.current < historyRef.current.length - 1) {
			historyIndexRef.current++;
			const newPoints = JSON.parse(
				historyRef.current[historyIndexRef.current]
			) as Point[];
			pointsRef.current = newPoints;
			setPoints(newPoints);
			updateUndoRedoButtons();
		}
	};

	return (
		<div className="flex w-full flex-col gap-6">
			<div className="flex w-full items-center justify-between gap-4">
				<div className="flex items-center gap-3">
					<button
						type="button"
						onClick={undo}
						disabled={!canUndo}
						className="rounded-lg border border-primary px-4 py-2 text-primary disabled:opacity-40"
					>
						↩️ Undo
					</button>
					<button
						onClick={redo}
						disabled={!canRedo}
						type="button"
						className="rounded-lg border border-primary px-4 py-2 text-primary disabled:opacity-40"
					>
						↪️ Redo
					</button>
					{onSave && (
						<button
							onClick={handleSave}
							disabled={isSaving}
							type="button"
							className="rounded-lg border border-primary px-4 py-2 text-primary disabled:opacity-40"
						>
							{isSaving ? "💾 Menyimpan..." : "💾 Simpan"}
						</button>
					)}
				</div>
				{lastSaved && (
					<span className="text-xs text-gray-500">
						Terakhir disimpan: {lastSaved.toLocaleTimeString("id-ID")}
					</span>
				)}
			</div>

			<div
				ref={containerRef}
				className="w-full border border-gray-300 bg-[#f8f7fd]"
			/>

			<p className="text-sm text-gray-700">
				Luas: <span className="font-semibold">{area.toFixed(2)}</span> m² |
				Keliling: <span className="font-semibold">{perimeter.toFixed(2)}</span>{" "}
				m
			</p>
		</div>
	);
};

export default FormPolygon;
