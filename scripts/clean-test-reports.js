#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEST_RESULTS_DIR = path.join(__dirname, '../test-results');
const KEEP_COUNT = 10;

function cleanTestReports() {
  if (!fs.existsSync(TEST_RESULTS_DIR)) {
    console.log('Test results directory not found, skipping cleanup');
    return;
  }

  // Get all test result directories
  const items = fs.readdirSync(TEST_RESULTS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => {
      const itemPath = path.join(TEST_RESULTS_DIR, dirent.name);
      const stats = fs.statSync(itemPath);
      return {
        name: dirent.name,
        path: itemPath,
        mtime: stats.mtime.getTime()
      };
    });

  // Sort by modification time (newest first)
  items.sort((a, b) => b.mtime - a.mtime);

  // Keep only the first KEEP_COUNT items
  const itemsToDelete = items.slice(KEEP_COUNT);

  if (itemsToDelete.length === 0) {
    console.log(`No test reports to clean up (only ${items.length} found, keeping all)`);
    return;
  }

  console.log(`Cleaning up ${itemsToDelete.length} old test reports...`);

  itemsToDelete.forEach(item => {
    try {
      // Delete directory recursively
      fs.rmSync(item.path, { recursive: true, force: true });
      console.log(`Deleted: ${item.name}`);
    } catch (error) {
      console.error(`Error deleting ${item.name}:`, error.message);
    }
  });

  console.log(`Cleanup completed. Kept ${KEEP_COUNT} most recent test reports.`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  cleanTestReports();
}

export default cleanTestReports;
