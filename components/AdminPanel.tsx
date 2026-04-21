'use client';

import { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { useNames } from '@/hooks/useNames';

export default function AdminPanel() {
  const { names, setNames } = useNames();
  const [newName, setNewName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [excelFileName, setExcelFileName] = useState('');
  const [excelPreview, setExcelPreview] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showMessage = (msg: string, isError = false) => {
    if (isError) {
      setErrorMessage(msg);
      setTimeout(() => setErrorMessage(''), 3500);
    } else {
      setSuccessMessage(msg);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const addName = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setNames([...names, newName.trim()]);
    setNewName('');
    showMessage(`"${newName.trim()}" added successfully`);
  };

  const deleteName = (nameToDelete: string) => {
    setNames(names.filter((n) => n !== nameToDelete));
    showMessage(`"${nameToDelete}" removed`);
  };

  const clearAll = () => {
    if (!window.confirm(`Remove all ${names.length} names? This cannot be undone.`)) return;
    setNames([]);
    showMessage('All names cleared');
  };

  const downloadTemplate = () => {
    const worksheetData = [['Name'], ['John Smith'], ['Jane Doe'], ['']];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    worksheet['!cols'] = [{ wch: 30 }];
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Names');
    XLSX.writeFile(workbook, 'names_template.xlsx');
  };

  const handleExcelFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowed = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    if (!allowed.includes(file.type) && !file.name.match(/\.(xlsx|xls)$/i)) {
      showMessage('Please upload a valid .xlsx or .xls file', true);
      return;
    }
    setExcelFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows: string[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const extracted = rows.slice(1).flat().map((c) => String(c ?? '').trim()).filter((v) => v.length > 0 && v.length <= 100);
        setExcelPreview(extracted);
      } catch {
        showMessage('Failed to read file. Ensure it is not corrupted.', true);
        setExcelFileName('');
        setExcelPreview([]);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const uploadExcelNames = () => {
    if (excelPreview.length === 0) return;
    setIsLoading(true);
    setNames([...names, ...excelPreview]);
    showMessage(`Imported ${excelPreview.length} names from "${excelFileName}"`);
    setExcelPreview([]);
    setExcelFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    setIsLoading(false);
  };

  const cancelExcel = () => {
    setExcelPreview([]);
    setExcelFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-5">
      {/* Toast messages */}
      {successMessage && (
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-4 py-3 text-sm font-500 animate-in fade-in">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm font-500 animate-in fade-in">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          {errorMessage}
        </div>
      )}

      {/* Add single name */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-accent to-rose-400" />
        <div className="p-7">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <h3 className="text-base font-700 text-foreground">Add a Name</h3>
          </div>
          <form onSubmit={addName} className="flex gap-2.5">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter a name..."
              className="flex-1 px-4 py-2.5 border border-border rounded-xl bg-background text-foreground placeholder-muted-foreground text-sm font-500 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
            />
            <button
              type="submit"
              disabled={!newName.trim()}
              className="px-5 py-2.5 bg-accent hover:bg-accent/90 text-white rounded-xl text-sm font-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
            >
              Add
            </button>
          </form>
        </div>
      </div>

      {/* Excel upload */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-emerald-400 to-teal-400" />
        <div className="p-7 space-y-5">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
            </div>
            <h3 className="text-base font-700 text-foreground">Import from Excel</h3>
          </div>

          {/* Step 1 */}
          <div className="flex gap-4 p-4 bg-muted/40 rounded-xl border border-border">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-foreground text-background text-xs font-700 flex items-center justify-center mt-0.5">1</span>
            <div className="space-y-2 flex-1">
              <p className="text-sm font-600 text-foreground">Download the template</p>
              <p className="text-xs text-muted-foreground">Fill in names in the <strong>Name</strong> column, one per row.</p>
              <button
                onClick={downloadTemplate}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-foreground hover:bg-foreground/90 text-background rounded-xl text-xs font-600 transition-all active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download Template
              </button>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4 p-4 bg-muted/40 rounded-xl border border-border">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-foreground text-background text-xs font-700 flex items-center justify-center mt-0.5">2</span>
            <div className="space-y-3 flex-1">
              <p className="text-sm font-600 text-foreground">Upload your file</p>
              <p className="text-xs text-muted-foreground">Only <strong>.xlsx</strong> / <strong>.xls</strong> accepted.</p>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-accent/50 hover:bg-accent/5 transition-all group"
              >
                <input ref={fileInputRef} type="file" accept=".xlsx,.xls" onChange={handleExcelFile} className="hidden" />
                {excelFileName ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    <p className="text-sm font-500 text-foreground">{excelFileName}</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-muted-foreground mx-auto group-hover:text-accent transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    <p className="text-sm text-muted-foreground font-500">Click to select a file</p>
                    <p className="text-xs text-muted-foreground">.xlsx or .xls</p>
                  </div>
                )}
              </div>

              {excelPreview.length > 0 && (
                <div className="space-y-3 pt-1">
                  <p className="text-xs font-600 text-muted-foreground uppercase tracking-wide">
                    Preview — {excelPreview.length} name{excelPreview.length !== 1 ? 's' : ''} found
                  </p>
                  <div className="bg-background border border-border rounded-xl p-3 max-h-40 overflow-y-auto flex flex-wrap gap-1.5">
                    {excelPreview.map((name, i) => (
                      <span key={i} className="px-2.5 py-1 bg-muted text-foreground rounded-lg text-xs font-500">
                        {name}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={uploadExcelNames}
                      disabled={isLoading}
                      className="flex-1 py-2.5 bg-accent hover:bg-accent/90 text-white rounded-xl text-sm font-600 transition-all disabled:opacity-50 active:scale-[0.98]"
                    >
                      {isLoading ? 'Importing...' : `Import ${excelPreview.length} Names`}
                    </button>
                    <button
                      onClick={cancelExcel}
                      className="px-4 py-2.5 border border-border rounded-xl text-sm font-500 hover:bg-muted transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Names list */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-violet-400 to-purple-400" />
        <div className="p-7">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-violet-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
              </div>
              <h3 className="text-base font-700 text-foreground">Names List</h3>
              <span className="bg-muted text-muted-foreground text-xs font-600 px-2 py-0.5 rounded-full">{names.length}</span>
            </div>
            {names.length > 0 && (
              <button
                onClick={clearAll}
                className="text-xs font-500 text-muted-foreground hover:text-destructive transition-colors"
              >
                Clear all
              </button>
            )}
          </div>

          {names.length === 0 ? (
            <div className="text-center py-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <p className="text-muted-foreground text-sm font-500">No names yet. Add some above to get started.</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {names.map((name, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-background rounded-xl px-4 py-3 border border-border hover:border-accent/30 hover:bg-accent/5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground font-500 w-5 text-right tabular-nums">{index + 1}</span>
                    <span className="text-sm font-500 text-foreground">{name}</span>
                  </div>
                  <button
                    onClick={() => deleteName(name)}
                    className="opacity-0 group-hover:opacity-100 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
                    title="Remove"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
