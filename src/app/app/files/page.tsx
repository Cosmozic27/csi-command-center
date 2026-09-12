'use client';

import React from 'react';
import { FileText, Upload, Folder, Image, FileCode } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';

export default function FilesPage() {
  const sampleFiles = [
    { name: 'CSI_TechFest_Sponsorship_Brochure_v2.pdf', size: '4.2 MB', team: 'Publicity', type: 'pdf' },
    { name: 'Hackathon_Rulebook_2026.docx', size: '1.8 MB', team: 'Documentation', type: 'doc' },
    { name: 'Banner_Asset_Figma_Export.png', size: '12.4 MB', team: 'Graphics', type: 'img' },
    { name: 'Registration_Schema_v1.sql', size: '45 KB', team: 'Technical', type: 'code' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider">
            <FileText className="h-4 w-4" />
            <span>Digital Repository</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground mt-1">
            Media & Asset Storage
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Centralized documents, promotional graphics, reports, and templates.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sampleFiles.map((file, i) => (
          <div
            key={i}
            className="p-4 rounded-xl border border-border/80 bg-card/70 backdrop-blur-md hover:border-cyan-500/40 transition-all flex flex-col justify-between"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <FileText className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-semibold text-xs text-foreground block truncate">
                  {file.name}
                </span>
                <span className="text-[10px] text-muted-foreground font-mono">
                  {file.team} • {file.size}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
