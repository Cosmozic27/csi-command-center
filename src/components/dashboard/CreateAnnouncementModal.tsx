'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Announcement, AnnouncementPriority, AnnouncementVisibility } from '@/types/entities';

interface CreateAnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAnnouncementCreated: (ann: Announcement) => void;
  authorName: string;
}

export function CreateAnnouncementModal({
  isOpen,
  onClose,
  onAnnouncementCreated,
  authorName,
}: CreateAnnouncementModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [visibility, setVisibility] = useState<AnnouncementVisibility>('COMMITTEE');
  const [priority, setPriority] = useState<AnnouncementPriority>('NORMAL');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newAnn: Announcement = {
        id: `ann-${Date.now()}`,
        title: title.trim(),
        content: content.trim(),
        createdById: 'usr-current',
        createdByName: authorName,
        visibility,
        priority,
        publishedAt: new Date().toISOString(),
        expiresAt: null,
      };

      onAnnouncementCreated(newAnn);
      setIsSubmitting(false);
      setTitle('');
      setContent('');
      onClose();
    }, 300);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Broadcast Committee Announcement"
      subtitle="Publish an official operational directive or bulletin to committee channels."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-foreground uppercase tracking-wider block mb-1">
            Announcement Title
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Mandatory All-Hands Sync for TechFest Prep"
            required
            autoFocus
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-foreground uppercase tracking-wider block mb-1">
            Bulletin Message
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Provide complete details, time, venue, and required actions..."
            rows={4}
            className="w-full rounded-lg border border-border/80 bg-card/60 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-cyan-500/60 focus:bg-card/90 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-foreground uppercase tracking-wider block mb-1">
              Target Audience
            </label>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value as AnnouncementVisibility)}
              className="w-full rounded-lg border border-border/80 bg-card/60 px-3 py-2 text-xs text-foreground focus:border-cyan-500/60 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            >
              <option value="COMMITTEE" className="bg-card">All 9 Teams (Internal)</option>
              <option value="PUBLIC" className="bg-card">Public (Entire College)</option>
              <option value="CORE" className="bg-card">Core Leadership Only</option>
              <option value="FACULTY" className="bg-card">Faculty Council</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground uppercase tracking-wider block mb-1">
              Priority Tier
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as AnnouncementPriority)}
              className="w-full rounded-lg border border-border/80 bg-card/60 px-3 py-2 text-xs text-foreground focus:border-cyan-500/60 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            >
              <option value="NORMAL" className="bg-card">Normal Notice</option>
              <option value="HIGH" className="bg-card">High Priority</option>
              <option value="URGENT" className="bg-card">Urgent Broadcast</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/60">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting}>
            Transmit Bulletin
          </Button>
        </div>
      </form>
    </Modal>
  );
}
