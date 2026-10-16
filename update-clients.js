// Runs inside the waiting service worker. Reports other live clients in this PWA scope.
self.addEventListener('message', event => {
  if (event.data?.type !== 'JINGCHAO_CHECK_CLIENTS') return;
  event.waitUntil((async () => {
    const all = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    const prefix = new URL(self.registration.scope).pathname;
    const other = all.filter(client =>
      new URL(client.url).pathname.startsWith(prefix) && client.id !== event.source?.id
    ).length;
    event.ports[0]?.postMessage({ other });
  })());
});
