export function polygonToImage(
	sketch: any,
	width = 1000,
	height = 600,
	fillColor = "rgba(0, 100, 255, 0.3)",
	strokeColor = "#0033cc"
) {
	if (!sketch?.points || sketch.points.length < 2) return null;

	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext("2d");

	if (ctx) {
		// Background putih
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(0, 0, width, height);

		// Gambar polygon
		ctx.beginPath();
		sketch.points.forEach((p: any, i: any) => {
			if (i === 0) ctx.moveTo(p.x, p.y);
			else ctx.lineTo(p.x, p.y);
		});
		ctx.closePath();

		// Style
		ctx.fillStyle = fillColor;
		ctx.strokeStyle = strokeColor;
		ctx.lineWidth = 3;
		ctx.fill();
		ctx.stroke();

		// Tulis informasi tambahan (optional)
		ctx.fillStyle = "#000";
		ctx.font = "20px Arial";
		ctx.fillText(`Area: ${Math.round(sketch.area)} m²`, 20, 30);
		ctx.fillText(`Keliling: ${Math.round(sketch.perimeter)} m`, 20, 60);

		// Hasil base64 (bisa dipakai di <img src={...}/>)
		return canvas.toDataURL("image/png");
	}
}
