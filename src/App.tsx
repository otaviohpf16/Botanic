/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  FileText, 
  MoreHorizontal, 
  Share2, 
  Download, 
  ChevronRight,
  Settings,
  History,
  Code2,
  Terminal,
  Search,
  Check
} from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('untitled_file.txt');

  return (
    <div className="h-screen w-full bg-[#FDFDFD] text-[#1A1A1A] font-sans flex flex-col overflow-hidden selection:bg-gray-200">
      {/* Top Navigation / Header */}
      <header className="h-14 border-b border-gray-100 flex items-center justify-between px-6 bg-white shrink-0">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-200" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Workspace</span>
          </div>
          <nav className="flex gap-6">
            <button className="text-sm font-medium text-gray-900 border-b-2 border-gray-900 pb-4 mt-1">Editor</button>
            <button className="text-sm font-medium text-gray-400 pb-4 mt-1 hover:text-gray-600 transition-colors">History</button>
            <button className="text-sm font-medium text-gray-400 pb-4 mt-1 hover:text-gray-600 transition-colors">Settings</button>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-1.5 text-xs font-semibold border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
            <Share2 className="w-3 h-3" />
            Share
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 text-xs font-semibold bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-shadow">
            <Download className="w-3 h-3" />
            Export
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar: File Explorer */}
        <aside className="w-64 border-r border-gray-100 flex flex-col bg-[#FAFAFA] shrink-0">
          <div className="p-4 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Project Files</span>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 px-2 space-y-1">
            <motion.div 
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center gap-3 px-3 py-2 bg-white border border-gray-200 rounded-md shadow-sm cursor-pointer"
            >
              <FileText className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-700 font-medium">{activeTab}</span>
            </motion.div>
          </div>
          <div className="p-4 border-t border-gray-100">
            <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "33%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gray-400" 
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-2 font-medium">Storage: 12KB / 50MB</p>
          </div>
        </aside>

        {/* Main Editor Surface */}
        <main className="flex-1 flex flex-col bg-white relative overflow-hidden">
          {/* Tabs Bar */}
          <div className="flex border-b border-gray-100 bg-[#FAFAFA] h-10 shrink-0">
            <div className="bg-white border-r border-gray-100 px-6 py-0 flex items-center gap-3 h-full">
              <span className="text-xs font-medium text-gray-600">{activeTab}</span>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            </div>
          </div>

          {/* Blank Canvas / Editor Area */}
          <div className="flex-1 relative flex overflow-hidden">
            {/* Gutter / Line Numbers */}
            <div className="w-12 bg-[#FCFCFC] border-r border-gray-50 flex flex-col items-center pt-6 gap-2 shrink-0 select-none">
              {[1, 2, 3].map((num) => (
                <span key={num} className="text-[10px] text-gray-300 font-mono" style={{ opacity: 1 - (num * 0.2) }}>
                  {num}
                </span>
              ))}
            </div>
            
            {/* The "Blank" content */}
            <div className="flex-1 p-8 flex flex-col justify-center items-center">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.4, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-1 bg-gray-100 mb-6 rounded-full" />
                <h2 className="text-2xl font-light text-gray-400 tracking-tight italic">New Beginning</h2>
                <p className="text-sm text-gray-300 mt-2">Start typing to create your project</p>
                
                <div className="mt-16 grid grid-cols-2 gap-x-16 gap-y-6 text-[11px] font-medium text-gray-300 uppercase tracking-widest">
                  <div className="flex items-center gap-3 group cursor-default">
                    <span className="group-hover:text-gray-400 transition-colors">Cmd + N</span> 
                    <span className="text-gray-200">New File</span>
                  </div>
                  <div className="flex items-center gap-3 group cursor-default">
                    <span className="group-hover:text-gray-400 transition-colors">Cmd + S</span> 
                    <span className="text-gray-200">Save</span>
                  </div>
                  <div className="flex items-center gap-3 group cursor-default">
                    <span className="group-hover:text-gray-400 transition-colors">Cmd + P</span> 
                    <span className="text-gray-200">Search</span>
                  </div>
                  <div className="flex items-center gap-3 group cursor-default">
                    <span className="group-hover:text-gray-400 transition-colors">Cmd + K</span> 
                    <span className="text-gray-200">Terminal</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Blinking cursor simulation */}
            <motion.div 
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1, ease: "steps(2)" }}
              className="absolute top-6 left-16 w-0.5 h-5 bg-blue-500" 
            />
          </div>

          {/* Status Bar */}
          <footer className="h-8 border-t border-gray-100 flex items-center justify-between px-4 bg-white shrink-0">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-400 font-medium">UTF-8</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-400 font-medium">Line 1, Col 1</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-gray-400 font-medium">Plain Text</span>
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-[10px] text-gray-400 font-medium">Ready</span>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
