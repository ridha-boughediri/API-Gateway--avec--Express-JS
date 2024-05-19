const loadbalancer = {};

// Stratégie ROUND_ROBIN : distribue les requêtes de manière circulaire entre les instances
loadbalancer.ROUND_ROBIN = (service) => {
  const newIndex = ++service.index >= service.instances.length ? 0 : service.index;
  service.index = newIndex;
  return service.instances[newIndex];
};

// Stratégie LEAST_USED : distribue les requêtes à l'instance la moins utilisée
loadbalancer.LEAST_USED = (service) => {
  let leastUsedIndex = 0;
  let minLoad = service.instances[0].load;

  for (let i = 1; i < service.instances.length; i++) {
    if (service.instances[i].load < minLoad) {
      leastUsedIndex = i;
      minLoad = service.instances[i].load;
    }
  }

  return service.instances[leastUsedIndex];
};
