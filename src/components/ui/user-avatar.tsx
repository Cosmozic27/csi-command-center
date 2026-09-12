import React from 'react';

interface UserAvatarProps {
  name: string;
  avatarUrl?: string | null;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isOnline?: boolean;
  className?: string;
}

const sizeConfig = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
};

const dotConfig = {
  xs: 'h-1.5 w-1.5 bottom-0 right-0',
  sm: 'h-2 w-2 bottom-0 right-0',
  md: 'h-2.5 w-2.5 bottom-0.5 right-0.5',
  lg: 'h-3 w-3 bottom-0.5 right-0.5',
};

export function UserAvatar({
  name,
  avatarUrl,
  size = 'md',
  isOnline = true,
  className = '',
}: UserAvatarProps) {
  const getInitials = (n: string) => {
    return n
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={`relative inline-flex shrink-0 ${className}`}>
      {avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatarUrl}
          alt={name}
          className={`rounded-full object-cover ring-1 ring-cyan-500/30 ${sizeConfig[size]}`}
        />
      ) : (
        <div
          className={`flex items-center justify-center rounded-full bg-linear-to-br from-cyan-600/30 to-violet-600/30 font-semibold text-cyan-200 ring-1 ring-cyan-500/30 shadow-inner ${sizeConfig[size]}`}
        >
          {getInitials(name)}
        </div>
      )}
      {isOnline !== undefined && (
        <span
          className={`absolute rounded-full border border-background ${dotConfig[size]} ${
            isOnline ? 'bg-emerald-400 ring-1 ring-emerald-500/40' : 'bg-slate-500'
          }`}
        />
      )}
    </div>
  );
}
