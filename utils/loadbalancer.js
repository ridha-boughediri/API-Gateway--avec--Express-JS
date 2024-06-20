const loadbalancer = {};

// Stratégie ROUND_ROBIN : distribue les requêtes de manière circulaire entre les instances
loadbalancer.ROUND_ROBIN = (service) => {
  const newIndex = (service.index + 1) % service.instances.length;
  service.index = newIndex;
  return service.instances[newIndex];
};

// Stratégie LEAST_USED : distribue les requêtes à l'instance la moins utilisée
loadbalancer.LEAST_USED = (service) => {
  let leastUsedIndex = 0;
  let minLoad = service.instances[0].load || 0;

  for (let i = 1; i < service.instances.length; i++) {
    const load = service.instances[i].load || 0;
    if (load < minLoad) {
      leastUsedIndex = i;
      minLoad = load;
    }
  }

  return service.instances[leastUsedIndex];
};

module.exports = loadbalancer;
