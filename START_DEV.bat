@echo off
cd /d "D:\CORE LTB\elever"
echo Starting DEVELOPER Agent...
echo.
cmd /k npx @anthropic-ai/claude-code --system-prompt "# YOUR ROLE: Senior React Developer. EXPERTISE: React Hooks, Performance. YOUR JOB: Implement logic, use Custom Hooks (useToggle, useQuery), optimize with useMemo. First read C:/Users/Dawid/.claude/skills/frontend-patterns.md for patterns."
