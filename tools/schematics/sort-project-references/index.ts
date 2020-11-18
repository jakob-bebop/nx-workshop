import { chain, externalSchematic, Rule } from '@angular-devkit/schematics';
import { updateJsonInTree } from '@nrwl/workspace';

function incrementversion() {
  return updateJsonInTree('package.json', (json) => {
    const current = json.version.split('.');
    return {
      ...json,
      version: current
        .map((v, i) => (i !== 2 ? v : String(parseInt(v) + 1)))
        .join('.'),
    };
  });
}

function sortProjects() {
  return updateJsonInTree('workspace.json', (json) => ({
    ...json,
    projects: sortObjectKeys(json.projects),
  }));
}

function sortObjectKeys(obj: any) {
  const sorted = {};
  Object.keys(obj)
    .sort()
    .forEach((key) => {
      sorted[key] = obj[key];
    });
  return sorted;
}
export default function (schema: any): Rule {
  return chain([incrementversion(), sortProjects()]);
}
