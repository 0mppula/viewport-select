import { useState } from 'react';

function SelectArea() {
	const [isMouseDown, setIsMouseDown] = useState(false);

	const [selectedAreaTop, setSelectedAreaTop] = useState<number | null>(null);
	const [selectedAreaLeft, setSelectedAreaLeft] = useState<number | null>(null);
	const [selectedAreaHeight, setSelectedAreaHeight] = useState<number | null>(null);
	const [selectedAreaWidth, setSelectedAreaWidth] = useState<number | null>(null);

	const [selectedAreaStartX, setSelectedAreaStartX] = useState<number | null>(null);
	const [selectedAreaStartY, setSelectedAreaStartY] = useState<number | null>(null);

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsMouseDown(true);

		const relativeX = e.clientX - e.currentTarget.offsetLeft;
		const relativeY = e.clientY - e.currentTarget.offsetTop;

		setSelectedAreaStartX(relativeX);
		setSelectedAreaStartY(relativeY);
	};

	const handleMouseUp = () => {
		setIsMouseDown(false);

		setSelectedAreaStartX(null);
		setSelectedAreaStartY(null);

		setSelectedAreaTop(null);
		setSelectedAreaLeft(null);
		setSelectedAreaHeight(null);
		setSelectedAreaWidth(null);
	};

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!isMouseDown) return;

		const relativeTop = e.clientY - e.currentTarget.offsetTop;
		const relativeLeft = e.clientX - e.currentTarget.offsetLeft;

		setSelectedAreaTop(Math.min(selectedAreaStartY!, relativeTop));
		setSelectedAreaLeft(Math.min(selectedAreaStartX!, relativeLeft));
		setSelectedAreaHeight(Math.abs(relativeTop - selectedAreaStartY!));
		setSelectedAreaWidth(Math.abs(relativeLeft - selectedAreaStartX!));
	};

	return (
		<div
			className="select-area"
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onMouseMove={handleMouseMove}
		>
			{isMouseDown && (
				<div
					className="selected-area"
					style={{
						top: selectedAreaTop || 0,
						left: selectedAreaLeft || 0,
						width: selectedAreaWidth || 0,
						height: selectedAreaHeight || 0,
						borderWidth:
							+(selectedAreaWidth ?? 0) && +(selectedAreaWidth ?? 0) > 1 ? 1 : 0,
						backgroundColor:
							+(selectedAreaWidth ?? 0) <= 1 || +(selectedAreaHeight ?? 0) <= 1
								? '#f0ca00'
								: 'transparent',
					}}
				/>
			)}
		</div>
	);
}

export default SelectArea;
