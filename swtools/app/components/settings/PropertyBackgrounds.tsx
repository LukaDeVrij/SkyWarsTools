"use client";
import React, { useState } from "react";
import Button from "../universal/Button";
import { Edit, X } from "lucide-react";

const PropertyCombobox: React.FC<{ value?: string | null }> = ({ value }) => {
    const [showDialog, setShowDialog] = useState(false);

    return (
        <>
            <div className="flex justify-between items-start lg:items-center gap-2 rounded-lg w-full flex-col lg:flex-row">
                <div>
                    <div className="flex items-center">
                        <strong className="text-lg">Profile Background</strong>
                    </div>
                    <div className="text-sm text-gray-200 mt-[-6px]">The image shown on your MC account page</div>
                </div>
                <div className="flex flex-row gap-4 items-center font-semibold">
                    <span className="text-2xl">{value}</span>
                    <Button onClick={() => setShowDialog(true)}><Edit /></Button>
                </div>
            </div>
            {showDialog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="p-8 rounded-xl w-[1150px] h-[500px] bg-red-500 relative">
                        <button
                            className="absolute top-4 right-4 text-white"
                            onClick={() => setShowDialog(false)}
                            aria-label="Close"
                        >
                            <X size={32} />
                        </button>
                        <h2 className="text-2xl font-bold mb-4">Change Profile Background</h2>
                        {/* Your background selection UI goes here */}
                        <p>Background selection UI here...</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default PropertyCombobox;