import { runSolution } from '../utils.ts';

const RULES_TO_UPDATES_MARKER = '';
const RULE_SEPARATOR = '|';

/** provide your solution as the return of this function */
export async function day5a(data: string[]) {
  const endOfRuleIndex = data.findIndex(
    (value) => value === RULES_TO_UPDATES_MARKER
  );
  const rulesList = data.slice(0, endOfRuleIndex);
  const updateStrings = data.slice(endOfRuleIndex + 1);
  const updates = updateStrings.map((update) => update.split(','));

  const rulesMap = rulesList.reduce(
    addRuleToMap,
    new Map<string, Set<string>>()
  );

  const validUpdates = updates.filter((update) => {
    return Array.from(update).every((target, targetIndex) => {
      const targetRules = rulesMap.get(target) ?? new Set<string>();
      const allRulesMatch = Array.from(targetRules).every((rule) =>
        doesTargetObeyRule(update, rule, targetIndex)
      );

      return allRulesMatch;
    });
  });

  const sum = validUpdates.reduce(sumMiddleOfUpdate, 0);
  return sum;
}

await runSolution(day5a);

function addRuleToMap(map: Map<string, Set<string>>, rule: string) {
  const [target, ruleCondition] = rule.split(RULE_SEPARATOR);

  const targetRules = map.get(target) ?? new Set<string>();

  targetRules.add(ruleCondition);
  map.set(target, targetRules);
  return map;
}

function doesTargetObeyRule(
  update: Array<string>,
  rule: string,
  targetIndex: number
): boolean {
  const ruleIndex = update.indexOf(rule);
  if (ruleIndex === -1) {
    return true;
  } else {
    return ruleIndex > targetIndex;
  }
}

function sumMiddleOfUpdate(sum: number, update: Array<string>): number {
  const middleIndex = (update.length - 1) / 2;
  sum += Number(update[middleIndex]);
  return sum;
}
