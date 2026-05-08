"use client";

import { useState, useRef, useEffect } from "react";

interface Windows98WindowProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  initialPosition?: { x: number; y: number };
  width?: number;
  height?: number;
}

export function Windows98Window({ 
  title, 
  children, 
  onClose,
  initialPosition = { x: 100, y: 80 },
  width = 500,
  height = 400
}: Windows98WindowProps) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  return (
    <div
      ref={windowRef}
      className="fixed z-50"
      style={{
        left: position.x,
        top: position.y,
        width,
        minHeight: height,
        fontFamily: '"MS Sans Serif", Tahoma, sans-serif',
        fontSize: "11px"
      }}
    >
      {/* Window frame with beveled border */}
      <div 
        className="flex flex-col"
        style={{
          background: "#c0c0c0",
          border: "2px solid",
          borderColor: "#ffffff #404040 #404040 #ffffff",
          boxShadow: "1px 1px 0 #000000"
        }}
      >
        {/* Title bar */}
        <div
          onMouseDown={handleMouseDown}
          className="flex items-center justify-between px-1 py-0.5 cursor-move select-none"
          style={{
            background: "linear-gradient(90deg, #000080, #1084d0)",
            color: "white",
            fontWeight: "bold"
          }}
        >
          <div className="flex items-center gap-1">
            <WindowIcon />
            <span>{title}</span>
          </div>
          <div className="flex gap-0.5">
            <TitleBarButton onClick={() => {}} label="_" />
            <TitleBarButton onClick={() => {}} label="□" />
            <TitleBarButton onClick={onClose} label="×" isClose />
          </div>
        </div>

        {/* Menu bar */}
        <div 
          className="flex gap-4 px-2 py-0.5 border-b"
          style={{ borderColor: "#808080" }}
        >
          <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">
            <u>F</u>ile
          </span>
          <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">
            <u>E</u>dit
          </span>
          <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">
            <u>V</u>iew
          </span>
          <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">
            <u>H</u>elp
          </span>
        </div>

        {/* Content area */}
        <div 
          className="flex-1 m-0.5 overflow-auto"
          style={{
            background: "white",
            border: "2px solid",
            borderColor: "#808080 #ffffff #ffffff #808080",
            maxHeight: height - 80
          }}
        >
          {children}
        </div>

        {/* Status bar */}
        <div 
          className="px-2 py-0.5 text-xs"
          style={{
            borderTop: "1px solid #808080"
          }}
        >
          Ready
        </div>
      </div>
    </div>
  );
}

function WindowIcon() {
  return (
    <div 
      className="w-4 h-4 mr-1"
      style={{
        background: "linear-gradient(135deg, #000080 25%, #0000ff 50%, #000080 75%)"
      }}
    />
  );
}

interface TitleBarButtonProps {
  onClick: () => void;
  label: string;
  isClose?: boolean;
}

function TitleBarButton({ onClick, label, isClose }: TitleBarButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-4 h-4 flex items-center justify-center text-xs font-bold leading-none"
      style={{
        background: "#c0c0c0",
        border: "1px solid",
        borderColor: "#ffffff #404040 #404040 #ffffff",
        fontFamily: "Marlett, sans-serif"
      }}
    >
      {label}
    </button>
  );
}
