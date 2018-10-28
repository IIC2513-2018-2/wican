function initiativePath(ngoId, initiativeId, pathSuffix = '') {
  return `/ngos/${ngoId}/initiatives/${initiativeId}${pathSuffix}`;
}

export function fetchInitiative(ngoId, initiativeId) {
  const path = initiativePath(ngoId, initiativeId);
  return fetch(path, { headers: { Accept: 'application/json' } })
    .then(response => response.json());
}

export function signInitiative(ngoId, initiativeId, userData) {
  const path = initiativePath(ngoId, initiativeId, '/sign');
  return fetch(path, {
    method: 'put',
    body: JSON.stringify(userData),
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  })
    .then(response => response.json());
}
