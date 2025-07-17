import React from 'react';

const FileUploadButton = ({ label, id, fileName, onChange }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className="flex items-center gap-4">
                <label
                    htmlFor={id}
                    className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <span>Upload File</span>
                    <input id={id} name={id} type="file" className="sr-only" onChange={onChange} />
                </label>
                {fileName && <span className="text-sm text-gray-600 truncate">{fileName}</span>}
            </div>
        </div>
    );
};

export default FileUploadButton;