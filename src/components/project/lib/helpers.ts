export function getDeadlineInfo(deadline: string | null) {
  if (!deadline) {
    return null;
  }
  const diff = Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  if (diff < 0) {
    return { label: "Overdue", cls: "badge-error" };
  }
  if (diff <= 2) {
    return { label: `${diff}d left`, cls: "badge-warning" };
  }
  return { label: `${diff}d left`, cls: "badge-ghost" };
}
