import { expect, test } from '@playwright/test';
import { allPlacements } from '../visual/utils/allPlacements';
import { click } from './utils/click';
import { useCases } from '../visual/utils/shadowDOM';

useCases.forEach(useCase => {
  allPlacements.forEach((placement) => {
    ['absolute', 'fixed'].forEach((strategy) => {
    [true, false].forEach((withTransform) => {
      test(`shadow DOM (${useCase}): correctly positioned on ${strategy} + ${placement} + ${withTransform ? "with" : "without"}`, async ({ page }) => {
        await page.goto('http://localhost:1234/shadow-DOM');
        await click(page, `[data-testid="use-case-${useCase}"]`);
        await click(page, `[data-testid="placement-${placement}"]`);
        await click(page, `[data-testid="strategy-${strategy}"]`);
        await click(page, `[data-testid="with-transform-${withTransform}"]`);
        expect(await page.locator('.container').screenshot()).toMatchSnapshot(
          `${useCase}-${placement}-${strategy}-${withTransform ? "with" : "without"}-transform.png`,
        );
      });
      });
    });
  });
});

