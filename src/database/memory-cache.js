/**
 * In-Memory cache to prevent duplicate processing when Firebase is not configured.
 * This resets on server restart.
 */

const cache = new Map();

// Keep up to 1000 transactions in memory to prevent overflow
const MAX_CACHE_SIZE = 1000;

const saveToCache = (transactionId, data) => {
  if (cache.size >= MAX_CACHE_SIZE) {
    // Remove oldest entry (first item in Map)
    const firstKey = cache.keys().next().value;
    cache.delete(firstKey);
  }
  cache.set(transactionId, {
    ...data,
    processedAt: new Date().toISOString()
  });
};

const existsInCache = (transactionId) => {
  return cache.has(transactionId);
};

const getAllFromCache = () => {
  return Array.from(cache.values()).reverse();
};

module.exports = {
  saveToCache,
  existsInCache,
  getAllFromCache
};
