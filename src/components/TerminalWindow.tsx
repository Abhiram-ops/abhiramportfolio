import { cn } from "@/lib/utils";

interface TerminalWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const TerminalWindow = ({ title, children, className }: TerminalWindowProps) => {
  return (
    <div className={cn("terminal-window", className)}>
      <div className="terminal-title-bar">
        <div className="terminal-dots">
          <div className="terminal-dot red"></div>
          <div className="terminal-dot yellow"></div>
          <div className="terminal-dot green"></div>
        </div>
        <span className="text-terminal-bg font-mono font-bold text-sm">{title}</span>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};