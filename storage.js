// storage.js — the ONLY module that talks to the backend.
// To migrate off Apps Script/Drive later, reimplement upload() and list()
// against S3/Supabase/Firebase and nothing else in the app changes.

const BACKEND_URL = 'https://script.google.com/macros/s/AKfycbyyRIXlPtGVk_iZizIjn1_l5aTzfi4y7fOsMK5KIYyoKjdRPeDZJdWLcsmScwAdH40e/exec'; // ends with /exec
const SECRET = 'Fnyli3x1O0HUvxL0iuNFLEzvvUgn59ajQshUaSRZDsTj5ZUOTw';           // must match Code.gs

export async function upload(file) {
  const dataUrl = await readAsDataURL(file);
  const base64 = dataUrl.split(',')[1];

  const res = await fetch(BACKEND_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // avoids CORS preflight
    body: JSON.stringify({
      secret: SECRET,
      name: file.name,
      mime: file.type,
      image: base64,
    }),
  });
  return res.json();
}

export async function list() {
  const res = await fetch(BACKEND_URL + '?secret=' + encodeURIComponent(SECRET) + '&list=1');
  return res.json();
}

export async function sendMessage(imageId, text) {
  const res = await fetch(BACKEND_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ secret: SECRET, action: 'message', imageId, text }),
  });
  return res.json();
}

export async function deleteItem(id, type) {
  const res = await fetch(BACKEND_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ secret: SECRET, action: 'delete', id, type }),
  });
  return res.json();
}

export async function submitGameScore(score) {
  const res = await fetch(BACKEND_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ ...score, secret: SECRET, action: 'gameScore' }),
  });
  if (!res.ok) throw new Error(`Score submission failed (HTTP ${res.status})`);
  return res.json();
}

export async function listGameLeaderboard(category) {
  if (category !== 'touch' && category !== 'mouse_keyboard') {
    throw new Error('Invalid leaderboard category');
  }
  const params = new URLSearchParams({
    secret: SECRET,
    leaderboard: '1',
    category,
  });
  const res = await fetch(`${BACKEND_URL}?${params.toString()}`);
  if (!res.ok) throw new Error(`Leaderboard request failed (HTTP ${res.status})`);
  return res.json();
}

function readAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}
