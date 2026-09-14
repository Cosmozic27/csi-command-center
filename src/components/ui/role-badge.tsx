import React from 'react';
import type { UserRole } from '@/types/entities';
import { ShieldCheck, Crown, Sparkles, UserCheck, Users, User } from 'lucide-react';
interface RoleBadgeProps { role: UserRole; showIcon?: boolean; size?: 'sm' | 'md'; className?: string; }
const roleConfig: Record<UserRole, { label: string; bg: string; text: string; border: string; icon: React.ComponentType<{ className?: string }> }> = {
  FACULTY: { label: 'Faculty Sponsor', bg: 'bg-[#e4eee3]', text: 'text-[#58735b]', border: 'border-[#b7ceb7]', icon: ShieldCheck },
  CORE: { label: 'Core Committee', bg: 'bg-[#eadfd5]', text: 'text-[#795548]', border: 'border-[#cdb8a5]', icon: Crown },
  ADVISORY: { label: 'Advisory Board', bg: 'bg-[#eee4db]', text: 'text-[#6b5147]', border: 'border-[#d4bdaa]', icon: Sparkles },
  TEAM_LEAD: { label: 'Team Lead', bg: 'bg-[#eee4db]', text: 'text-[#6b5147]', border: 'border-[#d4bdaa]', icon: UserCheck },
  TEAM_MEMBER: { label: 'Team Member', bg: 'bg-[#eee8df]', text: 'text-[#756b63]', border: 'border-[#d8c7b5]', icon: Users },
  GENERAL_MEMBER: { label: 'General Member', bg: 'bg-[#eee8df]', text: 'text-[#756b63]', border: 'border-[#d8c7b5]', icon: User },
};
export function RoleBadge({ role, showIcon = true, size = 'sm', className = '' }: RoleBadgeProps) { const config = roleConfig[role] || roleConfig.GENERAL_MEMBER; const Icon = config.icon; const sizeStyles = size === 'sm' ? 'px-2 py-0.5 text-xs font-semibold' : 'px-2.5 py-1 text-sm font-semibold'; return <span className={`inline-flex items-center gap-1.5 rounded-md border ${config.bg} ${config.text} ${config.border} ${sizeStyles} ${className}`}>{showIcon && <Icon className="h-3 w-3 shrink-0" />}{config.label}</span>; }
