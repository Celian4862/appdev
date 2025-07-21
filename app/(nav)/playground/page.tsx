"use client";

import { useState, useRef, useEffect } from "react";

type Language = "c" | "java" | "python";

interface FileTab {
  name: string;
  language: string;
  content: string;
}

export default function PlaygroundPage() {
  const [language, setLanguage] = useState<Language>("c");
  const [pendingLanguage, setPendingLanguage] = useState<Language | null>(null);
  const [showConfirmSwitchModal, setShowConfirmSwitchModal] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [files, setFiles] = useState<FileTab[]>([
    { name: "main.c", language: "c", content: "" },
  ]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [newFileExt, setNewFileExt] = useState(".c");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [fileToDeleteIndex, setFileToDeleteIndex] = useState<number | null>(null);
  const [cursorLine, setCursorLine] = useState(1);
  const [cursorColumn, setCursorColumn] = useState(1);
  const editorRef = useRef<HTMLTextAreaElement | null>(null);

  const extOptions: Record<Language, string[]> = {
    c: [".c", ".h"],
    java: [".java"],
    python: [".py"],
  };

  const defaultNameMap: Record<Language, string> = {
    c: "main",
    java: "Main",
    python: "script",
  };

  const switchLanguage = (newLang: Language) => {
    setLanguage(newLang);
    setFiles([
      {
        name: `${defaultNameMap[newLang]}${extOptions[newLang][0]}`,
        language: newLang,
        content: "",
      },
    ]);
    setActiveIndex(0);
    setNewFileExt(extOptions[newLang][0]);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value as Language;
    if (selectedLang === language) return;

    const expectedInitialName = `${defaultNameMap[language]}${extOptions[language][0]}`;
    const initialFile = files[0];
    const hasRenamedInitial = initialFile.name !== expectedInitialName;
    const hasEditedInitial = initialFile.content.trim() !== "";
    const hasExtraFiles = files.length > 1;

    if (hasExtraFiles || hasRenamedInitial || hasEditedInitial) {
      setPendingLanguage(selectedLang);
      setShowConfirmSwitchModal(true);
    } else {
      switchLanguage(selectedLang);
    }
  };

  const addFile = () => {
    if (!newFileName.trim()) return;
    const filename = `${newFileName.trim()}${newFileExt}`;
    const newFile: FileTab = { name: filename, language, content: "" };
    setFiles([...files, newFile]);
    setActiveIndex(files.length);
    setNewFileName("");
    setShowModal(false);
  };

  const confirmDeleteFile = () => {
    if (fileToDeleteIndex === null) return;
    const updated = [...files];
    updated.splice(fileToDeleteIndex, 1);

    let newActive = activeIndex;
    if (fileToDeleteIndex === activeIndex) {
      newActive = fileToDeleteIndex > 0 ? fileToDeleteIndex - 1 : 0;
    } else if (fileToDeleteIndex < activeIndex) {
      newActive = activeIndex - 1;
    }

    setFiles(updated);
    setActiveIndex(newActive);
    setFileToDeleteIndex(null);
    setShowDeleteModal(false);
  };

  const updateFileContent = (value: string) => {
    const updated = [...files];
    updated[activeIndex].content = value;
    setFiles(updated);
  };

  const handleCursorPosition = () => {
    const textarea = editorRef.current;
    if (!textarea) return;
    const pos = textarea.selectionStart;
    const textUptoCursor = textarea.value.slice(0, pos);
    const lines = textUptoCursor.split("\n");
    setCursorLine(lines.length);
    setCursorColumn(lines[lines.length - 1].length + 1);
  };

  const getLineNumbers = () => {
    const lineCount = files[activeIndex].content.split("\n").length;
    return Array.from({ length: lineCount }, (_, i) => i + 1);
  };

  return (
    <div className="bg-black text-white py-4 px-4 min-h-screen w-full">
      <div className="max-w-6xl mx-auto flex flex-col h-[calc(100vh-2rem)] rounded-lg overflow-hidden border border-white/20 mt-24">
        {/* Top Bar */}
        <div className="flex items-center justify-between border-b border-white/20 px-4 py-3 bg-zinc-900">
          <div className="flex items-center gap-2">
            {files.map((file, i) => (
              <div key={i} className="flex items-center bg-zinc-800 rounded-md overflow-hidden">
                <button
                  className={`px-3 py-1 text-sm ${i === activeIndex ? "bg-blue-600 text-white" : "text-zinc-300"}`}
                  onClick={() => setActiveIndex(i)}
                >
                  {file.name}
                </button>
                {files.length > 1 && (
                  <button
                    onClick={() => {
                      setFileToDeleteIndex(i);
                      setShowDeleteModal(true);
                    }}
                    className="px-2 text-lg text-red-400 hover:text-red-200"
                    title="Delete file"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => setShowModal(true)}
              className="bg-zinc-700 px-3 py-1 rounded-md text-lg"
            >
              +
            </button>
          </div>
          <div className="flex items-center gap-2">
            <select
              className="bg-zinc-800 px-3 py-1 rounded-md"
              value={language}
              onChange={handleLanguageChange}
            >
              <option value="c">C</option>
              <option value="java">Java</option>
              <option value="python">Python</option>
            </select>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md">
              ▶ Run
            </button>
          </div>
        </div>

        {/* Code Editor + Terminal */}
        <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
          <div className="flex flex-1 h-full bg-black border-b md:border-b-0 md:border-r border-white/20 font-mono text-sm">
            <div className="flex-1 overflow-auto">
              <div className="flex min-h-full w-full">
                <div className="bg-zinc-900 text-zinc-400 py-4 px-4 text-right select-none">
                  {getLineNumbers().map((line) => (
                    <div
                      key={line}
                      className={`h-5 px-2 ${line === cursorLine ? "bg-zinc-800 text-white w-full" : ""}`}
                    >
                      {line}
                    </div>
                  ))}
                </div>
                <textarea
                  ref={editorRef}
                  value={files[activeIndex].content}
                  onChange={(e) => updateFileContent(e.target.value)}
                  onClick={handleCursorPosition}
                  onKeyUp={handleCursorPosition}
                  className="flex-1 resize-none p-4 bg-black text-white outline-none"
                  placeholder="Write your code here..."
                />
              </div>
            </div>
          </div>

          {/* Terminal Output */}
          <div className={`${showTerminal ? "flex" : "hidden"} md:flex flex-1 flex-col bg-zinc-950 p-4 font-mono text-sm border-t md:border-t-0 md:border-l border-white/20`}>
            <div className="mb-2 font-semibold">Output:</div>
            <textarea
              readOnly
              className="flex-1 resize-none bg-transparent text-white"
              placeholder="Output will appear here..."
            />
          </div>
        </div>

        {/* Status Bar */}
        <div className="px-4 py-2 bg-zinc-900 text-xs border-t border-white/20 text-right">
          Line {cursorLine}, Column {cursorColumn}
        </div>
      </div>

      {/* Add File Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-6 rounded-lg w-[90%] max-w-sm border border-white/20">
            <h2 className="text-lg font-bold mb-4">Add New File</h2>
            <div className="mb-4">
              <label className="block mb-1">Filename</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  className="flex-1 px-3 py-1 rounded bg-zinc-800 border border-white/10"
                  placeholder="e.g. utils"
                />
                <select
                  value={newFileExt}
                  onChange={(e) => setNewFileExt(e.target.value)}
                  className="px-2 py-1 rounded bg-zinc-800 border border-white/10"
                >
                  {extOptions[language].map((ext) => (
                    <option key={ext} value={ext}>
                      {ext}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1 rounded bg-zinc-700 hover:bg-zinc-600"
              >
                Cancel
              </button>
              <button
                onClick={addFile}
                className="px-4 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white"
              >
                Add File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {showDeleteModal && fileToDeleteIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-6 rounded-lg w-[90%] max-w-sm border border-white/20">
            <h2 className="text-lg font-bold mb-4">Delete File</h2>
            <p className="mb-4 text-sm">
              Are you sure you want to delete{" "}
              <strong>{files[fileToDeleteIndex].name}</strong>?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setFileToDeleteIndex(null);
                }}
                className="px-4 py-1 rounded bg-zinc-700 hover:bg-zinc-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteFile}
                className="px-4 py-1 rounded bg-red-600 hover:bg-red-500 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Switch Language Modal */}
      {showConfirmSwitchModal && pendingLanguage && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-6 rounded-lg w-[90%] max-w-sm border border-white/20">
            <h2 className="text-lg font-bold mb-4">Switch Language</h2>
            <p className="mb-4 text-sm">Switching language will discard your current files. Are you sure?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowConfirmSwitchModal(false)}
                className="px-4 py-1 rounded bg-zinc-700 hover:bg-zinc-600"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  switchLanguage(pendingLanguage);
                  setShowConfirmSwitchModal(false);
                  setPendingLanguage(null);
                }}
                className="px-4 py-1 rounded bg-red-600 hover:bg-red-500 text-white"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
