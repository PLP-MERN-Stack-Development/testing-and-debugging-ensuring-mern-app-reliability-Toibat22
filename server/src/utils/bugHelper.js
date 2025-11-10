// server/src/utils/bugHelper.js
export function validateBug(bug) {
  if (!bug.title || !bug.description) return false;
  return true;
}
