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

  const rulesMap = rulesList.reduce((map, rule) => {
    const [target, ruleCondition] = rule.split(RULE_SEPARATOR);

    const targetRules = map.get(target) ?? new Set<string>();

    targetRules.add(ruleCondition);
    map.set(target, targetRules);
    return map;
  }, new Map<string, Set<string>>());

  const validUpdates = updates.filter((update) => {
    return Array.from(update).every((target, targetIndex) => {
      const targetRules = rulesMap.get(target) ?? new Set<string>();
      const allRulesMatch = Array.from(targetRules).every((rule) => {
        const ruleIndex = update.indexOf(rule);
        if (ruleIndex === -1) {
          return true;
        } else {
          return ruleIndex > targetIndex;
        }
      });

      return allRulesMatch;
    });
  });

  const sum = validUpdates.reduce((acc, update) => {
    const middleIndex = (update.length - 1) / 2;
    acc += Number(update[middleIndex]);
    return acc;
  }, 0);

  /**
   * x1. Split rules from updates
   * x2. Hashmap page number to must-be-before
   * 3. For each update:
   *    3b. For each element:
   *        3c. For each rule for that element:
   *            3d. If rule is in the update before element, return false
   *    3e. If we get to the end w/o returning false, return true
   * 4. If update is valid, add middle element to sum
   */

  console.log(validUpdates);
  return sum;
}

await runSolution(day5a);
