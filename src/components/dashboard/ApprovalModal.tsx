'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { ShieldCheck, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import type { Approval } from '@/types/entities';

interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  approval: Approval | null;
  onApprove: (approvalId: string, comment: string) => void;
  onRequestChanges: (approvalId: string, comment: string) => void;
}

export function ApprovalModal({
  isOpen,
  onClose,
  approval,
  onApprove,
  onRequestChanges,
}: ApprovalModalProps) {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!approval) return null;

  const handleApprove = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onApprove(approval.id, comment || 'Approved by reviewer.');
      setIsSubmitting(false);
      setComment('');
      onClose();
    }, 300);
  };

  const handleRequestChanges = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onRequestChanges(approval.id, comment || 'Revisions requested by reviewer.');
      setIsSubmitting(false);
      setComment('');
      onClose();
    }, 300);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Governance Review & Sign-Off"
      subtitle={`Stage: ${approval.currentStage.replace('_', ' ')} • ID: ${approval.id}`}
      maxWidth="lg"
    >
      <div className="space-y-4">
        {/* Item Header */}
        <div className="rounded-xl border border-border/80 bg-card/60 p-4 space-y-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-sm font-bold text-foreground">{approval.title}</h3>
            <StatusBadge status={approval.status} size="sm" />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {approval.description}
          </p>

          <div className="pt-3 border-t border-border/40 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Requested by: {approval.requestedByName}</span>
            <span>Date: {new Date(approval.submittedAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Attachment preview simulation */}
        <div className="flex items-center justify-between p-3 rounded-lg border border-cyan-500/20 bg-cyan-500/5">
          <div className="flex items-center gap-2.5">
            <FileText className="h-4 w-4 text-cyan-400" />
            <span className="text-xs font-mono text-cyan-300">
              Attached Deliverable / Document Archive
            </span>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">
            READY FOR AUDIT
          </span>
        </div>

        {/* Feedback / Review Notes */}
        <div>
          <label className="text-xs font-semibold text-foreground uppercase tracking-wider block mb-1">
            Reviewer Remarks / Feedback
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Provide official feedback, conditions for approval, or instructions for required edits..."
            rows={3}
            className="w-full rounded-lg border border-border/80 bg-card/60 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-cyan-500/60 focus:bg-card/90 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-border/60">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              isLoading={isSubmitting}
              onClick={handleRequestChanges}
              className="hover:border-amber-500 hover:text-amber-300"
            >
              <AlertCircle className="h-3.5 w-3.5 mr-1 text-amber-400" />
              Request Modifications
            </Button>

            <Button
              type="button"
              variant="primary"
              size="sm"
              isLoading={isSubmitting}
              onClick={handleApprove}
            >
              <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
              Approve Sign-Off
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
